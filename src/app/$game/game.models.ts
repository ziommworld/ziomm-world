import { CharacterConfig, CharacterKey, CharacterState } from "../$character";
import { GameComponentConfig, GameComponentKey, GameComponentState } from "../$component";
import { GameMapConfig, GameMapState } from "../$map";


export enum GamePhase {
  Setup,
  Active,
  Pause,
  End,
}

export interface GameState {
  phase: GamePhase;

  characters: Record<CharacterKey, CharacterState>;
  components: Record<GameComponentKey, GameComponentState>;
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
