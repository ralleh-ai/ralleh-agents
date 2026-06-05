# IT Workflows

## Workflow Index

- Incident response.
- Architecture review.
- Deployment hardening.
- Data migration.
- Cross-platform troubleshooting.
- Repository/CI review.

## Incident Response

Purpose: restore service safely and learn from failure.

Inputs: symptom, service, environment, recent changes, logs, monitoring, customer impact.

Steps:

1. Create/resume CORTEX incident task.
2. Declare severity and blast radius.
3. Freeze risky unrelated changes.
4. Gather evidence: status, logs, health checks, recent deploys, config.
5. Identify mitigation before permanent fix.
6. Apply approved reversible fix.
7. Verify service and user-facing behavior.
8. Record cause, prevention, and follow-ups.

Outputs: incident summary, cause, fix, verification, prevention tasks.

Verification: live health/user flow plus logs/metrics stable.

## Architecture Review

Purpose: evaluate a system design before implementation or scale-up.

Inputs: product goal, constraints, diagrams/docs, repo, data model, traffic assumptions, security needs.

Steps:

1. Identify purpose and boundaries.
2. Map components and data flow.
3. Identify trust zones and external dependencies.
4. Review failure modes and scaling path.
5. Review observability, backup, and rollback.
6. Produce recommendations prioritized by risk and value.
7. Create diagram when helpful.

Outputs: architecture verdict, diagram, risks, recommendations, next decisions.

Verification: recommendations tie to stated constraints and evidence.

## Deployment Hardening

Purpose: make deployment safer, repeatable, and observable.

Inputs: repo, deploy target, runtime, config, secrets, proxy, health checks, rollback path.

Steps:

1. Inspect current deployment path.
2. Confirm environment and owner.
3. Check git status, build/test, config, secrets, migrations.
4. Verify health check and logs.
5. Confirm backup/rollback.
6. Apply approved hardening changes.
7. Verify live endpoint and user flow.

Outputs: hardening checklist, changes, verification evidence, residual risks.

Verification: build/test plus live health/user-flow evidence.

## Data Migration

Purpose: move or transform data without loss.

Inputs: source, target, schema, row counts, backups, downtime window, validation queries.

Steps:

1. Define source/target and success criteria.
2. Back up source and confirm restore path.
3. Dry-run migration on sample or staging when possible.
4. Validate counts, checksums, and critical records.
5. Plan rollback and communication.
6. Execute only after approval.
7. Validate post-migration and monitor.

Outputs: migration plan, validation results, rollback plan, final evidence.

Verification: counts/checksums/spot checks match expected results.

## Cross-Platform Troubleshooting

Purpose: diagnose OS-specific failures without applying wrong commands.

Inputs: OS, shell, runtime version, path, failing command, expected behavior.

Steps:

1. Confirm OS and shell.
2. Confirm tool versions and paths.
3. Reproduce safely.
4. Identify OS-specific syntax/path/env differences.
5. Apply smallest fix.
6. Verify on the target OS.

Outputs: cause, OS-specific fix, verification.

Verification: command succeeds on target OS.

## Repository/CI Review

Purpose: determine whether a repo or PR is safe to ship.

Inputs: repo, branch/PR, CI runs, diff, tests, deployment target.

Steps:

1. Inspect git status/branch.
2. Review diff and changed risk areas.
3. Inspect CI status and failed logs.
4. Run local tests when appropriate.
5. Verify config/secrets are not committed.
6. Produce ship/block recommendation.

Outputs: verdict, risks, required fixes, verification evidence.

Verification: CI/local checks and targeted inspection support verdict.

## What Belongs in examples/

Concrete incident reports, architecture review packets, hardening checklists, and migration plans belong in `examples/`.
