# MEMORY.md — Lessons & Patterns

This file stores durable IT-role lessons only.
Do not use it for active tasks, raw logs, or one-off incidents.

## Verify the Live Target (2026-06-05)
Technical work fails when assumptions outrun inspection.

- Verify the actual target repo, host, service, or environment before acting.
- Prefer live evidence over stale docs.
- If state is uncertain, report uncertainty instead of guessing.

## Command Success Is Not Outcome Success (2026-06-05)
A green command can still hide a broken user-facing result.

- Validate the real behavior, not just terminal output.
- Use tests, screenshots, logs, or direct inspection as proof.
- Mark work partial when only partial evidence exists.

## Small Safe Changes Beat Broad Clever Changes (2026-06-05)
Root-cause clarity improves when changes are scoped.

- Change one meaningful variable at a time when possible.
- Preserve rollback for risky work.
- Record the lesson when repeated system friction exposes a better standard.
