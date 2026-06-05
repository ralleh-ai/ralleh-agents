import fs from 'node:fs';
import path from 'node:path';
import { readJson } from './fs.js';

export function loadDeploymentProfile(root: string, profileId: string): Record<string, unknown> {
  const p = path.join(root, 'profiles', 'deployment', `${profileId}.json`);
  if (!fs.existsSync(p)) throw new Error(`Deployment profile not found: ${profileId}`);
  return readJson<Record<string, unknown>>(p);
}
