import { GameComponentConfig, GameComponentType } from "../../../../$component";

export const basicWindow: GameComponentConfig = {
  name: 'Window',
  type: GameComponentType.Edge,
  transparent: true,

  interactions: [],
}

export const reinforcedWindow: GameComponentConfig = {
  name: 'Reinforced wall',
  type: GameComponentType.Edge,
  transparent: true,

  interactions: [],
}
