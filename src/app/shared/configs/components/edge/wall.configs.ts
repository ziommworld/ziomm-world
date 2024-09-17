import { GameComponentConfig, GameComponentType } from "../../../../$component";

export const wallConfig: GameComponentConfig = {
  name: 'Wall',
  type: GameComponentType.Edge,

  interactions: [],
}

export const damagedWallConfig: GameComponentConfig = {
  name: 'Damaged wall',
  type: GameComponentType.Edge,
  penaltyMS: 2,

  interactions: [],
}

export const reinforcedWallConfig: GameComponentConfig = {
  name: 'Reinforced wall',
  type: GameComponentType.Edge,

  interactions: [],
}
