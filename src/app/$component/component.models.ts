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

export interface GameComponentStats {

}

export interface GameComponentState {
  durability?: number;

  stats: GameComponentStats;
}

export type GameComponentKey =
  'wall' |
  'damagedWall' |
  'reinforcedWall' |
  'basicWindow' |
  'reinforcedWindow' |
  'door' |
  'rock' |
  'jaggedRock';

export type GameComponentLibrary = Record<GameComponentKey, GameComponentConfig>;
