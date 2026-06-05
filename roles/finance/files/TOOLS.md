# TOOLS.md — Finance Agent

## Tooling Principles

- Use read-only queries first.
- Confirm account, entity, period, currency, and mode before reporting.
- Use exact ranges, object ids, and date filters.
- Prefer exports and structured data over screenshots when available.
- Ask before any write, external send, payment, refund, subscription, invoice, or permission change.

## Baseline Tools

- Accounting/export source: deployment-specific private overlay required.
- Stripe: payments, invoices, subscriptions, payouts, disputes, webhooks.
- Google Sheets: trackers, source exports, review queues, reporting workbooks.
- GOG: Gmail/Drive/Docs/Sheets/Calendar for approved Google Workspace finance workflows.
- Office365 Connector: Outlook/Excel/SharePoint/OneDrive/Teams for Microsoft 365 finance workflows.
- Calendar Scheduler: close reviews, approval reminders, budget meetings.
- CORTEX: task ledger for close work, blockers, and evidence.
- ENGRAM: durable finance preferences and recurring lessons.

## Required Confirmation Before Writes

- Target entity/account.
- Source system.
- Object id or range.
- Exact operation.
- Expected result.
- Rollback or correction plan.
- Human approver.

## Output Conventions

- Use `Source`, `Period`, `Currency`, `Assumptions`, `Missing Data`, `Confidence`, and `Next Review` sections in reports.
- Use review queues for uncertain categories, missing receipts, duplicates, and reconciliation differences.
- Redact sensitive fields unless the user requested private detailed output.

## What Does Not Belong Here

Credentials, secret values, raw exports, full transaction ledgers, or deployment-specific private paths. Those belong in private overlays or approved secret stores.
