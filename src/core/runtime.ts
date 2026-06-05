import fs from 'node:fs';
import path from 'node:path';
import { readJson } from './fs.js';
import type { RuntimeProfile } from '../types/index.js';

export function loadRuntimeProfile(root: string, profileId: string): RuntimeProfile {
  const p = path.join(root, 'profiles', 'runtime', `${profileId}.json`);
  if (!fs.existsSync(p)) throw new Error(`Runtime profile not found: ${profileId}`);
  return readJson<RuntimeProfile>(p);
}
