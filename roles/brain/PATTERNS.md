# PATTERNS.md — BRAIN

Reusable cognitive patterns for consistent, high-quality BRAIN operation. Apply these patterns reflexively — they encode the most common BRAIN decisions.

---

## Pattern 1: Compact Packet Assembly

**When:** Every preflight call in default mode.

```
Input:  request_summary + candidate entities + recent history + Cortex task state
Output: brain-packet/v1 compact payload with citations, confidence, and gap flags
```

Steps:
1. Identify entity types touched by the request (e.g., client, project, task).
2. Retrieve entity cards from L1 Engram hot-cache.
3. Validate TTL freshness per GUIDELINES.md staleness table.
4. Build `entities[]` array: id, type, name, summary, confidence, **source** (required).
5. Summarize relevant history in ≤ 2 sentences (≤ 300 chars for compact).
6. List `risks_and_blockers` from Cortex work graph.
7. Flag any `missing_info[]` per gap handling protocol.
8. Compute `confidence_overall` using the defined weighting function:
   - Base: arithmetic mean of all `entity.confidence` values in the packet.
   - Apply freshness multiplier: `1.0` if all entities are L1 hits within TTL; `0.85` if any entity came from L2; `0.70` if any entity required L3 retrieval.
   - Apply degradation penalty: `× 0.80` if any tool was unavailable during assembly.
   - Result: `confidence_overall = mean(entity.confidence) × freshness_multiplier × degradation_factor`.
9. Provide `recommended_action` in ≤ 1 sentence.
10. Estimate token count. Trim if approaching 300-token hard cap (see Pattern 5).

---

## Pattern 2: Gap Handling

**When:** A required or high-value field is absent from an entity record.

```
Input:  entity record with missing field + impact assessment
Output: missing_info[] entry in packet, optional gap question
```

Steps:
1. Identify the missing field and its owning entity.
2. Assess impact: **high** (blocks decision), **medium** (degrades quality), **low** (minor annotation).
3. High impact → compose one concise question (≤ 1 sentence, ≤ 30 tokens). Add to `missing_info[]` with `entity_id`, `reason`, and `queued_for_followup: false`. Return best-effort packet.
4. Medium impact → annotate field as `[missing: field_name]`. Include in packet. Proceed.
5. Low impact → silent annotation in entity record. No packet impact.
6. Never ask the same question twice in a session. Check session history before emitting.
7. If multiple high-impact gaps exist → ask only the single highest-impact one. Demote the rest to `impact: "medium"` in `missing_info[]`. Annotate demoted entries with `reason` explaining they were deprioritized.

---

## Pattern 3: Contradiction Resolution

**When:** Two or more records make conflicting claims about the same entity attribute.

```
Input:  two or more entity records with conflicting field values
Output: resolved or conflict-marked record + risk annotation in packet
```

**Severity definitions:**
- **High severity:** Conflicting values that would materially change a decision (e.g., contract status active vs terminated, payment amount, legal obligation, access level).
- **Low severity:** Conflicting values that are cosmetic or easily resolved (e.g., preferred name format, non-critical contact details, tag labels).

Steps:
1. Identify conflicting claims and their source records.
2. Rank by: (1) verification recency (`last_verified_at`), (2) source authority (L3 vault > L2 curated > L1 cache), (3) confidence score.
3. If a clear winner exists → prefer that value; annotate other as `[superseded]`.
4. If ambiguous → set `conflict_annotation` on entity record: `"[conflict: source_a vs source_b on field_name]"`.
5. Reduce `confidence` on the affected entity:
   - High severity conflict → reduce by `0.2`.
   - Low severity conflict → reduce by `0.1`.
6. Add a risk note to `risks_and_blockers`: "Conflicting data on [entity.field] — verify before acting."
7. Create a Cortex curation task to resolve the conflict; store task ID in `conflict_resolution_task_id` on the entity record.

---

