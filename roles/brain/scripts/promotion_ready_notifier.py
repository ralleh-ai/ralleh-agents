#!/usr/bin/env python3
"""Emit a tiny promotion-ready signal for automation and operators."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"

READINESS = REPORTS / "promotion-readiness.json"
ACCEPTANCE = REPORTS / "pilot-acceptance.json"
LIVE = REPORTS / "live-pilot-summary.json"

OUT_JSON = REPORTS / "promotion-ready.json"
OUT_TXT = REPORTS / "promotion-ready.txt"


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def _read_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def _collect_blockers(readiness: dict[str, Any], acceptance: dict[str, Any], live: dict[str, Any]) -> list[str]:
    blockers: list[str] = []

    files_ok = bool(readiness.get("files", {}).get("ok"))
    logs_ok = bool(readiness.get("logs", {}).get("ok"))
    if not files_ok:
        blockers.append("required_files")
    if not logs_ok:
        blockers.append("required_logs")

    pilot = readiness.get("pilot", {})
    if not bool(pilot.get("compact_within_limit", False)):
        blockers.append("compact_hard_limit")
    if not bool(pilot.get("extended_within_limit", False)):
        blockers.append("extended_hard_limit")
    if int(pilot.get("scenario_count", 0) or 0) < 5:
        blockers.append("baseline_scenarios")
    if not bool(pilot.get("live_window_complete", False)):
        blockers.append("live_window")
    if not bool(pilot.get("acceptance_passed", False)):
        blockers.append("acceptance")

    for criterion in acceptance.get("criteria", []):
        if not bool(criterion.get("passed")):
            name = str(criterion.get("name", "unknown")).strip() or "unknown"
            blockers.append(f"criterion:{name}")

    if not bool(live.get("pilot_started", True)):
        blockers.append("pilot_not_started")

    # Stable order, deduplicated.
    return sorted(set(blockers))


def main() -> int:
    readiness = _read_json(READINESS, {})
    acceptance = _read_json(ACCEPTANCE, {})
    live = _read_json(LIVE, {})

    promotion_ready = bool(readiness.get("ready_for_stable_promotion", False))
    blockers = _collect_blockers(readiness, acceptance, live)

    if promotion_ready:
        line = "GREEN | PROMOTION_READY=1 | all_gates_passed"
    else:
        suffix = ",".join(blockers) if blockers else "unknown"
        line = f"RED | PROMOTION_READY=0 | blockers={suffix}"

    payload = {
        "generated_at": _now_iso(),
        "promotion_ready": promotion_ready,
        "signal": 1 if promotion_ready else 0,
        "line": line,
        "blockers": blockers,
    }

    REPORTS.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    OUT_TXT.write_text(line + "\n", encoding="utf-8")

    print(json.dumps(payload, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
