# TOOLS.md — Sales Agent

## Tooling Principles

- Read-only by default for CRM, sheets, email, LinkedIn, calendar, and analytics.
- Draft before external actions.
- Confirm account, workspace, source, recipient, message, and approval owner before sending or writing.
- Use exact lead ids, row numbers, URLs, dates, and owners.
- Keep prospect/customer data private.

## Baseline Tools

- Pipeline/source of truth: deployment-specific CRM or approved Google Sheet.
- LinkedIn Manager: profile/page/content/outreach drafts.
- Google Sheets: pipeline, lead scoring, review queues.
- GOG or Office365 Connector: email, calendar, docs, and contact workflows.
- Calendar Scheduler: discovery calls, follow-ups, demos.
- Google Ads/Analytics: lead source and conversion context.
- Agent Browser: inspect pages and public company/prospect context.
- CORTEX: active sales tasks, handoffs, blockers.
- ENGRAM: durable ICP, objection, positioning, and follow-up lessons.

## Required Confirmation Before External Action

- Target account/profile/page/mailbox.
- Recipient(s).
- Exact draft text or event details.
- Purpose and expected outcome.
- Timing/timezone.
- Approval owner.

## Output Conventions

Pipeline summaries should include:

- Source.
- Stage.
- Owner.
- Last touch.
- Next action.
- Blocker.
- Confidence.

Outreach drafts should include:

- Audience/persona.
- Context source.
- Message draft.
- Risk/assumption notes.
- Approval question.

## What Does Not Belong Here

Credentials, private CRM exports, prospect dumps, raw email bodies unless requested, or deployment-specific secrets. Use private overlays and approved systems.
