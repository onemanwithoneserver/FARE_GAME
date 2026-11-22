export type Language = 'en' | 'te';
export type Theme = 'dark' | 'light';
export type GameMode = 1 | 2; 

export type StageId = 0 | 1 | 2 | 3 | 4;

export interface StageMeta {
  id: StageId;
  key: 'lead' | 'follow' | 'visit' | 'close' | 'ref';
  title: string;
  name: { en: string; te: string };
  color: string;
  glow: string;
  desc: { en: string; te: string };
}

export interface CandidatePoolItem {
  g: 'field' | 'digital' | 'site' | 'lead';
  e: string;
  n: string;
  who: string;
  plus: string;
  minus: string;
  model: string;
  fit: number[];
}

export interface CaseOption {
  emoji: string;
  name: string;
  scoreCode: number;
  reason: string;
}

export interface GameCase {
  id: number;
  st: string;
  title: { en: string; te: string };
  desc: { en: string; te: string };
  leak: StageId;
  options: CaseOption[];
}

export interface CardItem {
  id: string;
  type: 'candidate' | 'process';
  emoji: string;
  name: string;
  scoreCode: number;
  reason: string;
  detail?: string;
  group?: string;
  model?: string;
  pros?: string;
  cons?: string;
  fit?: number[];
}

export interface DecisionRecord {
  caseIndex: number;
  item: CardItem;
  decision: 'yes' | 'no';
  scoreDelta: number;
  leakDelta: number;
  feedback: string;
  feedbackType: 'clamp' | 'tape' | 'fall' | 'crack' | 'reject_good' | 'reject_bad';
}

export interface PlayerProfile {
  name: string;
  mobile: string;
  at: string;
}

export interface GameStats {
  score: number;
  hiredCount: number;
  implementedCount: number;
  rejectedCount: number;
  leaksPlugged: number;
  accuracy: number;
  combo: number;
  maxCombo: number;
  pressure: number; 
  flowRate: number; 
}
