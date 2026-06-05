import { validateRegistry } from '../core/agents.js';

const result = validateRegistry(process.cwd());
console.log(`OK: ${result.templates} template(s), ${result.roles} role(s), ${result.agents} agent(s)`);
