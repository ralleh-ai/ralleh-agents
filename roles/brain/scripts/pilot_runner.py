#!/usr/bin/env python3
"""Run BRAIN pilot scenarios and emit metrics report.

This is a bootstrap harness for the Phase 3 pilot requirement.
It does not replace the 2-week live pilot, but gives a repeatable baseline.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from statistics import mean
from typing import Any

from context_engine import ROOT, build_packet, reflect

PILOT_SCENARIOS = ROOT / "data" / "pilot" / "scenarios.json"
REPORTS_DIR = ROOT / "reports"
LOG_DIR = ROOT / "data" / "logs"


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def _read_jsonl(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    rows: list[dict[str, Any]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line:
            rows.append(json.loads(line))
    return rows


def run() -> dict[str, Any]:
    scenarios = json.loads(PILOT_SCENARIOS.read_text(encoding="utf-8"))

    rows: list[dict[str, Any]] = []
    compact_tokens: list[int] = []
    extended_tokens: list[int] = []
    quality_scores: list[float] = []

    for s in scenarios:
        packet = build_packet(s["request_summary"], s.get("mode", "compact"))
        reflect_result = reflect(s["reflect"])

        row = {
            "id": s["id"],
            "mode": packet["mode"],
            "packet_tokens_est": packet["packet_tokens_est"],
            "confidence_overall": packet["confidence_overall"],
            "retrieval_quality_score": packet.get("retrieval_quality_score"),
            "missing_info_count": len(packet.get("missing_info", [])),
            "reflect_logged_at": reflect_result.get("logged_at"),
            "has_sensitive_entities": any(
                e.get("classification") in {"confidential", "restricted"} for e in packet.get("entities", [])
            ),
        }
        rows.append(row)

        q = row.get("retrieval_quality_score")
        if isinstance(q, (int, float)):
            quality_scores.append(float(q))

        if row["mode"] == "compact":
            compact_tokens.append(int(row["packet_tokens_est"]))
        else:
            extended_tokens.append(int(row["packet_tokens_est"]))

    token_logs = _read_jsonl(LOG_DIR / "token-budget.jsonl")
    token_alerts = _read_jsonl(LOG_DIR / "token-budget-alerts.jsonl")

    summary = {
        "generated_at": _now_iso(),
        "scenario_count": len(rows),
        "compact": {
            "count": len(compact_tokens),
            "avg_tokens": round(mean(compact_tokens), 2) if compact_tokens else None,
            "max_tokens": max(compact_tokens) if compact_tokens else None,
            "hard_limit": 300,
            "within_hard_limit": all(v <= 300 for v in compact_tokens),
        },
        "extended": {
            "count": len(extended_tokens),
            "avg_tokens": round(mean(extended_tokens), 2) if extended_tokens else None,
            "max_tokens": max(extended_tokens) if extended_tokens else None,
            "hard_limit": 1200,
            "within_hard_limit": all(v <= 1200 for v in extended_tokens),
        },
        "quality": {
            "avg_retrieval_quality_score": round(mean(quality_scores), 2) if quality_scores else None,
            "min_retrieval_quality_score": min(quality_scores) if quality_scores else None,
            "max_retrieval_quality_score": max(quality_scores) if quality_scores else None,
        },
        "audit": {
            "token_budget_events": len(token_logs),
            "token_budget_alerts": len(token_alerts),
        },
        "rows": rows,
        "note": "Bootstrap pilot baseline only; 2-week live pilot still required.",
    }

    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    out = REPORTS_DIR / "pilot-baseline.json"
    out.write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")
    return summary


def main() -> int:
    summary = run()
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
