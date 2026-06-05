# Finance Workflows

## Workflow Index

- Monthly close packet.
- Expense approval review.
- Budget forecast/variance review.
- Stripe revenue reconciliation.
- Missing document queue.

## Monthly Close Packet

Purpose: prepare a review-ready monthly close packet.

Inputs:

- Entity, month, currency, accounting source, Stripe export/report, bank/card exports, receipt source.

Steps:

1. Create or resume CORTEX task.
2. Confirm sources and period.
3. Gather read-only summaries.
4. Reconcile Stripe gross/net/fees/refunds/payouts.
5. Review uncategorized and missing receipts.
6. Prepare variance notes and decisions needed.
7. Output packet for owner/accountant review.

Outputs:

- Close summary.
- Review queue.
- Missing documents.
- Reconciliation differences.
- Questions for owner/accountant.

Verification:

- Source totals checked and named.
- Differences listed or marked none found.

## Expense Approval Review

Purpose: evaluate submitted expenses for completeness and review readiness.

Inputs: expense list, receipts, policy/rules, period, submitter/project.

Steps:

1. Match expenses to receipts.
2. Check duplicates and missing business purpose.
3. Categorize using approved rules.
4. Flag exceptions and decisions.
5. Prepare approval summary.

Outputs: approved-to-review list, exceptions, missing evidence, totals by category.

Verification: total expenses match source list; every exception has reason.

## Budget Forecast and Variance Review

Purpose: compare actuals to budget and produce a forward-looking review.

Inputs: budget, actuals, forecast assumptions, period, currency.

Steps:

1. Confirm metric definitions.
2. Compare actuals to budget by category.
3. Identify material variances.
4. Separate known causes from hypotheses.
5. Draft forecast notes and decisions needed.

Outputs: variance table, forecast assumptions, risks, owner decisions.

Verification: totals match source budget/actuals; assumptions are labeled.

## Stripe Revenue Reconciliation

Purpose: reconcile Stripe activity to finance reports.

Inputs: Stripe reporting period, payments, refunds, fees, disputes, invoices, subscriptions, payouts.

Steps:

1. Confirm test/live mode and account.
2. Pull read-only Stripe summaries.
3. Define gross revenue, net revenue, fees, refunds, disputes, and payout timing.
4. Compare to accounting/report totals.
5. List differences and likely causes.

Outputs: reconciliation summary, mismatches, follow-up actions.

Verification: account/mode/period confirmed; gross/net definitions named.

## Missing Document Queue

Purpose: surface missing receipts, invoices, statements, or approvals.

Inputs: transaction list, document repository, policy/rules.

Steps:

1. Match evidence to transactions.
2. Group missing evidence by owner/vendor/category.
3. Prioritize high-value or close-blocking items.
4. Draft request list.

Outputs: missing document queue and request text.

Verification: queue references transaction ids or stable source rows.

## What Belongs in examples/

Detailed role-played packets and sample outputs belong in `examples/`, not in this file.
