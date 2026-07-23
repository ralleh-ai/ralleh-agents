#!/usr/bin/env python3
"""Generate deterministic pilot acceptance status for BRAIN promotion."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"

LIVE_SUMMARY = REPORTS / "live-pilot-summary.json"
KPI_LATEST = REPORTS / "kpi-latest.json"
OUT = REPORTS / "pilot-acceptance.json"


THRESHOLDS = {
    "min_days_elapsed": 14.0,
    "min_checkpoints": 10,
    "max_target_exceeded_rate": 0.50,
    "max_hard_overrun_rate": 0.85,
    "min_retrieval_quality": 0.60,
}


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def _read_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def _criterion(name: str, value: Any, passed: bool, target: str) -> dict[str, Any]:
    return {
        "name": name,
        "value": value,
        "target": target,
        "passed": passed,
    }


def main() -> int:
    live = _read_json(LIVE_SUMMARY, {})
    kpi = _read_json(KPI_LATEST, {})
    days_elapsed = float(live.get("days_elapsed", 0.0) or 0.0)
    checkpoints = int(live.get("checkpoints", 0) or 0)
    avg_target_exceeded = live.get("avg_target_exceeded_rate")
    hard_overrun_rate = kpi.get("token", {}).get("hard_overrun_rate")
    avg_quality = live.get("avg_retrieval_quality")

    criteria = [
        _criterion(
            "pilot_window_elapsed",
            days_elapsed,
            days_elapsed >= THRESHOLDS["min_days_elapsed"],
            f">= {THRESHOLDS['min_days_elapsed']} days",
        ),
        _criterion(
            "checkpoint_count",
            checkpoints,
            checkpoints >= THRESHOLDS["min_checkpoints"],
            f">= {THRESHOLDS['min_checkpoints']}",
        ),
        _criterion(
            "target_exceeded_rate",
            avg_target_exceeded,
            isinstance(avg_target_exceeded, (int, float))
            and avg_target_exceeded <= THRESHOLDS["max_target_exceeded_rate"],
            f"<= {THRESHOLDS['max_target_exceeded_rate']}",
        ),
        _criterion(
            "hard_overrun_rate",
            hard_overrun_rate,
            isinstance(hard_overrun_rate, (int, float))
            and hard_overrun_rate <= THRESHOLDS["max_hard_overrun_rate"],
            f"<= {THRESHOLDS['max_hard_overrun_rate']}",
        ),
        _criterion(
            "retrieval_quality",
            avg_quality,
            isinstance(avg_quality, (int, float))
            and avg_quality >= THRESHOLDS["min_retrieval_quality"],
            f">= {THRESHOLDS['min_retrieval_quality']}",
        ),
    ]

    acceptance = {
        "generated_at": _now_iso(),
        "thresholds": THRESHOLDS,
        "criteria": criteria,
        "pilot_acceptance_passed": all(c["passed"] for c in criteria),
    }

    REPORTS.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(acceptance, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(acceptance, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
