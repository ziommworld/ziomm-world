import { GameMapKey } from "../$map";


export interface ScenarioState {
  currentMap: GameMapKey;
}

export interface ScenarioConfig {
  name: string;
  minCharacters: number;
  maxCharacters: number;
  defaultTurns: number;

  maps: string[]; // map keys
  npcs: string[]; // character keys
}

export type ScenarioKey =
  'test' |
  'arena';

export type ScenarioLibrary = Record<ScenarioKey, ScenarioConfig>;
