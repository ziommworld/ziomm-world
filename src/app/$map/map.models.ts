import { Character } from "../$character";
import { GameComponent } from "../$component";

export interface GameMapConfig {

}

export interface MicroTile {
  x: number;
  y: number;

  terrain: TerrainType;

  character?: Character;
  component?: GameComponent;
}

export enum TerrainType {
  // natural
  Plains = 'plains',
  Desert = 'desert',
  // Fissures = 'fissures',
  // Rock = 'rock',

  // artificial
  Concrete = 'concrete',
  Platform = 'platform', // metal
  Interior = 'interior', // inside a building
}

export interface GameMapState {
  layer: number;
}
