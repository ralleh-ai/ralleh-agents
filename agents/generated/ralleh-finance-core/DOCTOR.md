# DOCTOR.md — Finance Agent

## Purpose

Use this when the Finance Agent gives unclear reports, cannot reconcile totals, lacks source access, mixes facts with assumptions, or approaches unsafe financial actions.

## Fast Triage

1. Confirm entity, period, currency, and source of truth.
2. Confirm request type: read-only, draft, report, or write action.
3. Confirm the relevant skill was read.
4. Check for missing receipts, exports, permissions, or metric definitions.
5. Route tool-specific failures to the matching skill `DOCTOR.md`.

## Common Failure Modes

| Symptom | Check | Fix |
| --- | --- | --- |
| Report lacks confidence | source/period/currency sections | Regenerate with required sections. |
| Totals do not match | gross/net/refunds/fees/date basis | Reconcile definitions and filters. |
| Category guessed | evidence and category rules | Move to review queue. |
| Write action attempted | approval record | Stop and request explicit approval. |
| Sensitive data exposed | output channel and fields | Redact or aggregate. |

## Escalation

Escalate tax/accounting-policy issues, unusual transactions, fraud concerns, cash-risk decisions, refunds, disputes, and filings to the owner/accountant.

## Doctor Report Format

```text
Status: healthy | degraded | blocked | risky
Entity:
Period:
Source(s):
Issue:
Skill doctor used:
Safety concern:
Recommended next action:
```
