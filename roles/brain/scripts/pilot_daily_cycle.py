#!/usr/bin/env python3
"""Run the daily BRAIN pilot governance cycle.

Order:
1) KPI snapshot
2) Live pilot checkpoint
3) Live pilot summary
4) Pilot acceptance report
5) Promotion readiness
6) Promotion ready notifier
"""

from __future__ import annotations

import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"
REPORTS = ROOT / "reports"


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def _run(script: str, *args: str, allow_fail: bool = False) -> dict[str, Any]:
    cmd = ["python3", str(SCRIPTS / script), *args]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    ok = proc.returncode == 0 or allow_fail
    return {
        "script": script,
        "args": list(args),
        "returncode": proc.returncode,
        "ok": ok,
        "stdout": proc.stdout.strip(),
        "stderr": proc.stderr.strip(),
    }


def _try_parse_json(text: str) -> Any:
    if not text:
        return None
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return None


def main() -> int:
    steps = [
        _run("kpi_report.py"),
        _run("live_pilot_tracker.py", "checkpoint", "--note", "scheduled daily checkpoint"),
        _run("live_pilot_tracker.py", "summary"),
        _run("pilot_acceptance_report.py"),
        _run("promotion_readiness.py", allow_fail=True),
        _run("promotion_ready_notifier.py"),
    ]

    step_summaries = []
    for step in steps:
        step_summaries.append(
            {
                "script": step["script"],
                "returncode": step["returncode"],
                "ok": step["ok"],
                "json": _try_parse_json(step["stdout"]),
                "stderr": step["stderr"],
            }
        )

    out = {
        "generated_at": _now_iso(),
        "ok": all(s["ok"] for s in step_summaries),
        "steps": step_summaries,
    }

    REPORTS.mkdir(parents=True, exist_ok=True)
    (REPORTS / "pilot-daily-cycle.json").write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(out, indent=2, ensure_ascii=False))
    return 0 if out["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
