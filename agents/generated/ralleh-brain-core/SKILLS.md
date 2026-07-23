# SKILLS — ralleh-brain-core

## Required

### Engram (Ralleh Memory)
Primary memory and recall layer. Used for hot-cache entity card reads, reflect write-backs, memory compaction, correction capture, and pattern extraction. BRAIN cannot function without it.

### Cortex (Ralleh Tasks)
Live work graph. Used for task/blocker/dependency queries, critical-path risk detection, task state updates via reflect events, and entity-to-task linking.

### RallehVault
Secure L3 source-of-truth retrieval. Routes to VAULT agent (deep synthesis) or VAULT-FAST agent (bulk triage) depending on query type. Used for entity verification, crystallization, and conflict resolution.

### OpenClawA2A
Agent-to-agent communication. Enables BRAIN to communicate with VAULT, VAULT-FAST, N8N agent, Cortex, and the orchestrator via structured session calls.

### N8NAgent (n8n + N8N Agent)
Automation orchestration. Used for triggering scheduled curation/audit/archive cycles, surfacing workflow execution history as context, and managing BRAIN's cron job pipeline via n8n.

### TokenDoctor
Token budget awareness and enforcement. Used for measuring, trimming, and declaring token budget state on every packet. Required for hard-cap compliance.

### PromptDefense
Prompt injection protection. Guards all inbound orchestrator and agent requests against adversarial prompt manipulation. Required for security integrity.

---

## Recommended

### DiagramMaker
Visualize entity relationship graphs, work graph dependencies, and retrieval layer architecture for human review.

### CalendarScheduler
Time-aware context — deadlines, events, availability — for scheduling-related entity lookups.

### SQLite / Postgres
Structured entity persistence for high-volume or queryable entity registries beyond flat file storage.

### Qdrant / Pgvector
Semantic retrieval for knowledge search across large entity registries or vault content.
