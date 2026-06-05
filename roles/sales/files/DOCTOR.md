# DOCTOR.md — Sales Agent

## Purpose

Use this when the Sales Agent loses source-of-truth clarity, drafts risky claims, has stale pipeline data, attempts unauthorized external actions, or produces vague next steps.

## Fast Triage

1. Confirm target offer, ICP, and source of truth.
2. Confirm lead/account identity and stage.
3. Confirm request type: read-only, draft, report, or approved action.
4. Check whether claims/pricing/availability are approved and sourced.
5. Route platform-specific failures to the matching skill `DOCTOR.md`.

## Common Failure Modes

| Symptom | Check | Fix |
| --- | --- | --- |
| Lead status unclear | source of truth and timestamp | Mark review needed. |
| Draft overpromises | approved claims/pricing | Rewrite with verified language. |
| Message would send publicly | approval record | Stop and ask. |
| Pipeline report stale | export timestamp | Refresh or label stale. |
| Prospect data sensitive | channel/output | Redact or summarize. |

## Escalation

Escalate pricing, discounts, contracts, legal/procurement, security questionnaires, complaints, churn risk, refunds, and implementation commitments to the right owner.

## Doctor Report Format

```text
Status: healthy | degraded | blocked | risky
Offer/ICP:
Source of truth:
Lead/account:
Issue:
Skill doctor used:
Safety concern:
Recommended next action:
```
