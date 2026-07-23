#!/usr/bin/env python3
"""Bootstrap quality checks for BRAIN entity registry.

Checks:
- staleness status against TTL table
- simple contradiction detection on duplicate names with conflicting owners
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
ENTITY_DIR = ROOT / "data" / "entities"
TTL_PATH = ROOT / "data" / "staleness-ttl.json"


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _load_entities() -> list[dict[str, Any]]:
    entities: list[dict[str, Any]] = []
    for name in ("clients.json", "products.json", "employees.json"):
        path = ENTITY_DIR / name
        if path.exists():
            entities.extend(json.loads(path.read_text(encoding="utf-8")))
    return entities


def _days_since(iso_ts: str) -> int:
    dt = datetime.fromisoformat(iso_ts.replace("Z", "+00:00"))
    return int((_now() - dt).total_seconds() // 86400)


def staleness_report() -> dict[str, Any]:
    ttl = json.loads(TTL_PATH.read_text(encoding="utf-8"))
    entities = _load_entities()
    items: list[dict[str, Any]] = []
    for e in entities:
        rules = ttl.get(e["type"], {"soft_days": 30, "hard_days": 90})
        age_days = _days_since(e["last_verified_at"])
        status = "fresh"
        if age_days >= rules["hard_days"]:
            status = "hard_stale"
        elif age_days >= rules["soft_days"]:
            status = "soft_stale"
        items.append({"id": e["id"], "type": e["type"], "age_days": age_days, "status": status})
    return {"count": len(items), "items": items}


def contradiction_report() -> dict[str, Any]:
    entities = _load_entities()
    by_name: dict[str, list[dict[str, Any]]] = {}
    for e in entities:
        by_name.setdefault(e["name"].strip().lower(), []).append(e)

    contradictions: list[dict[str, Any]] = []
    for key, group in by_name.items():
        owners = sorted({g.get("owner", "") for g in group})
        if len(group) > 1 and len(owners) > 1:
            contradictions.append(
                {
                    "name_key": key,
                    "entity_ids": [g["id"] for g in group],
                    "owners": owners,
                    "reason": "same-name records have conflicting owners",
                }
            )
    return {"count": len(contradictions), "items": contradictions}


def main() -> int:
    report = {
        "staleness": staleness_report(),
        "contradictions": contradiction_report(),
    }
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

