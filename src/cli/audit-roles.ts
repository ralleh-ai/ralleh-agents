import fs from 'node:fs';
import path from 'node:path';
import { listRoles, loadRole } from '../core/roles.js';
import type { RoleAuditIssue } from '../types/index.js';

const roleFilesExpected = [
  'README.md','SOUL.md','IDENTITY.md','AGENTS.md','TOOLS.md','DOCTOR.md','GUIDELINES.md','WORKFLOWS.md','MEMORY.md','USER.md','PATTERNS.md'
];

const sizeCaps: Record<string, number> = {
  'SOUL.md': 2000,
  'AGENTS.md': 3500,
  'TOOLS.md': 3500,
  'WORKFLOWS.md': 3000,
  'DOCTOR.md': 1800,
  'MEMORY.md': 3000,
  'USER.md': 1200,
  'PATTERNS.md': 3000,
  'README.md': 2500,
  'IDENTITY.md': 1800,
  'GUIDELINES.md': 2000
};

const requiredSections: Record<string, string[]> = {
  'README.md': ['## Purpose'],
  'SOUL.md': ['## Core Identity','## Role','## Operating Principles','## Boundaries','## Continuity'],
  'IDENTITY.md': ['## Mission','## Core Responsibilities','## Success Measures'],
  'AGENTS.md': ['## Startup Checks','## Delegation Rules','## Verification Protocol'],
  'TOOLS.md': ['## Tooling Principles','## Integrations','## What Does Not Belong Here'],
  'DOCTOR.md': ['## Purpose','## Fast Triage','## Common Failure Modes','## Escalation','## Doctor Report Format'],
  'GUIDELINES.md': ['## Source of Truth Rules','## Quality Bar'],
  'WORKFLOWS.md': ['## Workflow Index','## What Belongs in examples/'],
  'MEMORY.md': ['# MEMORY.md — Lessons & Patterns'],
  'USER.md': ['## Identity','## Values','## Style Preferences'],
  'PATTERNS.md': ['# PATTERNS.md — Shared Patterns']
};

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function verdictForIssues(issues: RoleAuditIssue[]): 'golden' | 'usable' | 'bloated' | 'risky' | 'misplaced' {
  const errors = issues.filter(i => i.level === 'error');
  const warns = issues.filter(i => i.level === 'warn');
  if (errors.some(i => /missing role overlay file|missing required section|composition owner/.test(i.message))) return 'misplaced';
  if (errors.some(i => /exceeds size cap/.test(i.message))) return 'bloated';
  if (errors.length) return 'risky';
  if (warns.length) return 'usable';
  return 'golden';
}

function auditRole(root: string, roleId: string): { issues: RoleAuditIssue[]; summary: string[]; verdict: string } {
  const role = loadRole(root, roleId);
  const filesDir = path.join(root, 'roles', roleId, 'files');
  const issues: RoleAuditIssue[] = [];
  const summary: string[] = [];

  for (const file of roleFilesExpected) {
    const filePath = path.join(filesDir, file);
    if (!fs.existsSync(filePath)) {
      issues.push({ level: 'error', file, message: 'missing role overlay file' });
      continue;
    }
    const text = fs.readFileSync(filePath, 'utf8');
    const words = countWords(text);
    summary.push(`${roleId}/${file}: ${words} words`);
    const cap = sizeCaps[file];
    if (cap && words > cap) {
      issues.push({ level: 'error', file, message: `exceeds size cap (${words} > ${cap})` });
    }
    for (const section of requiredSections[file] || []) {
      if (!text.includes(section)) {
        issues.push({ level: 'error', file, message: `missing required section '${section}'` });
      }
    }
    const composition = role.composition[file];
    if (composition !== 'role-overlay') {
      issues.push({ level: 'warn', file, message: `composition owner should be role-overlay, got ${composition ?? 'missing'}` });
    }
  }

  if (role.composition['SKILLS.md'] !== 'generated') {
    issues.push({ level: 'warn', file: 'SKILLS.md', message: 'composition owner should be generated' });
  }

  const verdict = verdictForIssues(issues);
  return { issues, summary, verdict };
}

const root = process.cwd();
const roles = listRoles(root);
let hasError = false;
for (const roleId of roles) {
  const result = auditRole(root, roleId);
  console.log(`ROLE ${roleId}`);
  console.log(`  Verdict: ${result.verdict}`);
  for (const line of result.summary) console.log(`  ${line}`);
  if (!result.issues.length) {
    console.log('  OK');
    continue;
  }
  for (const issue of result.issues) {
    console.log(`  ${issue.level.toUpperCase()}: ${issue.file} - ${issue.message}`);
    if (issue.level === 'error') hasError = true;
  }
}
if (hasError) process.exit(1);
