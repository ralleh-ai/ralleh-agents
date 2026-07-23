#!/usr/bin/env python3
"""Phase 3 hardening checks for BRAIN bootstrap.

Checks:
1) classification enforcement in compact mode
2) token budget instrumentation + overrun alert logging
3) retrieval quality score presence/range
4) sensitive retrieval audit coverage
"""

from __future__ import annotations

import json
from pathlib import Path

from context_engine import LOG_DIR, build_packet


ROOT = Path(__file__).resolve().parents[1]


def _read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    rows = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        rows.append(json.loads(line))
    return rows


def check_classification() -> dict:
    packet = build_packet("client intel notes vault key ledger", "compact")
    entities = packet.get("entities", [])
    restricted_present = [e["id"] for e in entities if e.get("classification") == "restricted"]
    confidential_redactions = [
        e["id"]
        for e in entities
        if e.get("classification") == "confidential" and "Redacted confidential summary." in e.get("summary", "")
    ]
    return {
        "ok": len(restricted_present) == 0,
        "restricted_present": restricted_present,
        "confidential_redactions": confidential_redactions,
    }


def check_token_budget_alert() -> dict:
    before_alerts = len(_read_jsonl(LOG_DIR / "token-budget-alerts.jsonl"))
    _ = build_packet("acme " * 400, "compact")
    budget_logs = _read_jsonl(LOG_DIR / "token-budget.jsonl")
    after_alerts = len(_read_jsonl(LOG_DIR / "token-budget-alerts.jsonl"))

    last = budget_logs[-1] if budget_logs else {}
    return {
        "ok": bool(last) and ("before_trim_tokens" in last) and ("after_trim_tokens" in last),
        "last": last,
        "alert_count_delta": after_alerts - before_alerts,
    }


def check_quality_score() -> dict:
    packet = build_packet("Acme budget and product status", "extended")
    score = packet.get("retrieval_quality_score")
    return {
        "ok": isinstance(score, (int, float)) and 0 <= score <= 1,
        "score": score,
    }


def check_audit_coverage() -> dict:
    reason = "client intel notes vault key ledger"
    packet = build_packet(reason, "extended")
    sensitive_ids = [
        e["id"]
        for e in packet.get("entities", [])
        if e.get("classification") in {"confidential", "restricted"}
    ]

    logs = _read_jsonl(LOG_DIR / "retrieval-audit.jsonl")
    reason_ids = [
        row.get("entity_id")
        for row in logs
        if row.get("kind") == "sensitive_retrieval" and row.get("reason") == reason
    ]

    missing = sorted(set(sensitive_ids) - set(reason_ids))
    return {
        "ok": len(missing) == 0,
        "sensitive_ids": sensitive_ids,
        "logged_ids_for_reason": sorted(set(reason_ids)),
        "missing": missing,
    }


def main() -> int:
    report = {
        "classification": check_classification(),
        "token_budget": check_token_budget_alert(),
        "quality_score": check_quality_score(),
        "audit_coverage": check_audit_coverage(),
    }
    report["ok"] = all(v.get("ok", False) for k, v in report.items() if isinstance(v, dict) and k != "ok")
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0 if report["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
