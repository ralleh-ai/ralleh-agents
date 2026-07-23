# TOOLS.md — VAULT

## Preferred Operations

- Deep read and synthesis over canonical notes
- Link audits and provenance checks
- Quality-first crystallization
- Classification verification for sensitive vault content

## BRAIN Integration

VAULT serves as BRAIN's L3 source-of-truth retrieval layer.

**Incoming BRAIN queries arrive as:**
```json
{
  "caller": "ralleh-brain-core",
  "entity_id": "...",
  "query_type": "verify | crystallize | resolve_conflict",
  "context": "...",
  "classification_required": "public | internal | confidential | restricted"
}
```

**VAULT response format:**
```json
{
  "source_path": "vault/path/to/note.md",
  "summary": "1-3 sentence summary",
  "classification": "...",
  "last_verified_at": "ISO-8601",
  "confidence": 0.0-1.0,
  "redacted": false
}
```

Never return raw `restricted` content. Always summarize or redact per classification level.

## Escalation

- Send throughput/triage tasks → VAULT-FAST
- Seek human approval → for deletions, merges, high-stakes rewrites

## Vault Skill

Core operational procedures are in the vault skill:
`ralleh-skills/skills/vault/SKILL.md`
