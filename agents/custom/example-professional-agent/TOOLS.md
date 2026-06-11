# TOOLS.md - Professional Agent Capability Map, Usage Notes & Environment Specifics

**Purpose**: Detailed guidance on available tools/skills, when/how to use them optimally (including token efficiency, reliability, security), environment-specific configurations, gotchas, and examples. This complements per-skill `SKILL.md` files. Update as skills are added or env changes. Read relevant sections during task planning.

**Core Principle**: "Right tool for the job" — match capabilities, cost (tokens/time/money), reliability, security/isolation, and your existing notes. Prefer well-understood, validated paths. Document new learnings here or in `skills_notes/`.

---

## 1. Foundational OpenClaw Capabilities & Skills
These are core to the platform. Master their SKILL.md and cross-ref here.

### Browser Automation & Research
- **Use When**: Web research, verification, data extraction, form interactions, monitoring pages, competitor analysis, vendor checks, compliance or permit research, and security verification (scam sites, malware reports).
- **Best Practices**:
  - Start with targeted navigation + snapshot or targeted queries. Avoid full-page dumps.
  - For research: Use summarization mode or post-process with strong model. Always capture sources/URLs for validation.
  - Token Efficiency: Screenshot + OCR/vision summary or structured extraction (JSON) rather than raw HTML. Summarize findings before long context.
  - Security: Verify domains, avoid logging into sensitive accounts unless isolated profile. For scam detection: Cross-check multiple sources.
  - Advanced: Use evaluate/query for DOM inspection, click/type for interactions (with snapshot refs). Wait for dynamic content.
- **Notes**: Maintain logged-in profiles carefully (or use fresh for research). Combine with search skills for best results. Log useful sites or patterns in memory/Engram.

### GitHub Integration
- **Use When**: Code review, issue/PR management, repo state inspection, automation (labels, milestones, CI checks), and deployment tracking for the repositories this agent actually manages.
- **Best Practices**:
  - Auth: Use your configured credentials/tokens securely. Scope minimally.
  - Workflow: For changes — branch → edit (via tools or local) → PR → review (self or delegate) → merge with checks.
  - Validation: Always pair with local execution/lint/test where possible before PR.
  - Token/Orchestration: Summarize PR diffs or issue threads. Use for status tracking in long projects.
- **Env Specific**: Your key repos and orgs. Note any CI/CD (Azure DevOps? GitHub Actions), branch protections. For client work: Respect repo isolation.
- **skills_notes/github.md**: Add auth setup, common commands, gotchas (e.g., large repos, rate limits).

### Canvas (Visual Workspace)
- **Use When**: Complex planning, architecture diagrams, workflow visualization, task boards, UI mockups, status dashboards, and mind maps for analysis.
- **Best Practices**: Use for high-signal visual output. Export or reference in reports. Combine with structured text plans. Great for orchestration overviews or presenting to user/sub-agents.
- **Token Note**: Visuals reduce need for long textual descriptions.

### Communication Channels (imsg, discord, wacli/WhatsApp, slack, etc.)
- **Use When**: User interaction, team coordination, client or stakeholder communication, notifications, and follow-ups.
- **Best Practices**: 
  - Respect channel type (DM vs group). Never leak private data in groups.
  - For automation: Structured, non-spammy updates. Use for status/check-ins on delegated tasks.
  - Voice/Speech (sag/ElevenLabs or system): For transcription input or spoken summaries if preferred.
- **Security**: Verify recipients. For sensitive: Prefer encrypted/verified channels.

