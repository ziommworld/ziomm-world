import { GameComponentConfig, GameComponentType } from "../../../../$component";


export const wall: GameComponentConfig = {
  name: 'Wall',
  type: GameComponentType.Edge,

  interactions: [],
}

export const damagedWall: GameComponentConfig = {
  name: 'Damaged wall',
  type: GameComponentType.Edge,
  penaltyMS: 2,

  interactions: [],
}

export const reinforcedWall: GameComponentConfig = {
  name: 'Reinforced wall',
  type: GameComponentType.Edge,

  interactions: [],
}
