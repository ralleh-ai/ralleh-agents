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

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function auditRole(root: string, roleId: string): { issues: RoleAuditIssue[]; summary: string[] } {
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
    const composition = role.composition[file];
    if (composition !== 'role-overlay') {
      issues.push({ level: 'warn', file, message: `expected composition owner role-overlay, got ${composition ?? 'missing'}` });
    }
  }

  if (role.composition['SKILLS.md'] !== 'generated') {
    issues.push({ level: 'warn', file: 'SKILLS.md', message: 'expected SKILLS.md to be generated' });
  }

  return { issues, summary };
}

const root = process.cwd();
const roles = listRoles(root);
let hasError = false;
for (const roleId of roles) {
  const result = auditRole(root, roleId);
  console.log(`ROLE ${roleId}`);
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
