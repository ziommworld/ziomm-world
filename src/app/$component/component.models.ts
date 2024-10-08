import { GameMapDirection, GameMapCoordinate } from "../$map";
import { GameActionConfig, GameActionKey, GameActionState, GameEventConfig, GameEventKey, GameEventState } from "../$mechanics";

// ===================== CONFIG =====================

export interface GameComponentLayout {
  position: GameMapCoordinate;
  orientation: GameMapDirection;
}

export enum GameComponentType {
  Ambient = 'ambient',
  Block = 'block',
  Edge = 'edge',
}

export type MapComponentConfig = [GameComponentKey, GameComponentLayout];

export interface BaseComponentConfig {
  name: string;
  type: GameComponentType;
  height: number;

  destructible?: boolean;
  impassable?: boolean;
  transparent?: boolean;
  obstructive?: boolean;
  // movable?: boolean; // can be moved

  /**
   * if false, edge components can only be interacted from the adjacent tile in the direction of the orientation
   * for block components, interactions are allowed from both ajdacent cells along the axis of the orientation
   */
  omnidirectional?: boolean; // can be interacted from any direction

  penaltyMS?: number; // only when not impassable

  interactions: GameActionKey[];
  events: GameEventKey[];
}

export interface GameComponentConfig extends Omit<BaseComponentConfig, 'interactions' | 'events'> {
  id: string;
  key: GameComponentKey;
  layout: GameComponentLayout;

  durability?: number;

  interactions: GameActionConfig[];
  events: GameEventConfig[];
}

// ===================== STATE =====================

export interface GameComponentStats {

}

export interface GameComponentState {
  // layout: GameComponentLayout; // TODO could be dynamic in the future

  durability?: number;
  destroyed?: boolean;

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
