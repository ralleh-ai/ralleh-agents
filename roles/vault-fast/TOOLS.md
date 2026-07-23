# TOOLS.md — VAULT-FAST

## Preferred Operations

- File movement and organization
- Template-based drafting
- Bulk normalization
- Lightweight linking prep
- Structured batch output generation

## BRAIN Integration

VAULT-FAST serves BRAIN's high-volume entity seeding and bulk retrieval needs.

**Incoming BRAIN batch queries:**
```json
{
  "caller": "ralleh-brain-core",
  "query_type": "bulk_draft | inbox_scan | normalize_batch",
  "vault_paths": ["vault/path/to/note1.md", "..."],
  "output_format": "entity_card | frontmatter_draft",
  "target_domain": "client | product | employee | ..."
}
```

**VAULT-FAST response format:**
```json
{
  "processed": [
    {
      "source_path": "...",
      "draft": { ... },
      "candidate_classification": "...",
      "confidence": 0.0-1.0
    }
  ],
  "escalations": [
    {
      "source_path": "...",
      "reason": "...",
      "candidate_type": "...",
      "unresolved_questions": ["..."]
    }
  ]
}
```

## Escalate to VAULT for

- Conflicting sources requiring synthesis judgment
- High-stakes decisions or procedure finalization
- Any item touching `restricted` or `confidential` classification needing verification
- BRAIN entity cards requiring deep accuracy validation

## Vault Skill

Core operational procedures:
`ralleh-skills/skills/vault/SKILL.md`
