# TOOLS.md — BRAIN Local Notes

BRAIN operates with four core tools and a structured set of file conventions. Know all of them cold.

---

## Core Tools

### Engram (Ralleh Memory)
**Purpose:** Primary memory layer. Stores and retrieves curated entity summaries, session decisions, operational patterns, and long-term knowledge.

**BRAIN uses Engram for:**
- L1 hot-cache entity card reads (`data/cache/<entity_id>.json`)
- Reflect write-backs — updating entity state after orchestrator execution
- Memory compaction — folding daily notes into curated long-term records
- Correction capture — logging when orchestrator overrides BRAIN context
- Pattern extraction — surfacing recurring gaps as curation backlog items

**Key conventions:**
- Hot cache cards: `roles/brain/data/cache/<entity_id>.json`
- TTLs per entity type defined in GUIDELINES.md Staleness TTL table
- Engram is L1. Never skip to L2/L3 while L1 is fresh.

---

### Cortex (Ralleh Tasks)
**Purpose:** Live work graph. All active tasks, owners, priorities, blockers, dependencies, and deadlines.

**BRAIN uses Cortex for:**
- Work graph queries — what is active, blocked, overdue
- Critical-path risk detection — what is on the highest-risk path right now
- Task state updates via reflect events — closing loops after execution
- Entity-to-task linking — connecting clients, projects, decisions to their active work items
- Sprint and milestone tracking

**Key conventions:**
- Query Cortex whenever a request involves: scheduling, ownership, deadlines, resource allocation, or prioritization
- Task reflect writes go to Cortex AND to `reflect-events.jsonl`
- Cortex is authoritative for task state — never infer task state from memory alone

---

### Ralleh Vault + VAULT Agent + VAULT-FAST Agent
**Purpose:** L3 source-of-truth document store. Canonical contracts, decisions, procedures, legal docs, transcripts.

**BRAIN uses Vault for:**
- Deep reference lookups — verification of entity records against canonical sources
- Crystallization — generating new entity cards from raw vault content
- Sensitive document pointers — BRAIN never stores raw sensitive content; it stores vault path + summary

**VAULT Agent** (senior, high-quality):
- Deep synthesis, conflict resolution, decision/procedure canonicalization
- High-stakes crystallization requiring judgment
- Index/MOC integrity and graph maintenance
- **Use for:** complex queries, contradictions, final crystallization

**VAULT-FAST Agent** (fast, high-volume):
- Inbox triage, classification, template application
- Bulk normalization, lightweight linking prep
- Handoff batches to VAULT when ambiguity is detected
- **Use for:** bulk processing, inbox clearing, structured draft generation

**Escalation rule:** when BRAIN needs vault content → prefer VAULT-FAST for retrieval drafts, VAULT for anything involving conflict, synthesis, or high classification.

---

### n8n + N8N Agent
**Purpose:** Automation orchestration. All workflow execution, scheduled pipelines, webhook triggers, and cross-system integrations.

**BRAIN uses n8n/N8N Agent for:**
- Surfacing workflow execution history as context for orchestrator decisions
- Requesting Cortex/Engram sync workflows (e.g., daily curation, freshness audits)
- Providing context packets to n8n workflows requiring entity or decision history
- Triggering scheduled BRAIN maintenance cycles (curation, audit, archive)

**Cron job IDs managed via n8n:**
- `brain-curation-daily` — daily entity freshness pass + compact summary refresh
- `brain-audit-weekly` — stale/contradiction audit + classification checks
- `brain-archive-monthly` — low-signal context archive + full summary refresh
- `brain-kpi-daily` — KPI snapshot generation
- `brain-pilot-daily-cycle` — pilot governance (KPI → checkpoint → acceptance → readiness)

---

## File & Path Conventions

| Purpose | Path |
|---|---|
| Entity registry root | `roles/brain/data/entities/` |
| Hot cache cards | `roles/brain/data/cache/<entity_id>.json` |
| Reflect event log | `roles/brain/data/logs/reflect-events.jsonl` |
| Sensitive retrieval audit log | `roles/brain/data/logs/retrieval-audit.jsonl` |
| Context packet schema | `roles/brain/schemas/brain-packet.v1.schema.json` |
| Entity record schema | `roles/brain/schemas/entity-record.v1.schema.json` |
| Work graph schema | `roles/brain/schemas/work-graph.v1.schema.json` |
| Pilot data | `roles/brain/data/pilot/` |
| Reports | `roles/brain/reports/` |
| Scripts | `roles/brain/scripts/` |
| Examples | `roles/brain/examples/` |

---

## Integration Contact Points

| Agent / Tool | Contact Method | Primary Use |
|---|---|---|
| Engram | Direct memory read/write API | Entity cards, reflect writes, curation |
| Cortex | Task graph query/update API | Work graph, blockers, task state |
| VAULT agent | OpenClawA2A session | Deep synthesis, conflict resolution |
| VAULT-FAST agent | OpenClawA2A session | Bulk triage, template drafts |
| N8N agent | OpenClawA2A session + webhook | Automation pipelines, cron triggers |
| Orchestrator | brain.preflight / brain.reflect hooks | Context packets, execution feedback |
