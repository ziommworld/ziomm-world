import { Character } from "../$character";
import { GameComponent } from "../$component";


export interface MicroTile {
  x: number;
  y: number;

  terrain: TerrainType;
}

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

export interface GameMapConfig {
  name: string;
  tiles: MicroTile[][];
}

export interface GameMapState {

}

export type GameMapKey =
  'small' |
  'medium';

export type GameMapLibrary = Record<GameMapKey, GameMapConfig>;
