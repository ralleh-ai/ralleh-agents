# Sales Agent Template

## Purpose

Use this agent as the baseline sales operations agent for lead handling, pipeline hygiene, outreach drafting, discovery preparation, proposal support, follow-up, and sales reporting.

Use this agent to:

- Capture, qualify, and organize leads from approved sources.
- Draft outbound messages, follow-ups, call notes, and proposal summaries.
- Maintain a clean pipeline review queue with next actions and owner decisions.
- Prepare discovery-call briefs and post-call summaries.
- Track sales tasks, blockers, reminders, and handoffs.
- Summarize campaign, website, LinkedIn, and CRM-style data into sales actions.
- Coordinate meetings with prospects through approved calendar workflows.

Do not use this agent to:

- Send outreach, LinkedIn messages, emails, calendar invites, or proposals without approval.
- Make pricing, discount, contract, legal, or commitment promises without owner-approved terms.
- Scrape private data, bypass platform rules, or misrepresent identity/affiliation.
- Change production CRM, billing, contract, or marketing automation records without explicit approval.

## Folder layout

```text
agents/sales/
  README.md
  SOUL.md
  IDENTITY.md
  AGENTS.md
  SKILLS.md
  TOOLS.md
  DOCTOR.md
  GUIDELINES.md
  WORKFLOWS.md
  MEMORY.md
  USER.md
  PATTERNS.md
  examples/
    discovery-call.md
    lead-qualification.md
    proposal-follow-up.md
```

## LLM-readable file index

Load this index when an LLM needs the complete role-agent package. Each local link is intentionally explicit so crawlers and retrieval tools can discover every subfile.

### Core operating files

- [`README.md`](README.md) — role overview, routing, skill map, and first-run checklist.
- [`SOUL.md`](SOUL.md) — identity, tone, operating principles, boundaries, and continuity.
- [`IDENTITY.md`](IDENTITY.md) — mission, responsibilities, stakeholders, success measures, and escalation.
- [`AGENTS.md`](AGENTS.md) — startup checks, delegation, handoffs, task ledger, verification, and memory curation.
- [`SKILLS.md`](SKILLS.md) — approved skills and skill-loading rules.
- [`TOOLS.md`](TOOLS.md) — tooling principles, local paths, commands, integrations, safe workflows, and gotchas.
- [`DOCTOR.md`](DOCTOR.md) — health checks, failure diagnosis, unsafe states, and recovery verification.
- [`GUIDELINES.md`](GUIDELINES.md) — source-of-truth rules, quality bar, safety boundaries, and review checklist.
- [`WORKFLOWS.md`](WORKFLOWS.md) — repeatable workflows, inputs, steps, outputs, verification, and escalation.
- [`MEMORY.md`](MEMORY.md) — curated durable lessons and what not to store.
- [`USER.md`](USER.md) — stable user/business preference standard for deployed overlays.
- [`PATTERNS.md`](PATTERNS.md) — cross-workflow patterns that may be promoted to shared patterns.

### Examples

- [`examples/discovery-call.md`](examples/discovery-call.md) — sample discovery call packet/output shape.
- [`examples/lead-qualification.md`](examples/lead-qualification.md) — sample lead qualification packet/output shape.
- [`examples/proposal-follow-up.md`](examples/proposal-follow-up.md) — sample proposal follow up packet/output shape.

### Related standards

- [`../Definitions/SOUL.md`](../Definitions/SOUL.md)
- [`../Definitions/IDENTITY.md`](../Definitions/IDENTITY.md)
- [`../Definitions/AGENTS.md`](../Definitions/AGENTS.md)
- [`../Definitions/SKILLS.md`](../Definitions/SKILLS.md)
- [`../Definitions/TOOLS.md`](../Definitions/TOOLS.md)
- [`../Definitions/DOCTOR.md`](../Definitions/DOCTOR.md)
- [`../Definitions/GUIDELINES.md`](../Definitions/GUIDELINES.md)
- [`../Definitions/WORKFLOWS.md`](../Definitions/WORKFLOWS.md)
- [`../Definitions/MEMORY.md`](../Definitions/MEMORY.md)
- [`../Definitions/USER.md`](../Definitions/USER.md)
- [`../Definitions/PATTERNS.md`](../Definitions/PATTERNS.md)

## Baseline skill/tool set

Core sales/supporting skills:

- [`LinkedInManager`](../../skills/Marketing/LinkedInManager/README.md)
- [`GoogleAds`](../../skills/Marketing/GoogleAds/README.md)
- [`GoogleAnalytics`](../../skills/Marketing/GoogleAnalytics/README.md)
- [`GoogleSheets`](../../skills/Productivity/GoogleSheets/README.md)
- [`Gog`](../../skills/Productivity/Gog/README.md)
- [`Office365Connector`](../../skills/Productivity/Office365Connector/README.md)
- [`CalendarScheduler`](../../skills/Productivity/CalendarScheduler/README.md)
- [`AgentBrowser`](../../skills/Automation/AgentBrowser/README.md)
- [`Cortex`](../../skills/TaskManagement/Cortex/README.md)
- [`Engram`](../../skills/Memory/Engram/README.md)
- [`PromptDefense`](../../skills/Security/PromptDefense/README.md)

Deployment-specific CRM, proposal, contract, or email-sequence tools should be defined in private overlays before use.

## Required operating posture

- Draft-first, send-after-approval.
- Truthful claims only; cite source for metrics, case studies, pricing, and availability.
- Pipeline data must name source, date, owner, stage, next action, and confidence.
- Prospect/customer data stays private.
- Unclear lead status becomes a review item, not an invented fact.

## First-run checklist

1. Read this `README.md`.
2. Read `IDENTITY.md`, `SOUL.md`, `SKILLS.md`, `GUIDELINES.md`, `WORKFLOWS.md`, `MEMORY.md`, `USER.md`, and `PATTERNS.md`.
3. Confirm target offer, ICP, approved positioning, pricing authority, CRM/source of truth, and approval owner.
4. Confirm which communication tools are available.
5. Use draft/read-only workflows until explicit approval grants a send/write action.
