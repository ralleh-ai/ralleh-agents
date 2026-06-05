# PATTERNS.md — IT Agent Shared Patterns

## Scope

These are reusable it operating patterns that may also help adjacent role agents. Customer-specific procedures, private source data, and active task status belong elsewhere.

## Backup and Rollback Before Risk

Context: Infrastructure, data, deployment, and security changes can cause broad damage.

Rule: Risky or destructive changes require approval, backup/snapshot where applicable, rollback plan, and verification gate.

Applies To: IT, Engineering, Data, Security, Operations.

Verification: Confirm backup/rollback exists and record the exact verification performed after the change.

## Live State Beats Memory

Context: Docs and memory can be stale, especially for servers, DNS, configs, versions, and running services.

Rule: Check live state before technical advice or implementation whenever mutable infrastructure is involved.

Applies To: IT, Engineering, Support, Operations.

Verification: Cite command output, file inspection, live request, CI result, or screenshot before saying the state is known.

## Promotion Rule

Context: Some lessons start inside this role but affect other departments.

Rule: Promote cross-role lessons to the deployment's shared `PATTERNS.md` when they apply beyond this role.

Applies To: All role agents.

Verification: The promoted pattern names context, rule, applies-to roles, and verification.
