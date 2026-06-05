# Architecture

## Goal

Provide a single repo where Ralleh can:

- keep reusable agent templates
- generate new agents consistently
- preserve custom agents as first-class assets

## Model

### Templates
Templates are canonical starting points. They should be stable, reusable, and safe to clone.

### Generated agents
Generated agents begin life from a template and keep a reference to `sourceTemplate`.

### Custom agents
Custom agents are hand-tuned or promoted generated agents that have diverged materially from their template.

## Baseline import

The initial template baseline came from the provided archive and is stored at:

- `templates/professional-baseline/`

That folder is preserved as the source baseline so future generation stays faithful to the original structure.

## Rendering model

The generator currently performs light placeholder substitution for:

- `[AGENT_NAME]`
- `[CLIENT_NAME_OR_COMPANY]`
- `[CHOOSE_APPROPRIATE_EMOJI]`
- `[PRIMARY_LOCATION_OR_TIMEZONE]`
- `[CLIENT_ROLE_OR_BUSINESS_DESCRIPTION]`
- `[LIST_MAJOR_PROJECTS_OR_RESPONSIBILITIES_WITH_BRIEF_STATUS]`
- `[DESCRIBE_ANY_KNOWN_SECURITY_CONCERNS_OR_PAST_INCIDENTS_AT_HIGH_LEVEL_ONLY — e.g. "Heightened caution around unexpected links and social engineering attempts"]`
- `[DIRECT / STRUCTURED / CONCISE / DETAILED — any specific style notes]`
- `[WHAT_THE_AGENT_MAY_DO_AUTONOMOUSLY_VS_MUST_CONFIRM]`
- `[MEDICAL, LEGAL, FINANCIAL, REGULATED_TOPICS — e.g. "Research only; always include professional consultation disclaimer"]`
- `[e.g. Direct, insightful, structured output with clear sections and actionable items. Avoid corporate fluff.]`
- `[e.g. Overly verbose responses, unverified claims, etc.]`
- `[e.g. Token efficiency, rigorous validation, proactive status updates within bounds]`

This is enough for a useful v1 while preserving the original template content.
