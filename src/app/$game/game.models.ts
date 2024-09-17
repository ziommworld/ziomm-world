import { CharacterConfig, CharacterState } from "../$character";
import { GameComponentConfig, GameComponentState } from "../$component";
import { GameMapConfig, GameMapState } from "../$map";


export enum GamePhase {
  Draft,
  Setup,
  Active,
  Pause,
  End,
}

export interface GameState {
  phase: GamePhase;

  characters: Record<string, CharacterState>;
  components: Record<string, GameComponentState>;
  map: GameMapState;

  turn: number;
  round: number; // corresponds to initiative

  endedOn?: number; // timestamp
  gameTime: number; // ms
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
