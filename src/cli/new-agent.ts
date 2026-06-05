import { parseArgs } from '../core/args.js';
import { createAgent, loadConfig } from '../core/agents.js';

const root = process.cwd();
const skillsRepoRoot = process.env.RALLEH_SKILLS_REPO || `${process.env.HOME}/.openclaw/workspace/ralleh-skills`;
const cliArgs = parseArgs(process.argv);
const config = loadConfig(root, cliArgs);
const record = createAgent(root, skillsRepoRoot, config);
console.log(`Created ${record.kind} agent: ${record.id}`);
console.log(`Path: ${record.path}`);
if (record.role) console.log(`Role: ${record.role}`);
if (record.skills?.length) console.log(`Skills: ${record.skills.join(', ')}`);
