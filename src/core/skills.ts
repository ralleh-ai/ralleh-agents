import fs from 'node:fs';
import path from 'node:path';
import type { RoleSkillSet, SkillRef } from '../types/index.js';

function parseMarkdownSkillLinks(content: string): SkillRef[] {
  const matches = [...content.matchAll(/\[`([^`]+)`\]\(([^)]+README\.md)\)/g)];
  return matches.map((m) => ({ name: m[1], path: m[2] }));
}

export function loadRoleSkills(skillsRepoRoot: string, roleId: string): RoleSkillSet {
  const roleSkillsPath = path.join(skillsRepoRoot, 'agents', roleId, 'SKILLS.md');
  if (!fs.existsSync(roleSkillsPath)) {
    throw new Error(`Role skills file not found: ${roleSkillsPath}`);
  }
  const content = fs.readFileSync(roleSkillsPath, 'utf8');
  const skills = parseMarkdownSkillLinks(content);
  return {
    roleId,
    sourcePath: path.relative(process.cwd(), roleSkillsPath),
    skills
  };
}

export function roleExists(skillsRepoRoot: string, roleId: string): boolean {
  return fs.existsSync(path.join(skillsRepoRoot, 'agents', roleId, 'SKILLS.md'));
}
