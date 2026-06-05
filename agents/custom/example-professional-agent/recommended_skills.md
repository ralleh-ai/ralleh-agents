# Recommended Skills for Ralleh Core Professional Baseline

Install via OpenClaw Skills tab, CLI (`openclaw skills install <name>`), or ClawHub registry. After install, document details in `skills_notes/<name>.md` and update TOOLS.md.

**Priority Tier 1 (Core for Baseline Capabilities)**:
- **browser**: Web automation, research, verification, data extraction. Essential for analysis, planning, danger detection (scam verification), travel/vendor research.
- **github**: Full repo, issue, PR, CI management. Critical for dev workflows (Focusor, Pledgebook, OpenClaw, Engram), code review, status tracking, orchestration artifacts.
- **canvas**: Visual planning, diagrams, task boards, status dashboards, UI concepts (FocusPanel/Jarvis). Great for orchestration overviews and reducing token-heavy text.
- **heartbeat / cron / nodes**: Automation, long-running task monitoring, periodic health/maintenance, follow-ups, self-improvement triggers, background steps. **Foundational for many listed capabilities.**
- **engram / remnic / @remnic/plugin-openclaw** (or your isbe-bot/engram): **Highest priority memory upgrade**. Semantic vector search, knowledge graph, temporal/entity memory, multi-agent sharing, lessons store. Enables true "remembering", self-learning from mistakes, advanced context retrieval. Update AGENTS.md session init and reflections to use it.
- **imsg / discord / wacli (WhatsApp) / slack**: Channel integrations for user/team/client communication, status updates, delegation handoffs, follow-ups. Configure allowlists/security.

**Priority Tier 2 (High Value for Professional Use)**:
- **peekaboo / camsnap / vision tools**: Screenshots, vision analysis, document capture, security monitoring. Supports validation, UI work, physical context if needed (farm?).
- **whisper or transcription skill**: Accurate speech-to-text for voice notes, meetings, dictation. Post-process into structured notes/action items/summaries.
- **search / web-research skill** (or Perplexity-like): Efficient structured research to supplement browser. Good for quick facts, vendor comparisons, permit info.
- **PDF / document handling & summarization**: Contracts, research papers, permits, tax documents, and specifications. Extract, summarize, and validate.
- **code execution / terminal / sandboxed runner / LSP helpers**: Run tests, lints, scripts, REPL for .NET, Nuxt/TS, Go, Python. Critical for validation in dev tasks and "finding right tool".
- **translation skill or strong model access**: High-quality, context-aware translation for travel (Thailand/Vietnam), research, multi-lang content.

**Priority Tier 3 (Ralleh.com / Ops / Security / Future)**:
- Cloud provider tools: DigitalOcean CLI/API, Hostinger equivalents, general SSH/HTTP for VPS fleet management, monitoring, provisioning (consistent baseline deployments for clients).
- Tailscale / networking management: For secure multi-VPS / agent fleet connectivity and admin oversight.
- Docker / container / OpenClaw status tools: Health checks on gateways, instances, resources.
- Security/audit: Linters, vuln scanners, malware/pattern detectors if available in ecosystem. Enhance danger detection.
- Advanced orchestration: Any workflow engine, sub-agent management, or consensus/voting skills (or build custom). Supports "Creating, Planning, Orchestration Workflows", "Consensus", "Agent Model Assignment".
- Future/Custom: Domain-specific (farm permits/business setup, peptide research pipeline, travel planner with booking research, high-protein meal prep generator). Build and document thoroughly.

**Installation & Documentation Workflow**:
1. Install skill.
2. Test basic functionality in controlled session.
3. Create `skills_notes/<skill>.md` with: purpose, when-to-use, token tips, env config (your Mac paths, auth for GitHub/repos, browser profiles, Engram connection, Tailscale/VPN notes), gotchas, security considerations, advanced examples (orchestration, long tasks, validation).
4. Update TOOLS.md summary section.
5. If relevant, add decision criteria to AGENTS.md "Right Tool for the Job" framework.
6. Commit to git.

**Notes for Your Stack**:
- Emphasize skills that support token efficiency (structured output, summarization), security (verification, isolation), orchestration (tracking, delegation, status), memory (Engram), and dev (GitHub, code exec, browser for testing).
- For Ralleh.com multi-VPS/client work: Skills enabling consistent provisioning, monitoring, and admin of remote OpenClaw instances.
- Security Post-Incident: Prioritize skills that aid verification, input analysis, and safe execution.
- After major installs or env changes: Re-run relevant parts of BOOTSTRAP.md or full heartbeat for health confirmation.

This set, combined with the prompt files (especially AGENTS.md + TOOLS.md), gives the agent comprehensive, professional-grade capabilities across all requested areas while staying efficient, safe, and self-improving.

*Install Engram first — it amplifies everything else.* 🦞