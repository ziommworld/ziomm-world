import { GameMapDirection, GameMapCoordinate } from "../$map";
import { GameActionConfig, GameActionKey, GameActionState, GameEventConfig, GameEventKey, GameEventState } from "../$mechanics";

// ===================== GLOBAL =====================

export interface CellDefinition {
  x: number;
  y: number;

  destructible?: boolean;
  impassable?: boolean;
  transparent?: boolean;
  // movable?: boolean;

  // interactable?: boolean; // general purpose
  climbable?: GameMapDirection;
  mountable?: GameMapDirection;
}

export interface ComponentLayoutConfig {
  cells: CellDefinition[];
}

export interface ComponentLayoutState {
  anchor: GameMapCoordinate;
  direction: GameMapDirection;
}

// ===================== CONFIG =====================

export enum GameComponentType {
  Block = 'block',
  Edge = 'edge',
  Terrain = 'terrain',
  Ambient = 'ambient',
}

export interface BaseComponentConfig {
  name: string;
  type: GameComponentType;

  penaltyMS?: number; // only when not impassable

  interactions: GameActionKey[];
  events: GameEventKey[];
}

export interface GameComponentConfig extends Omit<BaseComponentConfig, 'interactions' | 'events'> {
  id: string;
  key: string;

  durability?: number;

  interactions: GameActionConfig[];
  events: GameEventConfig[];
}

// ===================== STATE =====================

export interface GameComponentStats {

}

export interface GameComponentState {
  durability?: number;

  interactions: Record<string, GameActionState>;
  events: Record<string, GameEventState>;

  stats: GameComponentStats;
}

// ===================== LIBRARY =====================

export type GameComponentKey =
  'wall' |
  'damagedWall' |
  'reinforcedWall' |
  'basicWindow' |
  'reinforcedWindow' |
  'door' |
  'rock' |
  'jaggedRock';

export type GameComponentLib = Record<GameComponentKey, BaseComponentConfig>;
