#!/usr/bin/env python3
"""Generate BRAIN KPI snapshots from current logs and pilot artifacts."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from statistics import mean
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
LOGS = ROOT / "data" / "logs"
REPORTS = ROOT / "reports"
PILOT = REPORTS / "pilot-baseline.json"


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def _read_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
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


def _token_kpis(events: list[dict[str, Any]]) -> dict[str, Any]:
    if not events:
        return {
            "count": 0,
            "avg_before_trim": None,
            "avg_after_trim": None,
            "compact_avg_after_trim": None,
            "extended_avg_after_trim": None,
            "hard_overrun_rate": None,
            "target_exceeded_rate": None,
        }

    before = [int(e.get("before_trim_tokens", 0)) for e in events]
    after = [int(e.get("after_trim_tokens", 0)) for e in events]
    overruns = [bool(e.get("overrun_detected")) for e in events]
    target_exceeded = [bool(e.get("target_exceeded_after_trim")) for e in events]

    compact_after = [int(e.get("after_trim_tokens", 0)) for e in events if e.get("mode") == "compact"]
    extended_after = [int(e.get("after_trim_tokens", 0)) for e in events if e.get("mode") == "extended"]

    return {
        "count": len(events),
        "avg_before_trim": round(mean(before), 2),
        "avg_after_trim": round(mean(after), 2),
        "compact_avg_after_trim": round(mean(compact_after), 2) if compact_after else None,
        "extended_avg_after_trim": round(mean(extended_after), 2) if extended_after else None,
        "hard_overrun_rate": round(sum(overruns) / len(overruns), 3),
        "target_exceeded_rate": round(sum(target_exceeded) / len(target_exceeded), 3),
    }


def _security_kpis(audit_rows: list[dict[str, Any]]) -> dict[str, Any]:
    restricted = [r for r in audit_rows if r.get("classification") == "restricted"]
    confidential = [r for r in audit_rows if r.get("classification") == "confidential"]
    return {
        "sensitive_retrieval_events": len(audit_rows),
        "restricted_retrieval_events": len(restricted),
        "confidential_retrieval_events": len(confidential),
    }


def _quality_kpis(pilot: dict[str, Any]) -> dict[str, Any]:
    q = pilot.get("quality", {})
    return {
        "pilot_avg_retrieval_quality": q.get("avg_retrieval_quality_score"),
        "pilot_min_retrieval_quality": q.get("min_retrieval_quality_score"),
        "pilot_max_retrieval_quality": q.get("max_retrieval_quality_score"),
        "pilot_scenarios": pilot.get("scenario_count"),
    }


def main() -> int:
    token_events = _read_jsonl(LOGS / "token-budget.jsonl")
    token_alerts = _read_jsonl(LOGS / "token-budget-alerts.jsonl")
    retrieval_audit = _read_jsonl(LOGS / "retrieval-audit.jsonl")
    reflect_events = _read_jsonl(LOGS / "reflect-events.jsonl")
    pilot = _read_json(PILOT)

    report = {
        "generated_at": _now_iso(),
        "token": _token_kpis(token_events),
        "security": _security_kpis(retrieval_audit),
        "quality": _quality_kpis(pilot),
        "ops": {
            "reflect_event_count": len(reflect_events),
            "token_budget_alert_count": len(token_alerts),
        },
    }

    REPORTS.mkdir(parents=True, exist_ok=True)
    (REPORTS / "kpi-latest.json").write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
