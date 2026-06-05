export type AgentKind = 'generated' | 'custom';

export interface TemplateRecord {
  id: string;
  name: string;
  version: string;
  description: string;
  path: string;
  baselineFiles?: string[];
  requiredPlaceholders?: string[];
  tags?: string[];
}

export interface AgentRecord {
  id: string;
  name: string;
  kind: AgentKind;
  sourceTemplate: string | null;
  templateVersion?: string | null;
  version: string;
  status: string;
  owner: string;
  purpose: string;
  tags: string[];
  path: string;
  role?: string | null;
  skills?: string[];
  skillSources?: string[];
}

export interface SkillRef {
  name: string;
  path: string;
}

export interface RoleRecord {
  id: string;
  name: string;
  description: string;
  defaultTemplate: string;
  defaultSkills: string[];
  optionalSkills?: string[];
  tags?: string[];
}

export interface AgentConfig {
  template?: string;
  id: string;
  name: string;
  kind?: AgentKind;
  emoji?: string;
  clientName?: string;
  timezone?: string;
  roleDescription?: string;
  projectsSummary?: string[] | string;
  securityContext?: string;
  communicationStyle?: string;
  decisionAuthority?: string;
  regulatedTopics?: string;
  dislikes?: string;
  goodLooksLike?: string;
  priorities?: string;
  workingStyle?: string;
  purpose?: string;
  owner?: string;
  version?: string;
  status?: string;
  tags?: string[] | string;
  role?: string;
  extraSkills?: string[];
  selectedOptionalSkills?: string[];
}
