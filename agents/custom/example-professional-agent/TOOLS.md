# TOOLS.md - Ralleh Core Capability Map, Usage Notes & Environment Specifics

**Purpose**: Detailed guidance on available tools/skills, when/how to use them optimally (including token efficiency, reliability, security), environment-specific configurations, gotchas, and examples. This complements per-skill `SKILL.md` files. Update as skills are added or env changes. Read relevant sections during task planning.

**Core Principle**: "Right tool for the job" — match capabilities, cost (tokens/time/money), reliability, security/isolation, and your existing notes. Prefer well-understood, validated paths. Document new learnings here or in `skills_notes/`.

---

## 1. Foundational OpenClaw Capabilities & Skills
These are core to the platform. Master their SKILL.md and cross-ref here.

### Browser Automation & Research
- **Use When**: Web research, verification, data extraction, form interactions, monitoring pages, competitor analysis, travel research (Thailand/Vietnam), vendor checks (peptide sources, suppliers), permit research (CO ag/cannabis/ice cream), security verification (scam sites, malware reports).
- **Best Practices**:
  - Start with targeted navigation + snapshot or targeted queries. Avoid full-page dumps.
  - For research: Use summarization mode or post-process with strong model. Always capture sources/URLs for validation.
  - Token Efficiency: Screenshot + OCR/vision summary or structured extraction (JSON) rather than raw HTML. Summarize findings before long context.
  - Security: Verify domains, avoid logging into sensitive accounts unless isolated profile. For scam detection: Cross-check multiple sources.
  - Advanced: Use evaluate/query for DOM inspection, click/type for interactions (with snapshot refs). Wait for dynamic content.
- **Notes**: Maintain logged-in profiles carefully (or use fresh for research). Combine with search skills for best results. Log useful sites or patterns in memory/Engram.

### GitHub Integration
- **Use When**: Code review, issue/PR management (your repos: Focusor.ai, Pledgebook, OpenClaw custom, Engram, Ralleh-related, client work), repo state inspection, automation (labels, milestones, CI checks), deployment tracking.
- **Best Practices**:
  - Auth: Use your configured credentials/tokens securely. Scope minimally.
  - Workflow: For changes — branch → edit (via tools or local) → PR → review (self or delegate) → merge with checks.
  - Validation: Always pair with local execution/lint/test where possible before PR.
  - Token/Orchestration: Summarize PR diffs or issue threads. Use for status tracking in long projects.
- **Env Specific**: Your key repos and orgs. Note any CI/CD (Azure DevOps? GitHub Actions), branch protections. For client work: Respect repo isolation.
- **skills_notes/github.md**: Add auth setup, common commands, gotchas (e.g., large repos, rate limits).

### Canvas (Visual Workspace)
- **Use When**: Complex planning, architecture diagrams, workflow visualization, task boards, UI mockups (for FocusPanel/Jarvis concepts), status dashboards, mind maps for analysis.
- **Best Practices**: Use for high-signal visual output. Export or reference in reports. Combine with structured text plans. Great for orchestration overviews or presenting to user/sub-agents.
- **Token Note**: Visuals reduce need for long textual descriptions.

### Communication Channels (imsg, discord, wacli/WhatsApp, slack, etc.)
- **Use When**: User interaction, team coordination (Shane/Rick bots?), client comms (Ralleh.com), notifications, follow-ups.
- **Best Practices**: 
  - Respect channel type (DM vs group). Never leak private data in groups.
  - For automation: Structured, non-spammy updates. Use for status/check-ins on delegated tasks.
  - Voice/Speech (sag/ElevenLabs or system): For transcription input or spoken summaries if preferred.
- **Security**: Verify recipients. For sensitive: Prefer encrypted/verified channels.

