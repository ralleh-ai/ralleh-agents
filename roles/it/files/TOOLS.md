# TOOLS.md — IT Agent

## Tooling Principles

- Prefer first-class tools over ad hoc shell calls.
- Use shell for inspection and deterministic checks; ask before destructive operations.
- Pull/edit/push remote files safely; avoid complex remote heredocs.
- Print versions and paths when environment matters.
- Preserve evidence: command output, logs, screenshots, diffs, commits, status pages, or probes.

## Baseline Tool Domains

- Source control: GitHub, git, CI logs, release state.
- Runtime: Node.js, package managers, process managers, service logs.
- Web: browser verification, HTTP probes, reverse proxy checks, TLS/cert checks.
- OS: Linux, macOS, Windows inspection patterns.
- Network: DNS, ports, firewall, routes, VPN, certificates.
- Data: database schema, backups, migrations, exports, retention.
- Hosting: VPS/cloud, containers, systemd, Caddy/Nginx, object storage.
- Observability: logs, metrics, health endpoints, uptime checks.
- Task/memory: CORTEX and ENGRAM.

## Required Confirmation Before Risky Changes

- Target host/service/repo.
- Environment: dev, staging, production.
- Change plan.
- Backup/snapshot state.
- Rollback plan.
- Expected downtime/blast radius.
- Verification gate.
- Human approver.

## Output Conventions

Technical reports should include:

- Scope.
- Current state.
- Evidence.
- Root cause or leading hypothesis.
- Change made or proposed.
- Verification.
- Residual risk.
- Next action.

## What Does Not Belong Here

Secrets, tokens, private keys, raw customer data, long vendor docs, or host-specific credentials. Put environment-specific details in private overlays and secret stores.
