import fs from 'node:fs';
import path from 'node:path';
import { readJson } from './fs.js';
import type { RoleRecord } from '../types/index.js';

export function loadRole(root: string, roleId: string): RoleRecord {
  const rolePath = path.join(root, 'roles', roleId, 'role.json');
  if (!fs.existsSync(rolePath)) {
    throw new Error(`Role not found: ${roleId}`);
  }
  return readJson<RoleRecord>(rolePath);
}

export function listRoles(root: string): string[] {
  const rolesDir = path.join(root, 'roles');
  if (!fs.existsSync(rolesDir)) return [];
  return fs.readdirSync(rolesDir).filter((name) => fs.existsSync(path.join(rolesDir, name, 'role.json'))).sort();
}
