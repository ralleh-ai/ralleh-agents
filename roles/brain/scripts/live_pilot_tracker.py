#!/usr/bin/env python3
"""Track BRAIN live-pilot progress over a 14-day window."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from statistics import mean
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"
PILOT_DIR = ROOT / "data" / "pilot"
STATE_PATH = PILOT_DIR / "live-pilot-state.json"
KPI_PATH = REPORTS / "kpi-latest.json"
PROMOTION_PATH = REPORTS / "promotion-readiness.json"


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def _read_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def _days_between(iso_a: str, iso_b: str) -> float:
    a = datetime.fromisoformat(iso_a.replace("Z", "+00:00"))
    b = datetime.fromisoformat(iso_b.replace("Z", "+00:00"))
    return abs((b - a).total_seconds()) / 86400.0


def _load_state() -> dict[str, Any]:
    return _read_json(
        STATE_PATH,
        {
            "created_at": _now_iso(),
            "pilot_start_at": None,
            "checkpoints": [],
            "notes": [],
        },
    )


def checkpoint(note: str) -> dict[str, Any]:
    state = _load_state()
    kpi = _read_json(KPI_PATH, {})
    readiness = _read_json(PROMOTION_PATH, {})

    now = _now_iso()
    if state.get("pilot_start_at") is None:
        state["pilot_start_at"] = now

    token = kpi.get("token", {})
    quality = kpi.get("quality", {})

    row = {
        "at": now,
        "compact_avg_after_trim": token.get("compact_avg_after_trim"),
        "extended_avg_after_trim": token.get("extended_avg_after_trim"),
        "target_exceeded_rate": token.get("target_exceeded_rate"),
        "hard_overrun_rate": token.get("hard_overrun_rate"),
        "pilot_avg_retrieval_quality": quality.get("pilot_avg_retrieval_quality"),
        "reflect_event_count": kpi.get("ops", {}).get("reflect_event_count"),
        "token_budget_alert_count": kpi.get("ops", {}).get("token_budget_alert_count"),
        "readiness_flag": readiness.get("ready_for_stable_promotion"),
    }
    state.setdefault("checkpoints", []).append(row)

    if note:
        state.setdefault("notes", []).append({"at": now, "note": note})

    PILOT_DIR.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")
    return state


def summary() -> dict[str, Any]:
    state = _load_state()
    cps = state.get("checkpoints", [])

    if not cps:
        out = {
            "pilot_started": False,
            "status": "not_started",
            "days_elapsed": 0.0,
            "checkpoints": 0,
            "ready_for_2week_gate": False,
        }
    else:
        start = state.get("pilot_start_at") or cps[0]["at"]
        days_elapsed = _days_between(start, _now_iso())
        target_rates = [c["target_exceeded_rate"] for c in cps if isinstance(c.get("target_exceeded_rate"), (int, float))]
        quality_vals = [
            c["pilot_avg_retrieval_quality"]
            for c in cps
            if isinstance(c.get("pilot_avg_retrieval_quality"), (int, float))
        ]

        out = {
            "pilot_started": True,
            "status": "in_progress" if days_elapsed < 14 else "window_complete",
            "days_elapsed": round(days_elapsed, 2),
            "checkpoints": len(cps),
            "avg_target_exceeded_rate": round(mean(target_rates), 3) if target_rates else None,
            "latest_target_exceeded_rate": cps[-1].get("target_exceeded_rate"),
            "avg_retrieval_quality": round(mean(quality_vals), 3) if quality_vals else None,
            "latest_retrieval_quality": cps[-1].get("pilot_avg_retrieval_quality"),
            "ready_for_2week_gate": days_elapsed >= 14 and len(cps) >= 10,
        }

    REPORTS.mkdir(parents=True, exist_ok=True)
    (REPORTS / "live-pilot-summary.json").write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    return out


def main() -> int:
    parser = argparse.ArgumentParser(description="Track BRAIN live pilot progress")
    sub = parser.add_subparsers(dest="cmd", required=True)

    cp = sub.add_parser("checkpoint")
    cp.add_argument("--note", default="")

    sub.add_parser("summary")

    args = parser.parse_args()

    if args.cmd == "checkpoint":
        print(json.dumps(checkpoint(args.note), indent=2, ensure_ascii=False))
        return 0

    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
