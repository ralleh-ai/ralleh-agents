import fs from 'node:fs';
import path from 'node:path';
import type { SkillRef } from '../types/index.js';

function parseSkillMap(content: string): SkillRef[] {
  const matches = [...content.matchAll(/\[`([^`]+)`\]\(([^)]+README\.md)\)/g)];
  return matches.map((m) => ({ name: m[1], path: m[2] }));
}

export function loadSkillCatalog(skillsRepoRoot: string): SkillRef[] {
  const readmes: string[] = [];
  const skillsRoot = path.join(skillsRepoRoot, 'skills');
  for (const family of fs.readdirSync(skillsRoot)) {
    const familyPath = path.join(skillsRoot, family);
    if (!fs.statSync(familyPath).isDirectory()) continue;
    for (const skillName of fs.readdirSync(familyPath)) {
      const readmePath = path.join(familyPath, skillName, 'README.md');
      if (fs.existsSync(readmePath)) {
        readmes.push(readmePath);
      }
    }
  }
  return readmes
    .map((readmePath) => ({ name: path.basename(path.dirname(readmePath)), path: path.relative(process.cwd(), readmePath) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function resolveSkillsByName(skillsRepoRoot: string, names: string[]): SkillRef[] {
  const catalog = loadSkillCatalog(skillsRepoRoot);
  const byName = new Map(catalog.map((skill) => [skill.name, skill]));
  return names.map((name) => {
    const skill = byName.get(name);
    if (!skill) throw new Error(`Skill not found in ralleh-skills catalog: ${name}`);
    return skill;
  });
}

export function legacyRoleSkillsPath(skillsRepoRoot: string, roleId: string): string {
  return path.join(skillsRepoRoot, 'agents', roleId, 'SKILLS.md');
}

export function legacyRoleSkillsExists(skillsRepoRoot: string, roleId: string): boolean {
  return fs.existsSync(legacyRoleSkillsPath(skillsRepoRoot, roleId));
}

export function parseLegacyRoleSkills(skillsRepoRoot: string, roleId: string): SkillRef[] {
  const filePath = legacyRoleSkillsPath(skillsRepoRoot, roleId);
  if (!fs.existsSync(filePath)) return [];
  return parseSkillMap(fs.readFileSync(filePath, 'utf8'));
}
