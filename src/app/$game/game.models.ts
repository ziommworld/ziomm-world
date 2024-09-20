import { CharacterConfig, CharacterKey, CharacterState } from "../$character";
import { GameComponentConfig, GameComponentKey, GameComponentState } from "../$component";
import { GameMapConfig, GameMapState } from "../$map";
import { ScenarioState } from "../$scenario";


export enum GamePhase {
  PreGame,
  InGame,
  PostGame,
}

export interface GameStats {
  totalTime: number; // ms
}

export interface GameState {
  phase: GamePhase;
  isPaused: boolean;

  scenario: ScenarioState;

  stats: GameStats;

  updatedOn: number; // timestamp
  endedOn?: number; // timestamp
}

export interface GameConfig {
  id: string;
  name: string; // the name of the game
  players: string[];

  characters: Record<string, CharacterConfig>;
  components: Record<string, GameComponentConfig>;
  map: GameMapConfig;

  maxTurns?: number;
  maxTime?: number;

  startedOn: number; // timestamp
}
