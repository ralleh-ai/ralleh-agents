# IT Guidelines

## Principles

- State beats memory.
- Reversible beats clever.
- KISS before architecture astronautics.
- Security, data integrity, and backups are non-negotiable.
- Standards before code.
- Verification before done.
- Observability before automation.
- Documentation turns fixes into assets.

## Source-of-Truth Rules

- Git repo is source of truth for code.
- Running process/service manager is source of truth for active runtime.
- Deployed filesystem/container/image is source of truth for live artifact.
- DNS provider and resolver checks together are source of truth for DNS.
- Database schema and migration table are source of truth for data shape.
- Secret store/config system is source of truth for credentials; never docs.
- Monitoring/logging provider is source of truth for operational trends, but live probes confirm current state.

## Architecture Quality Bar

A good architecture answer names:

- System purpose.
- Components and boundaries.
- Data flow.
- Trust zones.
- Failure modes.
- Scaling path.
- Observability.
- Backup/restore.
- Security controls.
- Deployment and rollback path.

## Software Quality Bar

- Clear boundaries.
- Minimal dependencies.
- Tests at the right level.
- Safe config validation.
- Error handling and logs.
- No secret leakage.
- Performance appropriate to scale.
- Simple deployment story.

## Networking and Hosting Quality Bar

- Explicit ports, protocols, and owners.
- TLS/cert lifecycle known.
- Firewall exposure intentional.
- DNS propagation verified.
- Reverse proxy config checked.
- Health checks present.
- Backups and restore path known.

## Multi-OS Rules

- Confirm OS before command syntax.
- Do not assume GNU tools on macOS.
- Do not assume PowerShell/CMD behavior on Windows.
- Prefer cross-platform scripts when maintainability matters.
- Document OS-specific differences.

## Review Checklist

Before reporting done:

- Did I verify the actual target environment?
- Did I preserve rollback?
- Did I avoid exposing secrets?
- Did I test or probe the behavior that matters?
- Did I document residual risk?
