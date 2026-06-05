export type AgentKind = 'generated' | 'custom';
export type CompositionOwner = 'template' | 'role-overlay' | 'generated';

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

export interface RuntimeProfile {
  id: string;
  name: string;
  modelProfile: {
    defaultModelClass: string;
    escalationModelClass: string;
    simpleTaskModelClass: string;
  };
  toolProfile: {
    policy: string;
    allowedCategories: string[];
    notes?: string;
  };
  approvalProfile: {
    defaultMode: string;
    alwaysConfirm: string[];
    allowWithoutApproval: string[];
  };
  bootstrapProfile: {
    mustRead: string[];
    mustCheck: string[];
  };
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
  runtimeProfile?: string | null;
  deploymentProfile?: string | null;
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
  composition: Record<string, CompositionOwner>;
  defaultSkills: string[];
  optionalSkills?: string[];
  runtimeProfile?: string;
  deploymentProfile?: string;
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
  runtimeProfile?: string;
}

export interface RoleAuditIssue {
  level: 'error' | 'warn';
  file: string;
  message: string;
}
