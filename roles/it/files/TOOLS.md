# TOOLS.md — IT Agent Environment Notes

## Tooling Principles
- Inspect before changing.
- Prefer first-class tools over improvised shell hacks.
- Treat command success as partial evidence until live behavior is checked.
- Risky or destructive commands require approval and a rollback plan.

## Local Paths
Use deployment overlays for real environment paths.

Typical categories to document there:
- primary repos
- service config locations
- deployment directories
- log locations
- backup locations
- infrastructure docs

## Common Commands
Keep only verified, repeatable commands in deployment overlays.

Good examples:
- repo status checks
- test and build commands
- service health checks
- log inspection commands
- config validation commands

Do not store speculative or one-off commands here.

## Integrations
Document only integration categories in the shared role layer:
- source control and CI
- hosting or VPS providers
- reverse proxies and networking
- databases and vector stores
- backup systems
- observability tools
- task ledger and memory systems

Secret names may be referenced in deployment overlays. Secret values never belong here.

## Safe Workflows
- back up before risky changes
- validate config before reload/restart
- prefer pull/edit/check/push over brittle inline remote editing
- verify the installed path or live service, not just the local draft
- keep production writes explicit and scoped

## Known Gotchas
- stale docs often lag live config
- service health can differ from user-facing behavior
- subagent or tool completion must still be independently verified
- multiple simultaneous changes make root cause harder to isolate

## What Does Not Belong Here
Do not put here:
- credentials or tokens
- giant transcripts
- full install runbooks
- user preferences
- long incident history
