import { CharacterAction } from "../$character";

export interface GameComponentConfig {
  name: string;
  type: GameComponentType;

  mountable?: boolean;
  impassable?: boolean;
  destructible?: boolean;
  transparent?: boolean;
  climbable?: boolean;

  penaltyMS?: number; // only when not impassable

  interactions: CharacterAction[];
}

export enum GameComponentType {
  Block = 'block',
  Edge = 'edge',
  Terrain = 'terrain',
  Ambient = 'ambient',
}

export interface GameComponentState {
  durability?: number;
}
