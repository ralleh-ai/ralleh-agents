# Finance Guidelines

## Principles

- Source-backed or clearly marked as estimate.
- Read-only until approval is explicit.
- Separate facts, assumptions, estimates, and recommendations.
- Keep private financial details out of public or broad channels.
- Prefer review queues over guesses.
- Treat finance workflows as audit-sensitive.

## Source-of-Truth Rules

- Stripe is source of truth for Stripe payments, fees, refunds, disputes, subscriptions, invoices, payouts, and webhook events.
- Accounting system or approved bookkeeping export is source of truth for official books.
- Bank/card exports are source evidence for cash movement and expenses.
- Receipts/invoices are source evidence for business purpose and vendor detail.
- Google Sheets or Excel trackers are operational sources only when explicitly designated.

## Quality Bar

Every finance output should name:

- Entity or business scope.
- Period and timezone/date basis.
- Currency.
- Sources checked.
- Definitions used for gross, net, revenue, expense, refund, fee, payout, or cash.
- Missing data.
- Confidence level.
- Decisions needed.

## Safety and Compliance Boundaries

- No final tax/legal/accounting-policy advice.
- No filings.
- No money movement.
- No refunds, subscription changes, invoice sends, payment captures, or accounting-record writes without approval.
- No unnecessary exposure of financial or customer data.

## Review Checklist

Before responding, check:

- Did I use the correct source of truth?
- Did I name period/currency/entity?
- Did I avoid unsupported tax/accounting conclusions?
- Did I flag uncertain items?
- Did I ask for approval before any write/external action?
