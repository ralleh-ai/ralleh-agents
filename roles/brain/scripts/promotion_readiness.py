#!/usr/bin/env python3
"""Evaluate readiness to promote BRAIN bootstrap package to stable.

This script is gate-oriented: it reports pass/fail per criterion and
produces a machine-readable readiness report.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"
LOGS = ROOT / "data" / "logs"
PILOT_REPORT = REPORTS / "pilot-baseline.json"
LIVE_PILOT_SUMMARY = REPORTS / "live-pilot-summary.json"
PILOT_ACCEPTANCE = REPORTS / "pilot-acceptance.json"

REQUIRED_FILES = [
    ROOT / "role.json",
    ROOT / "schemas" / "brain-packet.v1.schema.json",
    ROOT / "schemas" / "entity-record.v1.schema.json",
    ROOT / "schemas" / "work-graph.v1.schema.json",
    ROOT / "WORKFLOWS.md",
    ROOT / "GUIDELINES.md",
    ROOT / "DOCTOR.md",
    ROOT / "scripts" / "context_engine.py",
    ROOT / "scripts" / "hardening_checks.py",
    ROOT / "scripts" / "pilot_runner.py",
    ROOT / "scripts" / "kpi_report.py",
    ROOT / "scripts" / "live_pilot_tracker.py",
    ROOT / "scripts" / "pilot_acceptance_report.py",
    ROOT / "scripts" / "promotion_ready_notifier.py",
]


def _read_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding="utf-8"))


def check_files() -> dict[str, Any]:
    missing = [str(p.relative_to(ROOT)) for p in REQUIRED_FILES if not p.exists()]
    return {"ok": len(missing) == 0, "missing": missing}


def check_logs() -> dict[str, Any]:
    required_logs = [
        LOGS / "reflect-events.jsonl",
        LOGS / "retrieval-audit.jsonl",
        LOGS / "token-budget.jsonl",
        LOGS / "token-budget-alerts.jsonl",
    ]
    missing = [str(p.relative_to(ROOT)) for p in required_logs if not p.exists()]
    return {"ok": len(missing) == 0, "missing": missing}


def check_pilot() -> dict[str, Any]:
    report = _read_json(PILOT_REPORT)
    if not report:
        return {"ok": False, "reason": "pilot-baseline.json missing"}

    compact_ok = bool(report.get("compact", {}).get("within_hard_limit"))
    extended_ok = bool(report.get("extended", {}).get("within_hard_limit"))
    scenario_count = int(report.get("scenario_count", 0))

    live = _read_json(LIVE_PILOT_SUMMARY)
    acceptance = _read_json(PILOT_ACCEPTANCE)

    live_window_complete = bool(live.get("ready_for_2week_gate"))
    acceptance_passed = bool(acceptance.get("pilot_acceptance_passed"))
    live_pilot_done = live_window_complete and acceptance_passed

    return {
        "ok": compact_ok and extended_ok and scenario_count >= 5 and live_pilot_done,
        "compact_within_limit": compact_ok,
        "extended_within_limit": extended_ok,
        "scenario_count": scenario_count,
        "live_window_complete": live_window_complete,
        "acceptance_passed": acceptance_passed,
        "live_pilot_done": live_pilot_done,
    }


def main() -> int:
    report = {
        "files": check_files(),
        "logs": check_logs(),
        "pilot": check_pilot(),
    }
    report["ready_for_stable_promotion"] = all(v.get("ok", False) for v in report.values())

    REPORTS.mkdir(parents=True, exist_ok=True)
    out = REPORTS / "promotion-readiness.json"
    out.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0 if report["ready_for_stable_promotion"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
