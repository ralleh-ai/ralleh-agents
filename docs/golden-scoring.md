# Golden Scoring

## Purpose

Golden scoring exists to give the system a shared language for quality.

Without a scoring model, people can say a role package is “good” or “clean” while meaning completely different things. This repository uses scoring to make quality more inspectable and less subjective.

## Current verdicts

Role packages are currently scored as:
- `golden`
- `usable`
- `bloated`
- `risky`
- `misplaced`

## Current scoring logic

### Golden
The package has:
- required files present
- required sections present
- files under configured size caps
- correct ownership expectations

### Usable
The package is structurally sound but still has warnings that should eventually be cleaned up.

### Bloated
One or more files exceed the configured size caps and risk becoming inefficient or confused.

### Risky
A serious quality problem weakens safe operation or clarity.

### Misplaced
Content or ownership is significantly wrong, suggesting the package is structurally confused.

## Why scoring matters

The point is not vanity.
The point is to create pressure toward coherence.

A good scoring system helps the repository prevent slow decay through:
- unnoticed bloat
- missing sections
- blurred ownership
- role drift
- claims of quality without evidence

## Limits

Scoring is useful, but it is not the whole truth.

A package can pass a structural audit and still need better judgment, better role language, or better deployment policy. The scoring model is a floor, not the final word on excellence.