## Pattern 4: Classification Enforcement Check

**When:** Building any packet that includes entity data.

```
Input:  entity record with classification level
Output: properly gated, redacted, or excluded entity data in packet
```

Steps:
1. Before retrieving any entity data → check `classification` on the target record.
2. **Write audit log entry at retrieval time** (not packet assembly time) for any `confidential` or `restricted` entity access. Log: caller, reason, timestamp, entity_id, retrieval layer.
3. `public` / `internal` → retrieve and include fully in compact or extended packet.
4. `confidential` → retrieve; summarize/redact; include redacted summary only in packet.
5. `restricted` → **never** include in compact packet; extended requires explicit approval. Log the access regardless.
6. During tool degradation, if classification cannot be confirmed → treat as `confidential`; include as redacted summary; set `classification_unverifiable: true` on the packet entity. This is not a downgrade — it is a safe inclusion with explicit caveat.
7. When classification is ambiguous in normal operation → assume `confidential`. Never downgrade without explicit documented justification.
8. Final scan before returning any packet → does any `restricted` data appear anywhere? If yes → remove and log violation attempt in `retrieval-audit.jsonl`.

---

## Pattern 5: Token Budget Enforcement

**When:** After assembling any packet draft.

```
Input:  packet draft with estimated token count
Output: budget-compliant packet or declared expansion reason
```

Steps:
1. Estimate token count of draft packet.
2. If within target (compact ≤ 150, extended ≤ 600) → return as-is.
3. If between target and hard cap → return with `packet_tokens_est` declared.
4. If approaching hard cap → multi-pass trim:
   - Pass 1: shorten entity summaries to 1-sentence minimum.
   - Pass 2: compress `relevant_history` to 1 sentence (≤ 150 chars).
   - Pass 3: truncate `risks_and_blockers` to top 2 items.
   - Pass 4: remove low-confidence citations.
5. If extended context is genuinely required → declare reason; request explicit `extended` mode from caller.
6. Never silently exceed hard cap.

---

## Pattern 6: Reflect Write-Back

**When:** After receiving a reflect payload from the orchestrator.

```
Input:  reflect payload (session_id, entities_updated, decisions_made, tasks_changed, notes)
Output: updated entity registry + Engram cache invalidation + audit log entries
```

**Write ordering:** `reflect-events.jsonl` first (write-ahead log). All other writes are derived and can be replayed from the log.

Steps:
1. Validate reflect payload schema.
2. For each `entities_updated` → merge delta into entity record; update `last_verified_at`.
3. For each `decisions_made` → create/update decision entity record with outcome, date, owner.
4. If any `confidential` or `restricted` entity was involved → write `retrieval-audit.jsonl` entry.
5. **Append immutable reflect event to `reflect-events.jsonl` first.**
6. Update Cortex work graph state for each task in `tasks_changed`. If unavailable → annotate `cortex_pending: true` on reflect event.
7. Invalidate Engram hot-cache cards for all updated entities. If unavailable → annotate `engram_pending: true` on reflect event.
8. Recompute `confidence` and `stale` flags for updated records.

---

## Pattern 7: BRAIN-Aware Agent Integration

**When:** Any Ralleh agent (VAULT, VAULT-FAST, N8N, Cortex, orchestrator) interacts with BRAIN.

```
Input:  agent request or execution completion event
Output: context packet (preflight) or updated records (reflect)
```

Protocol for agents calling BRAIN:
1. Before executing any multi-step or entity-involving task → call `brain.preflight(request_summary, mode="compact")`.
2. Use the returned packet to ground prompts, decisions, and tool calls.
3. After execution → call `brain.reflect(reflect_payload)` to close the loop.
4. If BRAIN returns a `missing_info[].question` → answer it before proceeding when possible; otherwise proceed with best-effort packet.
5. Treat BRAIN context as advisory, not authoritative — the executing agent retains judgment.
6. Never use BRAIN to bypass classification constraints.
