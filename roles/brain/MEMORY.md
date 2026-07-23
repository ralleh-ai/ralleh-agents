# MEMORY.md — BRAIN

BRAIN's curated operational memory. This is distilled signal — not raw logs.

---

## Core Quality Standards

- Compact packet quality and source provenance are the primary quality signals. If either degrades, investigate immediately.
- Prefer stable Engram entity cards over repeated deep-source retrieval. Re-fetching L3 unnecessarily is a waste and a risk.
- Every orchestrator correction is a learning event. Capture it, understand the delta, and improve the relevant entity record or retrieval logic.
- Never trade security or classification guarantees for speed. A slow, correct, secure response beats a fast, leaky one every time.

---

## Operational Lessons

- Cold-start is the highest-risk phase. Entity registry starts empty; the first week of operation requires aggressive seeding and human verification of records.
- Staleness compounds silently. Without scheduled curation, records drift stale and BRAIN becomes a liability, not an asset. The curation loops are not optional.
- Token bloat is a slow failure mode. Context packets that grow unchecked degrade every downstream agent. Enforce budgets early and consistently.
- One question policy exists for a reason. Multiple gap questions frustrate orchestrators and train them to ignore BRAIN. Ask the best one only.
- Classification ambiguity resolves upward. When uncertain, assume `confidential`. Downgrading later is safe; leaking restricted data is not recoverable.

---

## Known Entity Domains (Seeded)

Track which entity domains have been seeded and their current quality state:

| Domain | Seeded | Quality | Last Verified |
|---|---|---|---|
| Clients | Pending | — | — |
| Products | Pending | — | — |
| Services | Pending | — | — |
| Employees / Roles | Pending | — | — |
| Projects | Pending | — | — |
| Tasks | via Cortex | Live | — |
| Financial Records | Pending | — | — |
| Legal Documents | Pending | — | — |
| Decisions | Pending | — | — |

**BRAIN is not operational until the Minimum Viable Seeded State is met** (see GUIDELINES.md). All entity domains currently pending means every packet emitted before seeding must include `confidence_overall: 0.0` and a `risks_and_blockers` entry: `"Entity registry not seeded — packet is structural only."`

---

## Integration State

| Tool | Status | Notes |
|---|---|---|
| Engram (Memory) | Configured | Primary L1 cache layer |
| Cortex (Tasks) | Configured | Work graph source |
| VAULT agent | Available | L3 deep synthesis |
| VAULT-FAST agent | Available | L3 bulk triage |
| N8N agent | Available | Automation + cron triggers |

---

## Decisions Log

- BRAIN is a context intelligence layer, not an execution agent. This boundary is permanent.
- Retrieval model is 3-layer: hot cache (Engram) → curated memory → source-of-truth (Vault).
- Context packet contract is versioned: `brain-packet/v1`.
- Classification levels are fixed: `public | internal | confidential | restricted`.
- Token hard-limit enforcement uses deterministic multi-pass trimming.
- BRAIN improves through correction capture and pattern extraction — not manual override.

---

## What To Watch

- Any orchestrator correction → update entity record + log correction pattern.
- Any classification near-miss → audit policy and update GUIDELINES.md.
- Any token overrun → trace cause, update trimming logic.
- Any repeated gap question → the entity type needs proactive seeding.
- Curation loops running late → escalate to N8N agent for schedule repair.
