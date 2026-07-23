#!/usr/bin/env python3
"""BRAIN v1 context packet helpers.

Bootstrap implementation for:
- compact/extended preflight packets
- staleness + contradiction signals
- work-graph dependency projection
- reflect event logging
- sensitive retrieval audit logging
"""

from __future__ import annotations

import argparse
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
ENTITY_DIR = ROOT / "data" / "entities"
LOG_DIR = ROOT / "data" / "logs"
CACHE_DIR = ROOT / "data" / "cache"
TTL_PATH = ROOT / "data" / "staleness-ttl.json"
WORK_GRAPH_PATH = ROOT / "data" / "work-graph.json"
MISSING_QUESTION_LOG = LOG_DIR / "missing-question-events.jsonl"

TOKEN_BUDGETS = {
    "compact_target": 150,
    "compact_hard": 300,
    "extended_target": 600,
    "extended_hard": 1200,
}


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def _now_dt() -> datetime:
    return datetime.now(timezone.utc)


def _load_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def _read_jsonl(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    rows: list[dict[str, Any]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line:
            rows.append(json.loads(line))
    return rows


def _load_entities() -> list[dict[str, Any]]:
    entities: list[dict[str, Any]] = []
    for name in ("clients.json", "products.json", "employees.json"):
        entities.extend(_load_json(ENTITY_DIR / name, []))
    return entities


def _token_estimate(payload: dict[str, Any]) -> int:
    return max(1, len(json.dumps(payload, ensure_ascii=False)) // 4)


def _avg_conf(values: list[float]) -> float:
    if not values:
        return 0.0
    return round(sum(values) / len(values), 2)


def _days_since(iso_ts: str) -> int:
    dt = datetime.fromisoformat(iso_ts.replace("Z", "+00:00"))
    return int((_now_dt() - dt).total_seconds() // 86400)


def _staleness_status(entity: dict[str, Any], ttl: dict[str, Any]) -> tuple[str, int]:
    rules = ttl.get(entity["type"], {"soft_days": 30, "hard_days": 90})
    age_days = _days_since(entity["last_verified_at"])
    if age_days >= rules["hard_days"]:
        return "hard_stale", age_days
    if age_days >= rules["soft_days"]:
        return "soft_stale", age_days
    return "fresh", age_days


def _annotate_entities_with_staleness(entities: list[dict[str, Any]]) -> list[dict[str, Any]]:
    ttl = _load_json(TTL_PATH, {})
    out: list[dict[str, Any]] = []
    for e in entities:
        status, age = _staleness_status(e, ttl)
        enriched = dict(e)
        enriched["freshness_status"] = status
        enriched["age_days"] = age
        enriched["stale"] = status != "fresh"
        out.append(enriched)
    return out


def _find_contradictions(entities: list[dict[str, Any]]) -> list[dict[str, Any]]:
    by_name: dict[str, list[dict[str, Any]]] = {}
    for e in entities:
        by_name.setdefault(e["name"].strip().lower(), []).append(e)

    issues: list[dict[str, Any]] = []
    for key, group in by_name.items():
        owners = sorted({g.get("owner", "") for g in group})
        if len(group) > 1 and len(owners) > 1:
            issues.append(
                {
                    "name_key": key,
                    "entity_ids": [g["id"] for g in group],
                    "owners": owners,
                    "reason": "same-name records have conflicting owners",
                }
            )
    return issues


def _match_entities(request_summary: str, entities: list[dict[str, Any]], mode: str) -> list[dict[str, Any]]:
    q = request_summary.lower()
    ranked: list[tuple[int, dict[str, Any]]] = []
    for entity in entities:
        if mode == "compact" and entity.get("classification") == "restricted":
            continue

        hay = f"{entity.get('name', '')} {entity.get('summary', '')} {','.join(entity.get('tags', []))}".lower()
        score = 0
        for token in q.split():
            if token and token in hay:
                score += 1
        if score > 0:
            ranked.append((score, entity))

    ranked.sort(key=lambda x: x[0], reverse=True)
    out: list[dict[str, Any]] = []
    for _, entity in ranked[:6]:
        summary = entity["summary"]
        if entity.get("classification") == "confidential" and mode == "compact":
            summary = "Redacted confidential summary."
        if entity.get("classification") == "restricted":
            summary = "Restricted content redacted."
        out.append(
            {
                "id": entity["id"],
                "type": entity["type"],
                "name": entity["name"],
                "summary": summary,
                "confidence": entity["confidence"],
                "freshness_status": entity.get("freshness_status", "fresh"),
                "classification": entity.get("classification", "internal"),
            }
        )
    return out


def _derive_missing_info(request_summary: str, matched_full: list[dict[str, Any]]) -> list[dict[str, str]]:
    missing_info: list[dict[str, str]] = []
    q = request_summary.lower()

    high_question_added = False
    for entity in matched_full:
        for field_name in entity.get("missing_fields", []):
            impact = "medium"
            question = ""
            field_token = field_name.replace("_", " ").lower()
            if not high_question_added and field_token in q:
                impact = "high"
                question = f"What is {entity['name']} {field_name.replace('_', ' ')}? Required for decision quality."
                high_question_added = True
            entry = {"field": f"{entity['id']}.{field_name}", "impact": impact}
            if question:
                entry["question"] = question
            missing_info.append(entry)
            if len(missing_info) >= 5:
                return missing_info
    return missing_info


def _work_graph_for_entities(entity_ids: set[str]) -> dict[str, Any]:
    graph = _load_json(WORK_GRAPH_PATH, {"tasks": [], "links": []})
    tasks = [t for t in graph.get("tasks", []) if set(t.get("entities", [])) & entity_ids]
    task_ids = {t["id"] for t in tasks}
    links = [l for l in graph.get("links", []) if l.get("from") in task_ids or l.get("to") in task_ids]
    return {"tasks": tasks, "links": links}


def _timeline_from_tasks(tasks: list[dict[str, Any]]) -> list[dict[str, Any]]:
    events: list[dict[str, Any]] = []
    for t in tasks:
        if t.get("updated_at"):
            events.append(
                {
                    "at": t["updated_at"],
                    "event": f"Task {t['id']} status={t.get('status', 'unknown')}",
                    "entity_ids": t.get("entities", []),
                }
            )
    events.sort(key=lambda x: x["at"], reverse=True)
    return events[:10]


def _citations_from_entities(entities: list[dict[str, Any]]) -> list[dict[str, Any]]:
    cites: list[dict[str, Any]] = []
    for e in entities[:12]:
        cites.append(
            {
                "claim": f"{e['name']} summary",
                "source": e.get("source", "unknown"),
                "last_verified_at": e.get("last_verified_at", _now_iso()),
            }
        )
    return cites


def _write_hot_cache(matched: list[dict[str, Any]]) -> None:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    for entity in matched:
        cache_entry = {
            "cached_at": _now_iso(),
            "entity": entity,
        }
        (CACHE_DIR / f"{entity['id']}.json").write_text(
            json.dumps(cache_entry, ensure_ascii=False, indent=2), encoding="utf-8"
        )


def _audit_sensitive_retrievals(request_summary: str, matched_full: list[dict[str, Any]]) -> None:
    sensitive = [e for e in matched_full if e.get("classification") in {"confidential", "restricted"}]
    if not sensitive:
        return
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    with (LOG_DIR / "retrieval-audit.jsonl").open("a", encoding="utf-8") as handle:
        for e in sensitive:
            log = {
                "at": _now_iso(),
                "kind": "sensitive_retrieval",
                "entity_id": e["id"],
                "classification": e.get("classification"),
                "reason": request_summary,
            }
            print(json.dumps(log, ensure_ascii=False), file=handle)


def _score_retrieval_quality(
    matched: list[dict[str, Any]],
    stale_items: list[dict[str, Any]],
    contradictions: list[dict[str, Any]],
    missing_info: list[dict[str, str]],
) -> float:
    if not matched:
        return 0.3
    base = _avg_conf([e.get("confidence", 0.0) for e in matched])
    penalty = 0.0
    penalty += min(0.2, 0.05 * len(stale_items))
    penalty += min(0.2, 0.07 * len(contradictions))
    high_missing = len([m for m in missing_info if m.get("impact") == "high"])
    penalty += min(0.2, 0.08 * high_missing)
    return round(max(0.0, min(1.0, base - penalty)), 2)


def _log_token_budget(mode: str, request_summary: str, before_trim: int, after_trim: int) -> None:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    hard = TOKEN_BUDGETS["compact_hard" if mode == "compact" else "extended_hard"]
    target = TOKEN_BUDGETS["compact_target" if mode == "compact" else "extended_target"]
    overrun = before_trim > hard

    event = {
        "at": _now_iso(),
        "kind": "token_budget",
        "mode": mode,
        "request_summary": request_summary[:200],
        "target_limit": target,
        "hard_limit": hard,
        "before_trim_tokens": before_trim,
        "after_trim_tokens": after_trim,
        "target_exceeded_after_trim": after_trim > target,
        "overrun_detected": overrun,
    }
    with (LOG_DIR / "token-budget.jsonl").open("a", encoding="utf-8") as handle:
        print(json.dumps(event, ensure_ascii=False), file=handle)

    if overrun:
        alert = {
            "at": event["at"],
            "kind": "token_budget_alert",
            "mode": mode,
            "before_trim_tokens": before_trim,
            "hard_limit": hard,
            "message": "Packet exceeded hard token budget before trim",
        }
        with (LOG_DIR / "token-budget-alerts.jsonl").open("a", encoding="utf-8") as handle:
            print(json.dumps(alert, ensure_ascii=False), file=handle)


def _trim_to_budget(packet: dict[str, Any], mode: str) -> dict[str, Any]:
    target = TOKEN_BUDGETS["compact_target" if mode == "compact" else "extended_target"]
    hard = TOKEN_BUDGETS["compact_hard" if mode == "compact" else "extended_hard"]

    def recalc() -> int:
        packet["packet_tokens_est"] = _token_estimate(packet)
        return packet["packet_tokens_est"]

    if recalc() <= target:
        return packet

    # pass 1 (target): trim breadth while preserving core structure
    packet["entities"] = packet.get("entities", [])[:3]
    packet["risks_and_blockers"] = packet.get("risks_and_blockers", [])[:2]
    packet["missing_info"] = packet.get("missing_info", [])[:2]
    if mode == "extended":
        packet["timeline"] = packet.get("timeline", [])[:5]
        packet["citations"] = packet.get("citations", [])[:5]
        packet["alternative_interpretations"] = packet.get("alternative_interpretations", [])[:2]
        packet["extended_risk_analysis"] = packet.get("extended_risk_analysis", [])[:2]
    if recalc() <= target:
        return packet

    # pass 2 (target): trim verbosity
    packet["request_summary"] = str(packet.get("request_summary", ""))[:140]
    packet["relevant_history"] = str(packet.get("relevant_history", ""))[:100]
    packet["recommended_action"] = str(packet.get("recommended_action", ""))[:100]
    packet["risks_and_blockers"] = [str(x)[:65] for x in packet.get("risks_and_blockers", [])][:2]

    for entity in packet.get("entities", []):
        entity["summary"] = str(entity.get("summary", ""))[:60]

    if mode == "extended":
        packet["citations"] = packet.get("citations", [])[:4]
        packet["timeline"] = packet.get("timeline", [])[:4]

    if recalc() <= target:
        return packet

    # pass 3 (hard-protection): strict fallback for pathological inputs
    packet["request_summary"] = str(packet.get("request_summary", ""))[:120]
    packet["entities"] = packet.get("entities", [])[:2]
    packet["missing_info"] = packet.get("missing_info", [])[:1]
    packet["risks_and_blockers"] = [str(x)[:50] for x in packet.get("risks_and_blockers", [])][:1]
    if mode == "extended":
        packet["citations"] = packet.get("citations", [])[:2]
        packet["timeline"] = packet.get("timeline", [])[:2]
        packet["alternative_interpretations"] = packet.get("alternative_interpretations", [])[:1]
        packet["extended_risk_analysis"] = packet.get("extended_risk_analysis", [])[:1]

    current = recalc()
    if mode == "compact" and current > target:
        # compact must try very hard to stay near target budget
        packet["request_summary"] = str(packet.get("request_summary", ""))[:48]
        packet["entities"] = packet.get("entities", [])[:1]
        for entity in packet.get("entities", []):
            entity["summary"] = str(entity.get("summary", ""))[:28]
        packet["relevant_history"] = "Bootstrap context."
        packet["recommended_action"] = "Proceed; verify top gap."
        packet["risks_and_blockers"] = [str(x)[:32] for x in packet.get("risks_and_blockers", [])][:1]
        packet["missing_info"] = packet.get("missing_info", [])[:1]
        # remove optional compact fields when present
        packet.pop("timeline", None)
        packet.pop("citations", None)
        packet.pop("dependency_graph", None)
        packet.pop("alternative_interpretations", None)
        packet.pop("extended_risk_analysis", None)
        current = recalc()
        if current <= target:
            return packet

    if current <= hard:
        return packet

    # pass 4 (last resort): keep schema-valid minimum with severe truncation
    packet["request_summary"] = str(packet.get("request_summary", ""))[:80]
    packet["entities"] = packet.get("entities", [])[:1]
    packet["relevant_history"] = str(packet.get("relevant_history", ""))[:70]
    packet["recommended_action"] = str(packet.get("recommended_action", ""))[:70]
    packet["missing_info"] = packet.get("missing_info", [])[:1]
    if mode == "extended":
        packet["citations"] = packet.get("citations", [])[:1]
        packet["timeline"] = packet.get("timeline", [])[:1]

    recalc()
    return packet


def build_packet(request_summary: str, mode: str) -> dict[str, Any]:
    all_entities = _annotate_entities_with_staleness(_load_entities())
    matched = _match_entities(request_summary, all_entities, mode)
    matched_ids = {e["id"] for e in matched}
    matched_full = [e for e in all_entities if e["id"] in matched_ids]

    stale_items = [e for e in matched_full if e.get("freshness_status") != "fresh"]
    contradictions = _find_contradictions(all_entities)
    missing_info = _derive_missing_info(request_summary, matched_full)

    risks = [
        "Seed registry contains placeholder records requiring verification",
        "Limited source integrations in bootstrap phase",
    ]
    if stale_items:
        risks.append(f"{len(stale_items)} matched entities are stale")
    if contradictions:
        risks.append(f"{len(contradictions)} contradiction(s) detected in registry")

    packet: dict[str, Any] = {
        "schema": "brain-packet/v1",
        "mode": mode,
        "request_summary": request_summary,
        "entities": matched,
        "relevant_history": "Context assembled via layered retrieval (L1 cache, L2 curated memory, L3 sources as needed).",
        "risks_and_blockers": risks,
        "missing_info": missing_info,
        "confidence_overall": _avg_conf([e["confidence"] for e in matched]) if matched else 0.45,
        "recommended_action": "Proceed with compact context; resolve one high-impact missing field if decision-critical.",
        "retrieval_quality_score": _score_retrieval_quality(matched, stale_items, contradictions, missing_info),
        "packet_tokens_est": 0,
    }

    _write_hot_cache(matched)
    _audit_sensitive_retrievals(request_summary, matched_full)

    if mode == "extended":
        dep_graph = _work_graph_for_entities(matched_ids)
        packet["timeline"] = _timeline_from_tasks(dep_graph.get("tasks", []))
        packet["citations"] = _citations_from_entities(matched_full)
        packet["dependency_graph"] = dep_graph
        packet["alternative_interpretations"] = [
            "Entity matching is keyword-based during bootstrap and may omit implicit relationships."
        ]
        packet["extended_risk_analysis"] = [
            "Bootstrap registry has partial coverage; confidence should be treated as provisional.",
            "Classification controls are enforced, but role-based authorization hooks are not yet integrated.",
        ]

    before_trim = _token_estimate(packet)
    trimmed = _trim_to_budget(packet, mode)
    after_trim = trimmed.get("packet_tokens_est", _token_estimate(trimmed))
    _log_token_budget(mode, request_summary, before_trim, int(after_trim))
    return trimmed


def reflect(payload: dict[str, Any]) -> dict[str, Any]:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    entry = {
        "at": _now_iso(),
        "kind": "reflect",
        "payload": payload,
    }
    with (LOG_DIR / "reflect-events.jsonl").open("a", encoding="utf-8") as handle:
        print(json.dumps(entry, ensure_ascii=False), file=handle)
    return {"ok": True, "logged_at": entry["at"]}


def main() -> int:
    parser = argparse.ArgumentParser(description="BRAIN context engine bootstrap")
    sub = parser.add_subparsers(dest="cmd", required=True)

    preflight = sub.add_parser("preflight")
    preflight.add_argument("request_summary")
    preflight.add_argument("--mode", choices=["compact", "extended"], default="compact")

    refl = sub.add_parser("reflect")
    refl.add_argument("payload_json", help="Reflect payload JSON string")

    args = parser.parse_args()

    if args.cmd == "preflight":
        print(json.dumps(build_packet(args.request_summary, args.mode), indent=2, ensure_ascii=False))
        return 0

    if args.cmd == "reflect":
        payload = json.loads(args.payload_json)
        print(json.dumps(reflect(payload), indent=2, ensure_ascii=False))
        return 0

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
