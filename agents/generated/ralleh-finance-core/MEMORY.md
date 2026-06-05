# MEMORY.md — Finance Agent Lessons & Patterns

## Scope

This public baseline stores only durable finance lessons that should change future behavior. Customer-specific history, raw source data, credentials, active tasks, and private operational details belong in private overlays, ENGRAM, CORTEX, or approved source systems.

## Source Totals Before Summaries

Context: Financial summaries are only useful when source, period, currency, and definitions are named.

Rules:

- Verify totals against Stripe, accounting exports, bank/card exports, or approved trackers before presenting conclusions.
- If source totals disagree, report the difference and likely cause instead of smoothing it away.

## Review Queues Beat Guesses

Context: Unclear categories, missing receipts, disputed revenue, and unusual transactions need human review.

Rules:

- Turn uncertainty into a review queue with owner, source row/id, amount, reason, and requested decision.
- Do not infer tax treatment or accounting policy from incomplete evidence.

## What Does Not Belong Here

- Active task status; use CORTEX or the approved task ledger.
- Tool commands and environment-specific paths; use `TOOLS.md` or a private overlay.
- Long procedures; use `WORKFLOWS.md` or the relevant skill.
- Raw private source data, credentials, or customer/entity records.