### Vision & Capture (Peekaboo, camsnap)
- **Use When**: Screenshot analysis (UI bugs, diagrams, physical farm/equipment if relevant), security cam monitoring, document scanning, visual verification.
- **Best Practices**: Targeted captures + AI vision description or structured extraction. Privacy-respecting (don't over-capture personal spaces without need).

### Other Core/Utility Skills
- **Cron/Heartbeat/Nodes**: Scheduling, long-running task monitoring, background automation, periodic health checks, follow-up triggers. Essential for "long running tasks", "automation", "status tracking", "health check".
- **File/System Ops** (via terminal or dedicated skills): Careful use. Validate paths. Git for workspace. Avoid destructive without confirmation/protocol.
- **Speech-to-Text (Whisper or equiv)**: Transcription of voice notes, meetings, voicemails. High accuracy; post-process for summaries/action items.
- **Translation Skills/Models**: For multi-language (travel planning, research). Context-preserving.
- **Search/Research Skills** (web or local): Supplement browser. Structured results preferred.
- **Code Execution / Terminal / LSP-like**: For running tests, lints, scripts, REPL exploration. Sandbox where possible. Critical for validation in dev workflows (Focusor .NET, Nuxt, Go Engram, etc.).
- **PDF/Doc Handling** (ecosystem skills): For contracts, research papers, permits, and tax documents. Extract, summarize, and validate.

---

## 2. Environment Specifics & Configuration Notes
**Primary Dev Machine**: Mac Mini (fresh macOS, primary for OpenClaw gateway/dev). Paths: ~/projects/ or equivalent for Focusor.ai, Pledgebook, etc. External monitor setup for MacBook.

**Security Posture** (Critical Context):
- PIA VPN: Prefer always-on or enforced for sensitive ops.
- Sensitive asset operations: Agent never handles seeds, keys, or equivalent secret material directly.
- Recent incident awareness: Maintain heightened scrutiny for social engineering, suspicious links, financial lures, fake sites, and malware vectors. Verify unexpected contacts/actions, log suspicious patterns privately, and reinforce secure-environment hygiene when relevant.
- macOS Reinstall Hygiene: Fresh installs reduce persistence risks. Agent can remind of update/scan practices contextually.
- No overstep: Agent does not initiate crypto transactions or handle sensitive creds.

**Cloud & Deployments**:
- Azure: Focusor.ai hosting/config.
- Hostinger / DigitalOcean VPS: Client OpenClaw instances, Ralleh fleet. Tailscale for secure networking between instances/admin.
- Monitoring: Skills or custom for VPS status, Docker/OpenClaw gateway health, resource use, logs. For Ralleh.com: Provisioning workflows, admin oversight of sub-bots.
- Self-hosted emphasis: Prioritize local-first where possible (Engram local vector/graph).

**Projects & Codebases** (Deep Context):
- Focusor.ai: C# .NET MVC on Azure — web app dev, auth (ASP.NET Identity + affiliate tracking), accessibility.
- Pledgebook: Nuxt (Vue) blockchain app.
- Affilio: Affiliate content engineering pipelines.
- FocusPanel: AI ensembles/collective intelligence on OpenClaw — Three.js futuristic UIs, voice, HUD elements, Jarvis-like.
- Engram (isbe-bot/engram or Remnic fork): Memory core for OpenClaw — integrate deeply for semantic recall, entity management, lessons, multi-agent sharing. Configure plugin, use in session init and reflections.
- OpenClaw Custom: Agent orchestration, multi-VPS, custom skills/UIs, SOUL/AGENTS optimization (this baseline itself).

**Personal/Farm/Other**:
- Farm ops: Research support for legal grows, permits, suppliers (ice cream mix, resin kits), business setup (resmory.com?).
- Travel: Thailand (4mo scenic/culinary), Vietnam (1mo beach/luxury). Planning, bookings research, remote work continuity, cultural/culinary notes.
- Health/research topics: Treat supplement, peptide, or other health-related topics as research synthesis only with explicit professional-boundary language and source verification.
- Education administration: Support education-finance tracking, tax-document reminders, and loan/planning implications when relevant to the deployment.

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
14. For Ralleh.com/VPS: Any cloud provider CLI/API skills (DigitalOcean, Hostinger if exist; or general HTTP/SSH), Tailscale management, Docker/OpenClaw status.
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
- Custom Skills: For gaps in orchestration, advanced planning, specific business logic (e.g., Ralleh provisioning), or farm/travel/peptide research pipelines. Document thoroughly.

**This TOOLS.md turns raw capabilities into reliable, efficient, context-aware power.** Master it alongside SKILL.md files. It evolves with your stack.

*Cross-ref: AGENTS.md for selection/decision framework and "right tool" logic. skills_notes/ for depth. workflows/ for combined playbooks.*