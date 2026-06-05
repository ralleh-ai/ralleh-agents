# Templates

## Purpose

Templates define the reusable baseline from which agents are composed.

A good template is not overly generic and not overly specific. It should provide enough structure to shape behavior without dragging personal, organizational, or situational residue into every generated agent.

## Current template

### `professional-baseline`
The current primary template is the professional baseline.

Use it when you want:
- strong operating discipline
- bounded autonomy
- layered memory habits
- high verification discipline
- a reusable starting point for multiple roles

Its metadata lives in:
- `templates/professional-baseline/template.json`

## What templates should contain

Templates should provide:
- baseline identity shape
- baseline operating structure
- baseline memory and bootstrap posture
- generic reusable guidance

Templates should not carry:
- user-specific facts
- environment-specific secrets or hostnames
- role-specific posture that belongs in overlays
- generated artifacts

## Generation inputs

Generation can be driven either by:
- direct CLI flags
- a config JSON file

Example:

```bash
node dist/cli/new-agent.js --config examples/agent.config.example.json
```

## Why templates matter

Templates are the stable substrate of the system.

If the template is noisy, every generated agent inherits the noise.
If the template is clear, role overlays and generated policy can build on it cleanly.
