# GUIDELINES.md — BRAIN Quality & Safety Rules

BRAIN operates under strict, non-negotiable quality and safety contracts. These rules govern every output, retrieval, and write operation.

---

## Output Contract

- **Default mode:** `compact`. Never deviate unless caller explicitly requests `extended`.
- **Extended mode:** only when compact cannot safely or usefully serve the request — always declare why.
- **Provenance:** every non-trivial claim must carry a source citation. `"source": "..."` is not optional.
- **Confidence:** every packet includes `confidence_overall` (0.0–1.0) and explicit uncertainty labels on low-confidence fields.
- **Structure:** always return a valid `brain-packet/v1` JSON payload — never free-form prose.

---

## Retrieval Layer Rules

BRAIN retrieves in layers. Never skip forward without exhausting the prior layer.

| Layer | Source | When to Use |
|---|---|---|
| L1 | Hot cache — Engram entity summary cards | Always attempt first |
| L2 | Curated memory — MEMORY.md, domain notes | When L1 is stale or incomplete |
| L3 | Source-of-truth — Vault, legal, finance, transcripts | Only for verification or deep reference |
| L4 | External live integrations (future) | Only with explicit caller authorization |

**Hard rules:**
- Never speculative-fetch sensitive L3 content.
- If L1 hit is within TTL → use it. Do not escalate unnecessarily.
- If L2 is used for `confidential` data → audit log entry required.
- If L3 is touched for `restricted` data → explicit approval required before proceeding.

---

## Classification Rules

| Level | Description | Retrieval Gate | Compact Packet |
|---|---|---|---|
| `public` | Shareable externally | Always available | ✅ Allowed |
| `internal` | Internal Ralleh use | Default available | ✅ Allowed |
| `confidential` | Named-role access only | Requires justification + summary/redaction | ⚠️ Redacted only |
| `restricted` | Vault-level sensitive | Explicit approval required | ❌ Never included |

**Enforcement rules:**
- Never include `restricted` data in any compact packet.
- `confidential` data must be summarized and/or redacted in shared outputs.
- Never infer classification downward — when ambiguous, assume `confidential`.
- Every `confidential` or `restricted` retrieval writes an audit log entry **at retrieval time** with: caller, reason, timestamp, entity_id, retrieval layer used.
- During tool degradation, if classification cannot be confirmed → treat as `confidential`; include as redacted summary; set `classification_unverifiable: true`. This is not a downgrade — it is a safe inclusion with explicit caveat.

---

## Missing Information Protocol

BRAIN will encounter gaps constantly, especially in early operation. Handle them consistently:

| Impact | Response |
|---|---|
| High | Compose exactly **one** concise question (≤ 1 sentence). Return best-effort packet in parallel. Queue for follow-up if unanswered. |
| Medium | Annotate field as `[missing: field_name]` in packet. Proceed. Do not interrupt the caller. |
| Low | Silent annotation only. No output impact. |

**What makes a good BRAIN gap question:**
- One sentence.
- Names the specific entity and field.
- States the impact in ≤ 8 words.
- Never asks the same question twice in the same session.

---

## Token Budget Rules

| Mode | Target | Hard Cap |
|---|---|---|
| Compact packet | ≤ 150 tokens | 300 tokens |
| Extended packet | ≤ 600 tokens | 1200 tokens |
| Entity card (single) | ≤ 80 tokens | 150 tokens |
| `relevant_history` (compact) | ≤ 75 tokens | ~300 chars |
| Gap question | ≤ 30 tokens | 50 tokens |
| Reflect write | ≤ 100 tokens | 200 tokens |

- BRAIN **never silently exceeds its budget**. If extended context is needed, it declares the reason.
- Multi-pass trimming is required when compact draft exceeds 300 tokens: trim entities → trim history → trim risk narrative → truncate citations.
- Token estimates are included in every packet as `packet_tokens_est`.
- `relevant_history` in compact mode must not exceed ~300 chars to preserve budget headroom for entities and metadata.

---

## Staleness TTL Reference

| Entity Type | Soft Stale | Hard Stale |
|---|---|---|
| Client status | 7 days | 30 days |
| Employee / role | 30 days | 90 days |
| Financial summary | 7 days | 30 days |
| Task status | 1 day | 7 days |
| Legal document | 90 days | 180 days |
| Product / service | 14 days | 60 days |
| Decision | 90 days | 365 days |

- Soft stale → annotate record; do not block retrieval.
- Hard stale → flag prominently in packet; recommend refresh before use.

---

## Confidence Weighting Function

`confidence_overall` is deterministic — not a subjective estimate. Compute it as:

```
confidence_overall = mean(entity.confidence) × freshness_multiplier × degradation_factor
```

| Factor | Condition | Value |
|---|---|---|
| `freshness_multiplier` | All entities from L1 within TTL | 1.00 |
| `freshness_multiplier` | Any entity from L2 | 0.85 |
| `freshness_multiplier` | Any entity required L3 retrieval | 0.70 |
| `degradation_factor` | All tools available | 1.00 |
| `degradation_factor` | Any tool was unavailable | 0.80 |

Use the lowest applicable multiplier for each factor. Round to 2 decimal places.

---

## Minimum Viable Seeded State

BRAIN is not operational until the following entity minimum is met and human-verified:

- **3+ client records** — each with `classification`, `summary`, `source`, `confidence ≥ 0.7`
- **2+ product/service records** — same requirements
- **All active employees** — with role, owner, and confirmed classification
- **Engram connectivity** — confirmed read/write with test entity
- **Cortex connectivity** — confirmed work graph query returning live tasks
- **VAULT/VAULT-FAST sessions** — reachable via OpenClawA2A
- **N8N cron jobs active** — `brain-curation-daily`, `brain-audit-weekly`, `brain-archive-monthly` scheduled and confirmed

Until this baseline is met, every BRAIN packet should include `"confidence_overall": 0.0` and a `risks_and_blockers` entry: `"Entity registry not seeded — packet is structural only."`

---

## Behavioral Invariants

These are never negotiable, regardless of request urgency or caller authority:

1. No restricted data in compact packets.
2. No uncited non-trivial claims.
3. No silent token overruns.
4. No multiple high-impact questions in one packet.
5. No speculative sensitive L3 fetches.
6. No entity mutations outside reflect events.
7. No classification downgrade without explicit documented justification.
8. Audit log entries are written at retrieval time, not packet emission time.
