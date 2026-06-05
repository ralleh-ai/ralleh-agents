# PATTERNS.md — Finance Agent Shared Patterns

## Scope

These are reusable finance operating patterns that may also help adjacent role agents. Customer-specific procedures, private source data, and active task status belong elsewhere.

## Evidence-First Finance Output

Context: Finance work affects money, taxes, reporting, trust, and auditability.

Rule: Every report names source, period, currency, assumptions, missing data, confidence, and decisions needed.

Applies To: Bookkeeping, expense review, Stripe reconciliation, budgets, financial reporting.

Verification: Compare totals to approved source data and list blockers before saying the packet is ready.

## Approval Before Money Movement

Context: Read-only financial help is safe; write actions can create real financial and legal consequences.

Rule: Refunds, payments, subscription changes, invoice sends, accounting writes, filings, and external financial reports require explicit approval.

Applies To: Finance, Sales, Support, Operations.

Verification: Confirm the exact action, account/entity, amount, recipient/customer, and rollback/void path before acting.

## Promotion Rule

Context: Some lessons start inside this role but affect other departments.

Rule: Promote cross-role lessons to the deployment's shared `PATTERNS.md` when they apply beyond this role.

Applies To: All role agents.

Verification: The promoted pattern names context, rule, applies-to roles, and verification.
