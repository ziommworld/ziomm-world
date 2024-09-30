import { GameComponentConfig, GameComponentKey, GameComponentState } from "../$component";
import { GameEventConfig, GameEventKey, GameEventState } from "../$mechanics";

// ===================== CONFIG =====================

export interface GameMapCoordinate {
  // 0,0 is top-left
  x: number;
  y: number;
}

export interface GameMapSize {
  rows: number;
  cols: number;
}

export type GameMapDirection = 'north' | 'east' | 'south' | 'west';

// BOTTOM LEFT CORNER is (0, 0)
// X-AXIS shows east
// Y-AXIS shows north

export enum TerrainType {
  Spawn = 'spawn', // char starting point

  // natural
  Plains = 'plains', // grassland
  Desert = 'desert', // sand
  Fissures = 'fissures',
  Snow = 'snow', // ice

  // artificial
  Road = 'road', // asphalt
  Platform = 'platform', // metal
  Exterior = 'exterior', // concrete
  Interior = 'interior', // inside a building
}

export interface GameComponentLayout {
  anchor: GameMapCoordinate;
  direction: GameMapDirection;
}

export type GameComponentDef = [GameComponentKey, GameComponentLayout];

export interface MicroTile {
  id: string;
  coord: GameMapCoordinate;
  terrain: TerrainType;
}

export interface BaseMapConfig {
  name: string;
  size: GameMapSize;

  terrain: TerrainType[][];

  components: GameComponentDef[];
  events: GameEventKey[];
}

export interface GameMapConfig extends Omit<BaseMapConfig, 'components' | 'events' | 'terrain'> {
  id: string;
  key: GameMapKey;

  tiles: MicroTile[][];
  components: GameComponentConfig[];
  events: GameEventConfig[];
}

// ===================== STATE =====================

export interface GameMapStats {

}

export interface GameMapState {
  components: Record<string, GameComponentState>;
  events: Record<string, GameEventState>;

  stats: GameMapStats;
}

// ===================== LIBRARY =====================

export type GameMapKey =
  'small' |
  'medium';

export type GameMapLib = Record<GameMapKey, BaseMapConfig>;
