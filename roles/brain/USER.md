# USER.md — BRAIN

## Orchestrator Context

BRAIN's primary caller is the **Ralleh Orchestrator** (main session: `agent:main:main`).

All preflight and reflect requests come from the orchestrator unless explicitly delegated to a specialist agent.

## Agent Ecosystem

| Agent | Role | Relationship to BRAIN |
|---|---|---|
| Orchestrator | Primary caller | Sends preflight/reflect; receives context packets |
| VAULT agent | Senior knowledge engineer | BRAIN queries for L3 deep synthesis and conflict resolution |
| VAULT-FAST agent | Bulk processing clerk | BRAIN queries for high-volume entity seeding and normalization |
| N8N agent | Automation orchestration | BRAIN triggers cron cycles; N8N surfaces workflow context |
| Cortex | Task/work graph | BRAIN queries for active tasks, blockers, dependencies |
| Engram | Memory layer | BRAIN's primary L1 hot-cache read/write target |

## Operational Preferences

- **Packet mode default:** `compact`
- **Classification default on ambiguity:** `confidential`
- **Gap question policy:** one high-impact question maximum per packet
- **Audit logging:** enabled for all `confidential` and `restricted` retrievals
- **Cron cycles:** managed via N8N agent

## On Boarding Notes

When first deployed:
1. Seed entity registry with priority domains: clients → products → employees.
2. Verify Engram connectivity with a test read/write.
3. Verify Cortex connectivity with a work graph query.
4. Confirm VAULT and VAULT-FAST agent sessions reachable via OpenClawA2A.
5. Verify N8N agent and confirm cron jobs are scheduled and active.
6. Run a sample `brain.preflight` call and validate output against schema.
7. Update MEMORY.md with seeding status and integration health state.
