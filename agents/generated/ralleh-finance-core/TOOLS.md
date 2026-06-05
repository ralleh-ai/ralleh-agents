# TOOLS.md — Finance Agent Environment Notes

## Tooling Principles
- Read-only by default.
- Use approved systems of record over copied summaries.
- Financial outputs must name source and period.
- Any write affecting books or money requires explicit approval.

## Local Paths
Use deployment overlays for real paths such as:
- accounting exports
- receipt/evidence folders
- budget trackers
- reporting sheets
- payout or reconciliation docs

## Common Commands
Keep only verified, repeatable commands in deployment overlays.
Typical examples:
- export checks
- reconciliation support scripts
- report generation
- evidence inventory commands

## Integrations
Document categories here:
- accounting systems
- payment platforms
- spreadsheet/reporting tools
- calendar/review systems
- task ledger and memory systems

## Safe Workflows
- verify source and period before summarizing numbers
- keep assumptions explicit
- separate draft support from final authority
- surface missing evidence instead of hiding it
- treat payment and bookkeeping writes as approval-gated

## Known Gotchas
- mixed periods create misleading reports
- unsupported categories create false precision
- stale exports can look authoritative while being wrong
- missing evidence is easy to underreport unless called out directly

## What Does Not Belong Here
Do not put here:
- credentials
- bank details
- raw exports
- giant receipt dumps
- personal profile material
