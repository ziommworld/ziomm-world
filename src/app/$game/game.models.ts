import { GameCharacterDraft } from "../$character";
import { GameScenarioConfig, GameScenarioKey, GameScenarioState } from "../$scenario";
import { GameScenarioDraft } from "../$scenario/scenario.models";

// ===================== DRAFT =====================

export interface GameDraft {
  scenario: GameScenarioKey;
  players: string[];

  characters: Array<GameCharacterDraft>;
  settings: GameScenarioDraft;
}

// ===================== CONFIG =====================

export interface GameConfig {
  id: string;
  name: string;
  players: string[];

  scenario: GameScenarioConfig;

  startedOn: number; // timestamp
}

// ===================== STATE =====================

export enum GamePhase {
  PreGame = 'pre-game',
  InGame = 'in-game',
  PostGame = 'post-game',
}

export interface GameStats {
  totalTime: number; // ms
}

export interface GameState {
  phase: GamePhase;
  isPaused: boolean;

  scenario: GameScenarioState;

  stats: GameStats;

  updatedOn: number; // timestamp
  endedOn?: number; // timestamp
}

// ===================== STORAGE =====================

export interface GameRecord {
  config: GameConfig;
  state: GameState;
}