### Vision & Capture (Peekaboo, camsnap)
- **Use When**: Screenshot analysis (UI bugs, diagrams, physical equipment or spaces if relevant), security cam monitoring, document scanning, and visual verification.
- **Best Practices**: Targeted captures + AI vision description or structured extraction. Privacy-respecting (don't over-capture personal spaces without need).

### Other Core/Utility Skills
- **Cron/Heartbeat/Nodes**: Scheduling, long-running task monitoring, background automation, periodic health checks, follow-up triggers. Essential for "long running tasks", "automation", "status tracking", "health check".
- **File/System Ops** (via terminal or dedicated skills): Careful use. Validate paths. Git for workspace. Avoid destructive without confirmation/protocol.
- **Speech-to-Text (Whisper or equiv)**: Transcription of voice notes, meetings, voicemails. High accuracy; post-process for summaries/action items.
- **Translation Skills/Models**: For multi-language (travel planning, research). Context-preserving.
- **Search/Research Skills** (web or local): Supplement browser. Structured results preferred.
- **Code Execution / Terminal / LSP-like**: For running tests, lints, scripts, and REPL exploration. Sandbox where possible. Critical for validation in software and automation workflows across the stacks this agent supports.
- **PDF/Doc Handling** (ecosystem skills): For contracts, research papers, permits, and tax documents. Extract, summarize, and validate.

---

## 2. Environment Specifics & Configuration Notes
**Primary Environment**: Replace this section with the actual host, workstation, runtime, or deployment environments this agent uses. Include only the paths, hosts, clouds, and platform notes that materially improve execution.

**Security Posture** (Critical Context):
- PIA VPN: Prefer always-on or enforced for sensitive ops.
- Sensitive asset operations: Agent never handles seeds, keys, or equivalent secret material directly.
- Recent incident awareness: Maintain heightened scrutiny for social engineering, suspicious links, financial lures, fake sites, and malware vectors. Verify unexpected contacts/actions, log suspicious patterns privately, and reinforce secure-environment hygiene when relevant.
- macOS Reinstall Hygiene: Fresh installs reduce persistence risks. Agent can remind of update/scan practices contextually.
- No overstep: Agent does not initiate crypto transactions or handle sensitive creds.

**Cloud & Deployments**:
- Record the real hosting, cloud, VPS, container, SaaS, and networking environments for this deployment.
- Monitoring: Note how to check service status, gateway health, resource use, logs, provisioning workflows, and admin oversight for the actual systems this agent manages.
- Self-hosted emphasis: Prioritize local-first where possible when that matches the deployment architecture.

**Projects & Codebases** (Deep Context):
- Replace this list with the actual projects, products, services, or internal systems this agent supports.
- For each project, capture stack, hosting, ownership boundaries, and any verification or deployment notes the agent will repeatedly need.
- Keep this section deployment-specific. Do not leave the template author's projects here.

**Additional Domains**:
- Add personal, research, or operational domains only when they are genuinely part of the deployed agent's responsibilities.
- Health/research topics: Treat supplement, peptide, or other health-related topics as research synthesis only with explicit professional-boundary language and source verification.
- Education, travel, compliance, or other specialty topics should appear here only when relevant to the deployment.

**Models & Routing (Token/Model Awareness)**:
- Available via direct providers, OpenRouter, LiteLLM, or OpenClaw config: Strong reasoning (Claude 3.5/4 family or current top), fast/cheap for simple, coding specialists, vision, long-context.
- Assignment Rules (in AGENTS.md): Complex analysis/planning/orchestration/security → top reasoning model. Simple lookup/summarize → fast model. Code heavy → coding-optimized. Cost-sensitive or high-volume → efficient. Use ensembles for validation/consensus on critical.
- Evaluation: Log performance (quality, speed, cost, adherence) in reflections/model_evals. Refine rules over time.
- Token Discipline: Summarize tool outputs aggressively. Structured extraction (JSON/tables) over prose where possible. Context window management via smart retrieval (Engram excels here).

---

## 3. Recommended Skills to Install / Enhance (Baseline Professional)
Install via OpenClaw Skills interface or CLI. Prioritize for your use cases:
1. **browser** + any advanced automation extensions.
2. **github** — full repo/issue/PR/CI integration.
3. **canvas** — visual planning/orchestration.
4. **heartbeat/cron/nodes** enhancements for automation & long tasks.
5. **github-copilot** or code intelligence if available.
6. **Whisper** or transcription skill.
7. **Peekaboo** / vision tools.
8. **Communication suite**: imsg, discord, wacli, slack as needed for channels.
9. **Engram/Remnic plugin** (or your isbe-bot/engram) — **highest priority for memory & self-learning**. Enables semantic search, entity memory, shared multi-agent state, lessons store. Update AGENTS.md session init and reflection steps to leverage.
10. Search/research skill (web or Perplexity-like) for efficient info gathering.
11. PDF/doc extraction/summarization.
12. Any terminal/code execution with safety/sandbox (for .NET, Nuxt, Go, Python scripts, testing).
13. Security/audit related (vuln scanners, linters if not in code tools).
14. For hosted environments and VPS operations: Any cloud provider CLI/API skills, networking management, Docker/container status, gateway status, and secure remote admin tooling relevant to this deployment.
15. Future: Custom orchestration skill, consensus/voting tool, advanced workflow engine.

After install: Create/update `skills_notes/<skill-name>.md` with usage examples, token tips, env config, gotchas specific to your setup (e.g., GitHub token scopes for your repos, browser profiles for logged-in research, Engram connection string or local path).

---

## 4. Token Efficiency & Optimization Notes (Cross-Cutting)
- **General**: Be concise in final outputs. Use summaries, bullets, tables, code blocks. Executive summary first for long responses.
- **Tool Calls**: Targeted queries over broad. Process outputs (summarize/extract) before injecting full results into context.
- **Memory/Engram**: Smart retrieval over dumping everything. Relevant only.
- **Model Choice**: As above — don't default to heaviest model for everything.
- **Feedback Loop**: In every reflection, note token-related improvements (e.g., "Used structured extraction instead of full page → saved ~X tokens and improved clarity").
- **Monitoring**: If provider exposes usage, track in memory. Agent proposes optimizations.

---

## 5. Extensibility & Maintenance
- New skill installed? Immediately document in this file (high-level) + detailed `skills_notes/<name>.md`.
- Env change (new VPS, project, security tool)? Update relevant sections.
- Periodic (heartbeat or manual): Review this file for staleness. Suggest updates.
- Custom Skills: For gaps in orchestration, advanced planning, domain-specific business logic, or recurring research/operations pipelines. Document thoroughly.

**This TOOLS.md turns raw capabilities into reliable, efficient, context-aware power.** Master it alongside SKILL.md files. It evolves with your stack.

*Cross-ref: AGENTS.md for selection/decision framework and "right tool" logic. skills_notes/ for depth. workflows/ for combined playbooks.*