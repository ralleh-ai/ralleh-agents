# WORKFLOWS.md — BRAIN

All BRAIN workflows are deterministic, auditable, and schema-compliant. No workflow mutates state outside its defined write targets.

---

## Workflow Index

| Workflow | Trigger | Description |
|---|---|---|
| `brain.preflight` | Orchestrator request | Assemble context packet before execution |
| `brain.reflect` | Orchestrator post-execution | Update entities, tasks, decisions |
| `brain.curate` | Scheduled (Cron / n8n) | Freshness, contradiction, compaction |
| `brain.audit` | Scheduled (Cron / n8n) | Token, security, quality validation |
| `brain.escalate` | Internal decision point | Route to VAULT, VAULT-FAST, Cortex, or N8N |

`brain.preflight` is the sole external-facing packet assembly API. All inbound requests — whether from the orchestrator, specialist agents, or automation — go through `brain.preflight`. There is no separate `brain.message` wrapper; its rules (deduplication, single-question policy, reflect obligation) are enforced inside `brain.preflight` steps below.

---

## `brain.preflight`

**Trigger:** orchestrator or agent sends `request_summary` and `mode` before executing.
**Output:** valid `brain-packet/v1` payload, or `brain-error/v1` on failure.

**Deduplication rule:** same session + same `request_summary` hash → do not re-emit duplicate high-impact gap questions. Check session history before composing `missing_info[].question`.

Steps:
1. Parse `request_summary` and `mode` (`compact` | `extended`). Validate inputs.
2. Identify candidate entity types and domains from request.
3. **L1:** query Engram hot-cache for entity summary cards within TTL.
   - **If Engram unavailable:** annotate `tool_degraded: ["engram"]`, skip to step 4 (L2). Do not fail the request.
   - **If Engram returns a hit within TTL:** use it. Do not escalate to L2 unnecessarily.
4. **L2** (if L1 stale, incomplete, or Engram degraded): query curated MEMORY.md and domain notes.
5. **L3** (if verification required): invoke VAULT or VAULT-FAST for source-of-truth reference. Requires justification; never speculative.
6. Query Cortex for active tasks, blockers, dependencies relevant to request.
7. **Write audit log entries now** — before using any retrieved data — for every `confidential` or `restricted` entity accessed. Log: caller, reason, timestamp, entity_id, retrieval layer used.
8. Validate classification constraints — redact or exclude per level rules.
9. Detect gaps: assess impact (high / medium / low) per GUIDELINES.md protocol. Apply single-question rule: only one `high` impact question per packet.
10. Detect staleness: flag records beyond soft TTL; hard-flag records beyond hard TTL.
11. Detect contradictions: rank by authority/freshness; annotate conflict markers.
12. Build packet fields: `entities[]` (each with required `source`), `relevant_history`, `risks_and_blockers`, `missing_info`, `confidence_overall`, `recommended_action`.
    - Compute `confidence_overall` using the defined weighting function (see GUIDELINES.md).
    - For entities with unverifiable classification due to tool degradation: include as redacted summary; set `classification_unverifiable: true`; do not downgrade classification.
13. Enforce token budget (compact ≤ 300 hard cap): multi-pass trim if needed (see PATTERNS.md Pattern 5).
14. Return `brain-packet/v1` payload to caller.

**Failure behavior:** return `brain-error/v1` with `code`, `reason`, `recoverable`; preserve prior cache untouched.

---

## `brain.reflect`

**Trigger:** orchestrator posts reflect payload after execution completes.
**Output:** updated entity records + audit log entries.

**Write ordering discipline:** `reflect-events.jsonl` is the write-ahead log. Write it first (step 6). All other writes (Cortex, Engram) are derived state and can be replayed from the log if they fail. This prevents dual-write inconsistency.

Steps:
1. Accept reflect payload: `session_id`, `request_summary`, `entities_updated`, `decisions_made`, `tasks_changed`, `notes`.
2. Validate payload structure. On validation failure → write raw payload to retry queue before returning `brain-error/v1`.
3. For each entity in `entities_updated`: merge changes into registry record; recompute `last_verified_at`, `confidence`, `stale`.
4. For each decision in `decisions_made`: write new decision record to entity registry.
5. If any `confidential` or `restricted` entities were touched: append audit log entry to `retrieval-audit.jsonl`.
6. **Append reflect event to `reflect-events.jsonl` first** (append-only; never overwrite). This is the durable record.
7. Update Cortex work graph state for each task in `tasks_changed`. If Cortex is unavailable, annotate the reflect event with `cortex_pending: true`; replay from log when Cortex recovers.
8. Invalidate and refresh hot-cache cards for updated entities in Engram. If Engram is unavailable, annotate reflect event with `engram_pending: true`; replay when Engram recovers.

**Failure behavior:** never lose the event payload. Write to retry queue before returning any error. `reflect-events.jsonl` entry is the recovery source for all downstream writes.

---

## `brain.curate`

**Trigger:** scheduled via n8n cron jobs.

### Daily (`brain-curation-daily`)
1. Freshness pass: scan all hot-cache entity cards; mark soft/hard stale per TTL table.
2. Refresh stale compact summaries for high-priority entities.
3. Fold new daily notes (Engram daily log) into curated entity cards.
4. Update `last_verified_at` for refreshed records.

### Weekly (`brain-audit-weekly`)
1. Full contradiction scan across all entity domains.
2. Rank conflicts by authority/freshness; resolve or annotate with conflict markers.
3. Generate top-risk report for orchestrator review.
4. Identify critical-path gaps and queue curation backlog items.

### Monthly (`brain-archive-monthly`)
1. Archive entity records with low retrieval frequency and no active task linkage.
2. Compress older reflect event logs into archival summaries.
3. Refresh full summaries for long-lived entities (legal, product, employee).
4. Review curation backlog for resolved vs pending items.

---

## `brain.audit`

**Trigger:** scheduled weekly + on-demand.

Steps:
1. Run classification enforcement checks: scan compact and extended packet samples for `restricted` leakage and unredacted `confidential` content.
2. Validate token budget logs: identify compact overruns (>300 tokens) and extended overruns (>1200 tokens); generate alert entries.
3. Validate retrieval quality scores: check drift from baseline; flag degradation.
4. Validate audit log coverage: every `confidential`/`restricted` retrieval in `retrieval-audit.jsonl` must be present (audit log is written at retrieval time, not packet emission time).
5. Emit audit report to `reports/` with: pass/fail per category, remediation items, KPI snapshots.
6. Add remediation items to Cortex work graph with owner and priority.

---

## `brain.escalate`

**Trigger:** BRAIN determines a task exceeds its retrieval scope or requires specialist action.

| Condition | Escalate To | Method |
|---|---|---|
| Deep doc synthesis needed | VAULT agent | OpenClawA2A session |
| Bulk inbox or template work | VAULT-FAST agent | OpenClawA2A session |
| Task/blocker query or update | Cortex | Task graph API |
| Automation pipeline needed | N8N agent | OpenClawA2A session + webhook |
| Entity recall / write-back | Engram | Memory read/write API |
| Ambiguous strategic decision | Orchestrator | Return gap question in packet |
