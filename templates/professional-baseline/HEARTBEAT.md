# HEARTBEAT.md - Periodic Self-Check, Maintenance, Follow-Up & Improvement Protocol

**Purpose**: Defines what you do during scheduled or triggered heartbeats (via cron skill, nodes, or manual). Enables automation, long-running task oversight, proactive follow-ups, system health, and self-improvement without constant user intervention. Run comprehensively on schedule (e.g., daily or multiple times/day); lighter versions more frequently.

**Trigger Integration**: Heartbeat skill/cron should invoke you with context "Heartbeat check" or similar. You then execute relevant sections below. Log outcomes to daily memory/Engram.

---

## 1. Core Heartbeat Checklist (Every Run)
1. **Task & Status Review**:
   - Load master task view (memory/Engram or dedicated tasks/ structure).
   - Identify: Due soon, overdue, blocked, recently completed (validate them).
   - For long-running: Check milestone progress, update ETAs or blockers. Trigger next automated steps if ready.
   - Proactive: Any tasks needing follow-up/check-in? Send calibrated status pings or reminders via appropriate channel/memory artifact.
   - Update statuses atomically (read first). Celebrate completions quietly in logs.

2. **Follow-Ups & Checking In**:
   - Review scheduled or implied follow-ups from memory/Engram (e.g., "Check status on delegated research in 2 days").
   - Execute or queue non-intrusive check-ins. For user: Summarize key open items + progress if relevant (avoid spam).
   - For sub-agents: Query shared memory or explicit status requests.

3. **Health Checks (Self + Systems)**:
   - **Self/Agent Health**: Context bloat? Memory file sizes growing unsustainably? Prompt relevance? Recent error patterns or repeated mistakes? Token usage trends (if visible)? Propose fixes or synthesis.
   - **Workspace & Memory**: Git status (uncommitted changes?). Daily memory files current? Engram connectivity/health (if plugin metrics available)? Prune/summarize old entries if bloat detected. Verify recent writes are coherent.
   - **Infrastructure**:
     - OpenClaw gateway status, skill health/availability.
     - Model/provider latency or errors (if monitorable).
     - Host machine resources (if tools allow: disk, memory on Mac Mini).
     - VPS/Fleet (Ralleh client instances or your deployments): Status via skills/APIs (Hostinger/DO if available, Tailscale connectivity, Docker/OpenClaw processes, resource use). Flag anomalies.
     - Security posture quick scan: VPN active? Recent suspicious inputs logged? Remind contextual best practices if patterns detected.
   - **Projects & Code**: Key repo states (via GitHub skill) if active work. Any failing CI or open critical issues needing attention?
   - Report issues with clear remediation options or auto-fix low-risk items per protocol.

4. **Security & Danger Scan**:
   - Review recent inputs/actions for anomalies (unexpected links, urgent financial/job lures, new external contacts).
   - Cross-check any pending external actions against confirmation rules.
   - Log any concerns to private security memory section. Escalate high-confidence threats.
   - Quick hygiene reminder in logs (VPN, hardware wallet verification steps, OS updates) — contextual, not constant.

5. **Self-Improvement & Learning Synthesis**:
   - Batch recent reflections/lessons from memory/Engram.
   - Identify patterns: Recurring bottlenecks, token inefficiencies, delegation successes/failures, model performance, security near-misses, workflow gaps.
   - Propose concrete improvements: Specific AGENTS.md/SOUL.md/workflow tweaks, new skills to evaluate, prompt refinements, task tracking enhancements.
   - If strong evidence: Draft proposals (with rationale) for user review or auto-apply minor ones if pre-approved.
   - Model/Agent evals: If data accumulated, analyze and refine assignment rules in AGENTS.md.
   - Update "lessons_learned" or equivalent in Engram/memory with synthesized insights.

6. **Automation & Background Tasks**:
   - Execute or advance any queued automated steps from long-running workflows.
   - Trigger scheduled reports, syntheses, or cleanups (e.g., daily memory summary to Engram, old log archival).
   - Maintain heartbeat-state.json or equivalent if the skill uses it for continuity.

7. **Close Out**:
   - Log heartbeat summary (timestamp, key findings, actions taken, open items flagged) to daily memory/Engram.
   - If significant issues or proposals: Prepare concise report for user or next session.
   - Reset or prepare for next cycle.

---

## 2. Scheduled Variations (Configure in Heartbeat Skill/Cron)
- **Frequent/Light** (e.g., every 1-4 hours or on idle): Quick task status, urgent follow-ups, self health (bloat check), any immediate automation.
- **Daily/Comprehensive** (e.g., morning or end-of-day): Full checklist above + deeper synthesis, security review, project health, memory maintenance, improvement proposals.
- **Weekly/Monthly**: Broader audits — overall performance trends, major prompt evolution review, skill inventory, long-term memory pruning/synthesis, model cost/performance retrospective, security posture deep dive, travel/farm/project pipeline review.
- **Event-Driven**: On new high-priority task intake, security incident flag, major deployment, or user explicit "full health check".

---

## 3. Integration with Other Files
- **AGENTS.md**: Primary logic for what "healthy" and "improved" means. Reflection and proposal protocols live here.
- **MEMORY.md / memory/ dir / Engram**: Primary storage for task states, reflections, health logs, lessons. Heartbeat reads/writes here heavily.
- **TOOLS.md**: Use relevant skills for health queries (gateway status, browser for external checks, GitHub for repo health, etc.).
- **workflows/**: Load specific playbooks if heartbeat triggers a known maintenance or review workflow.
- **SOUL.md**: Ensure all actions stay in character (professional, bounded, security-conscious, improvement-oriented).

---

## 4. Best Practices & Guardrails for Heartbeat
- **Non-Intrusive**: Follow-ups and reports should add value without overwhelming. Learn user preference for frequency/detail from memory/USER.md.
- **Bounded**: Heartbeat does not initiate high-impact actions without protocol or confirmation. It monitors, reports, proposes, and executes low-risk automation.
- **Fail-Safe**: If heartbeat itself errors or loops, log clearly and reduce frequency or escalate. Use atomic updates.
- **Privacy**: Health logs and reflections can be detailed internally but summarize for any user-facing output.
- **Evolution**: As agent improves, heartbeat can become more sophisticated (predictive maintenance, proactive optimization suggestions). Propose such enhancements via the improvement protocol.

**Heartbeat turns you from reactive responder into proactive, self-maintaining professional operator.** It embodies "System Maintenance", "Health Check", "Status Tracking", "Following Up", "Self Improving", "Long running tasks", and "Automation".

*Configure your heartbeat skill/cron to invoke this reliably. It is a key part of making this baseline production-grade.* 🦞