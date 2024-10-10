import { GameCharacterConfig, GameCharacterKey, GameCharacterState } from "../$character";
import { GameMapConfig, GameMapKey, GameMapState } from "../$map";
import { GameEventConfig, GameEventKey, GameEventState } from "../$mechanics";

// ===================== DRAFT =====================

export interface GameScenarioDraft {
  difficulty: number;
  time: number;
  rounds: number;
}

// ===================== CONFIG =====================

export interface BaseScenarioConfig {
  name: string;

  minCharacters: number;
  maxCharacters: number;

  initialMap: GameMapKey;
  defaultRounds: number;

  npcs: GameCharacterKey[];
  maps: GameMapKey[];
  events: GameEventKey[];
}

export interface GameScenarioConfig extends Omit<BaseScenarioConfig, 'npcs' | 'maps' | 'events'> {
  id: string;
  key: GameScenarioKey;

  maxRounds: number;
  maxTime: number;
  difficulty: number;

  characters: GameCharacterConfig[];
  npcs: GameCharacterConfig[];
  maps: GameMapConfig[];
  events: GameEventConfig[];
}

// ===================== STATE =====================

export interface GameScenarioStats {
  totalTurns: number;
  avgRoundTime: number; // ms
  avgTurnTime: number; // ms
}

export interface GameScenarioState {
  currentRound: number;

  /**
   * corresponds to character initiative
   */
  currentTurn: number;

  activeMap: GameMapKey;

  characters: Record<string, GameCharacterState>;
  npcs: Record<string, GameCharacterState>;
  maps: Record<GameMapKey, GameMapState>;
  events: Record<string, GameEventState>;

  stats: GameScenarioStats;
}

// ===================== LIBRARY =====================

export type GameScenarioKey =
  'test' |
  'arena';

export type GameScenarioLib = Record<GameScenarioKey, BaseScenarioConfig>;
