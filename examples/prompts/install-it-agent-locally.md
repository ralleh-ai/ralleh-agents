# Prompt: Install the Ralleh IT Agent Locally

You are an OpenClaw-capable agent or operator. Your task is to install the Ralleh IT agent on a local system from the `ralleh-agents` repository.

## Your objective

Create a locally generated IT agent package that preserves:
- the baseline template
- the IT role overlay
- the approved IT skill set from `ralleh-skills`
- the generated runtime profile
- the generated deployment profile
- the generated OpenClaw manifest and config stub

## Steps

1. Clone or locate `ralleh-agents` and `ralleh-skills` locally.
2. Build the TypeScript tooling in `ralleh-agents`.
3. List available roles and confirm `it` exists.
4. Scaffold a config for an IT agent.
5. Edit the config with local organization and project context.
6. Generate the agent.
7. Validate registry and role quality.
8. Inspect the generated files:
   - `agent.json`
   - `skills.json`
   - `runtime.json`
   - `deployment.json`
   - `openclaw.agent.json`
   - `openclaw.config.stub.json`
9. Explain any remaining local deployment-specific values that must still be filled in.

## Constraints

- Do not invent local model aliases or tool permissions if they are unknown.
- Do not skip validation.
- Do not treat the generated config stub as a final production config without local review.
- Preserve least-privilege and approval-first handling for risky actions.

## Success condition

You are done when the local IT agent package exists, validation passes, and you can explain how the generated OpenClaw-facing artifacts should be used in the local environment.
