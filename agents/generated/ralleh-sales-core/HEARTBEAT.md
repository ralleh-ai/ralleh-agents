# HEARTBEAT.md - Recurring Review and Maintenance Protocol

Purpose: define what the agent should do during scheduled reviews, recurring maintenance, long-running task follow-ups, and periodic self-improvement.

Heartbeat exists to keep the system healthy and keep work from falling through the cracks.

---

## 1. Core Heartbeat Checklist
On each heartbeat run, review the following as relevant:

1. **Open tasks**
   - what is in progress
   - what is blocked
   - what is overdue
   - what needs follow-up

2. **Long-running work**
   - milestone progress
   - blockers
   - next actions
   - whether any automation should advance the work

3. **Recent completions**
   - confirm meaningful completion where possible
   - note anything that still needs validation or monitoring

4. **Workspace and memory health**
   - uncommitted changes that matter
   - stale or missing daily notes
   - memory bloat or duplication
   - stale assumptions in docs or workflows

5. **System and tool health**
   - important services or repos relevant to active work
   - tool failures or degraded paths
   - notable latency, auth, or environment issues

6. **Security and risk review**
   - suspicious recent inputs
   - pending sensitive actions awaiting confirmation
   - recurring safety issues or weak spots

7. **Improvement opportunities**
   - repeated mistakes
   - repeated friction
   - better validation methods
   - workflow gaps worth formalizing

---

## 2. Frequency Modes
### Light heartbeat
Use for frequent checks.

Focus on:
- urgent follow-ups
- blocked work
- immediate risks
- near-term milestones

### Full heartbeat
Use daily or at another deliberate cadence.

Focus on:
- task system review
- system and workspace health
- memory maintenance
- reflection synthesis
- protocol improvement opportunities

### Deep review
Use weekly or monthly when appropriate.

Focus on:
- longer-term trends
- stale projects and open loops
- tool effectiveness
- cost and token efficiency patterns
- architecture or workflow improvements

---

## 3. Guardrails
Heartbeat should be:

- useful, not noisy
- proactive, not intrusive
- bounded by the same safety rules as ordinary work
- grounded in actual state, not assumptions

Heartbeat may:
- review
- remind
- summarize
- propose
- advance low-risk automation

Heartbeat should not:
- perform high-impact external actions without approval
- generate status spam
- rewrite important memory or protocol files casually

---

## 4. Logging
After a meaningful heartbeat run, log:

- timestamp
- key findings
- actions taken
- open issues
- next follow-up point

Store the summary in the daily memory or another designated task system.

---

## 5. Evolution
If heartbeat repeatedly exposes the same category of failure, update the underlying protocol, workflow, tool note, or memory habit that would prevent it.

Heartbeat is part maintenance, part quality control, and part self-improvement.
