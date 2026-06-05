# DOCTOR.md — IT Agent

## Purpose

Use this when the IT Agent is blocked, uncertain, producing risky advice, missing tool access, or dealing with a broken system.

## Fast Triage

1. Define system: repo, host, service, environment, owner.
2. Define symptom and expected behavior.
3. Check recent changes.
4. Gather evidence from logs, status, probes, tests, and source files.
5. Identify blast radius and data/security risk.
6. Route tool-specific issues to the matching skill `DOCTOR.md`.

## Common Failure Modes

| Symptom | Check | Fix |
| --- | --- | --- |
| Wrong environment | host/repo/branch/config | Stop and retarget. |
| No rollback | backup/snapshot/git state | Create rollback plan before change. |
| Guessing config | docs/schema/source | Verify schema before editing. |
| Tests pass but app broken | browser/health/user flow | Verify live behavior. |
| Secret exposure risk | logs/output/files | Stop, redact, escalate. |
| Remote edit fragility | edit method | Pull/edit/check/push/verify. |

## Escalation

Escalate suspected breach, data loss, production outage, destructive migration, credential exposure, public DNS/proxy changes, and unclear ownership.

## Doctor Report Format

```text
Status: healthy | degraded | blocked | risky | down
System:
Environment:
Symptom:
Evidence collected:
Likely cause:
Risk/blast radius:
Skill doctor used:
Recommended next action:
Verification gate:
```
