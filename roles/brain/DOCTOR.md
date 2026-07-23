# DOCTOR.md — BRAIN Diagnostic & Recovery Guide

BRAIN DOCTOR is the systematic triage and recovery protocol for context quality regressions, tool failures, classification incidents, and operational drift. Run it proactively during audits and reactively when quality degrades.

---

## Fast Triage Checklist

Run in order. Stop at the first failure and address it before continuing.

1. **Package structure** — all required role files present: `SOUL.md`, `IDENTITY.md`, `AGENTS.md`, `GUIDELINES.md`, `WORKFLOWS.md`, `MEMORY.md`, `TOOLS.md`, `PATTERNS.md`, `DOCTOR.md`.
2. **Schema validity** — `brain-packet.v1.schema.json`, `entity-record.v1.schema.json`, `work-graph.v1.schema.json` parse without errors. Sample packets validate against schemas.
3. **Entity registry health** — registry records in `data/entities/` all carry required minimum fields (`id`, `type`, `name`, `summary`, `owner`, `source`, `last_verified_at`, `classification`, `confidence`).
4. **Freshness state** — scan hot-cache cards in `data/cache/`. Flag any records past soft TTL. Hard-stale records must be annotated `"stale": true`.
5. **Contradiction markers** — any entity records with `[conflict:...]` annotations must have a linked Cortex curation task.
6. **Validate audit log coverage:** every `confidential`/`restricted` retrieval must have a matching entry in `retrieval-audit.jsonl`. Audit entries are written at retrieval time — if an entry is missing, the retrieval was unlogged, not the packet emission.
7. **Token budget log** — scan recent packet outputs for entries with `packet_tokens_est > 300` (compact) or `> 1200` (extended). Flag as overruns.
8. **Tool connectivity** — verify Engram read/write, Cortex query, VAULT agent session, and N8N agent reachability.

---

## Common Failures & Remediation

### F1: Missing or invalid packet fields
**Symptom:** `brain-packet/v1` output fails schema validation or is missing required keys.  
**Cause:** Template drift, manual edit error, schema update not applied.  
**Fix:** Re-validate against `brain-packet.v1.schema.json`. Identify missing keys. Patch packet assembly logic. Re-run sample preflight.

### F2: Uncited non-trivial claims
**Symptom:** Entity summary or history section contains factual claims without `"source"` field.  
**Cause:** L1 cache card was generated without provenance. Manual entry bypassed citation requirement.  
**Fix:** Identify source of the claim. Add `"source"` and `"last_verified_at"` to the entity record. If source is unknown → set `"confidence": 0.3` and annotate `[unverified]`. Queue a Cortex task to verify.

### F3: Stale records missing stale markers
**Symptom:** Entity records past hard TTL have `"stale": false`.  
**Cause:** Curation loop failed to run or TTL check logic is broken.  
**Fix:** Trigger `brain-curation-daily` manually via N8N agent. Verify TTL check logic. Check cron job health in n8n.

### F4: Multiple high-impact questions in one packet
**Symptom:** `missing_info[]` array contains more than one entry with `"impact": "high"`.  
**Cause:** Gap handling logic not applying single-question rule.  
**Fix:** Audit gap handling pattern (PATTERNS.md Pattern 2). Select only the highest-priority gap question. Demote remaining high gaps to medium.

### F5: Classification leakage in compact packet
**Symptom:** Compact packet contains `restricted` data or unredacted `confidential` content.  
**Cause:** Classification enforcement check (PATTERNS.md Pattern 4) not applied before packet emission.  
**Fix:** Immediately remove affected packet from any shared context. Audit classification enforcement logic. Add final-scan step to compact packet assembly. Log incident in `retrieval-audit.jsonl`. Review with security owner.

### F6: Token budget overrun
**Symptom:** `packet_tokens_est` exceeds hard cap (300 compact / 1200 extended).  
**Cause:** Trimming logic not applied or insufficient trim passes.  
**Fix:** Apply multi-pass trimming (PATTERNS.md Pattern 5). Trace which field caused bloat. Update trimming thresholds if needed.

### F7: Tool connectivity failure
**Symptom:** Engram returns error, Cortex unreachable, VAULT agent session fails.  
**Cause:** Service down, auth expired, network issue.  
**Fix:**
- **If Engram is unavailable:** skip L1; proceed immediately to L2 (MEMORY.md, domain notes). Annotate packet `tool_degraded: ["engram"]`. Entities with unverifiable classification are included as redacted summaries with `classification_unverifiable: true`. Do not block or fail the request.
- **If Cortex is unavailable:** proceed without work graph data. Annotate packet with `tool_degraded: ["cortex"]`.
- **If VAULT/VAULT-FAST is unavailable:** skip L3 retrieval. Serve L1/L2 data only. Annotate packet accordingly.
- In all cases: return best-effort packet. Never return nothing. Escalate to N8N agent for service health check. Do not block packet return on any single tool failure.

### F8: Reflect event loss
**Symptom:** `reflect-events.jsonl` missing entries for known execution events.  
**Cause:** Write failure during reflect workflow.  
**Fix:** Check retry queue for pending reflect payloads. Replay from orchestrator session history if available. Append missing entries with `"replayed": true` annotation. Audit reflect write path for error handling gaps.

---

## Remediation Priority Order

1. 🔴 **Security / classification violations** — immediate. Stop affected packet flows.
2. 🔴 **Schema validity failures** — immediate. No packet emission until resolved.
3. 🟠 **Provenance / citation gaps** — high priority. Confidence degrades until fixed.
4. 🟡 **Freshness and staleness issues** — medium priority. Flag and queue curation.
5. 🟡 **Contradiction markers unresolved** — medium priority. Annotate and queue.
6. 🟢 **Token budget overruns** — low urgency unless persistent. Tune trimming.
7. 🟢 **Audit log coverage gaps** — schedule backfill; not blocking.

---

## Recovery Verification

After any remediation, confirm recovery by:
1. Running a sample `brain.preflight` call with a known entity.
2. Validating packet output against schema.
3. Confirming token estimate within budget.
4. Confirming no `restricted` fields in compact output.
5. Confirming `retrieval-audit.jsonl` entries are present for any sensitive retrievals.
6. Running `brain.audit` workflow and verifying clean report.
