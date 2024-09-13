export enum GamePhase {
  Draft,
  PreGame,
  Active,
  Pause,
  End,
}

export interface GameState {
  id: string;
  name: string;
  state: GamePhase;

  players: string[];
  turn: number;
  maxTurns: number;

  startedOn: number; // timestamp
  endedOn?: number; // timestamp
  gameTime: number; // ms
}
