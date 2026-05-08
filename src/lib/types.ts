// ─── Core Types ───────────────────────────────────────────────────────────────

export type StepId = 'understand' | 'documents' | 'queue' | 'plan' | 'notify';

export type CardType = 'checklist' | 'validator' | 'queue' | 'workflow' | 'whatsapp';

export type AgentId = 'retrieval' | 'workflow' | 'document' | 'queue';

export type Language = 'en' | 'hi' | 'mr' | 'kn' | 'ta';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agent?: string;
  agentId?: AgentId;
  timestamp: number;
  lang?: Language;
}

export interface StepStatus {
  id: StepId;
  label: string;
  done: boolean;
  active: boolean;
}

export interface DocCheckItem {
  label: string;
  result: string;
  ok: boolean;
  confidence: number;
}

export interface QueueHourData {
  hour: string;
  busyness: number;
  isRecommended: boolean;
}

export interface OfficeData {
  name: string;
  distance: string;
  wait: string;
  waitMin: number;
  recommended: boolean;
  crowdLevel: 'low' | 'medium' | 'high';
}

export interface WorkflowStep {
  n: number;
  text: string;
  detail: string;
  time: string;
  done?: boolean;
}

export interface ScenarioConfig {
  key: string;
  label: string;
  icon: string;
  intentKeywords: string[];
  documentTitle: string;
  documents: string[];
  officeName: string;
  officeCity: string;
  feeAmount: string;
  formName: string;
  formLink: string;
  totalSteps: WorkflowStep[];
}
