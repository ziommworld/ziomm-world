import { GameCharacterConfig, GameCharacterKey, GameCharacterState } from "../$character";
import { GameMapConfig, GameMapKey, GameMapState } from "../$map";
import { GameEventConfig, GameEventKey, GameEventState } from "../$mechanics";

// ===================== DRAFT =====================

export interface GameScenarioDraft {
  difficulty: number;
  time: number;
  turns: number;
}

// ===================== CONFIG =====================

export interface BaseScenarioConfig {
  name: string;

  minCharacters: number;
  maxCharacters: number;

  initialMap: GameMapKey;
  defaultTurns: number;

  npcs: GameCharacterKey[];
  maps: GameMapKey[];
  events: GameEventKey[];
}

export interface GameScenarioConfig extends Omit<BaseScenarioConfig, 'npcs' | 'maps' | 'events'> {
  id: string;
  key: GameScenarioKey;

  maxTurns: number;
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
  currentTurn: number; // corresponds to initiative
  currentRound: number;
  activeMap: GameMapKey; // TODO change to mapId

  characters: Record<string, GameCharacterState>;
  npcs: Record<string, GameCharacterState>;
  maps: Record<string, GameMapState>;
  events: Record<string, GameEventState>;

  stats: GameScenarioStats;
}

// ===================== LIBRARY =====================

export type GameScenarioKey =
  'test' |
  'arena';

export type GameScenarioLib = Record<GameScenarioKey, BaseScenarioConfig>;
