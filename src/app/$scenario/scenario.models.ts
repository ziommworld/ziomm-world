import { CharacterKey, CharacterState } from "../$character";
import { GameComponentKey, GameComponentState } from "../$component";
import { GameMapKey, GameMapState } from "../$map";


export interface ScenarioConfig {
  name: string;

  minCharacters: number;
  maxCharacters: number;

  initialMap: GameMapKey;
  defaultTurns: number;

  maps: string[]; // map keys
  npcs: string[]; // character keys
}

export interface ScenarioStats {
  totalRounds: number;
  avgRoundTime: number; // ms
}

export interface ScenarioState {
  currentTurn: number;
  currentRound: number; // corresponds to initiative
  activeMap: GameMapKey;

  characters: Record<CharacterKey, CharacterState>;
  components: Record<GameComponentKey, GameComponentState>;
  maps: Record<GameMapKey, GameMapState>;

  stats: ScenarioStats;
}

export type ScenarioKey =
  'test' |
  'arena';

export type ScenarioLibrary = Record<ScenarioKey, ScenarioConfig>;
