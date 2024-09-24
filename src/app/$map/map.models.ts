import { GameComponentConfig, GameComponentKey, GameComponentState } from "../$component";
import { GameEventConfig, GameEventKey, GameEventState, GameMapCoordinate, GameMapDirection } from "../$mechanics";

// ===================== CONFIG =====================

// BOTTOM LEFT CORNER is (0, 0)
// X-AXIS shows east
// Y-AXIS shows north

export enum TerrainType {
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
  coord: GameMapCoordinate;
  terrain: TerrainType;
}

export interface BaseMapConfig {
  name: string;

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
