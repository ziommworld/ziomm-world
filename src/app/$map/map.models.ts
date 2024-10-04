import { MapComponentConfig, GameComponentConfig, GameComponentState, GameComponent } from "../$component";
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

export interface MicroTileConfig {
  coord: GameMapCoordinate;
  terrain: TerrainType;
}

export interface BaseMapConfig {
  name: string;
  size: GameMapSize;

  terrain: TerrainType[][];

  components: MapComponentConfig[];
  events: GameEventKey[];
}

export interface GameMapConfig extends Omit<BaseMapConfig, 'components' | 'events' | 'terrain'> {
  id: string;
  key: GameMapKey;

  tiles: MicroTileConfig[][];

  components: GameComponentConfig[];
  events: GameEventConfig[];
}

// ===================== STATE =====================

export interface MicroTileState {
  characterId?: string;
  blockComponentId?: string;
  edgeComponentIds?: string[];
  ambientComponentIds?: string[];
}

export interface GameMapStats {

}

export interface GameMapState {
  tiles: MicroTileState[][];

  components: Record<string, GameComponentState>;
  events: Record<string, GameEventState>;

  stats: GameMapStats;
}

// ===================== LIBRARY =====================

export type GameMapKey =
  'small' |
  'medium';

export type GameMapLib = Record<GameMapKey, BaseMapConfig>;
