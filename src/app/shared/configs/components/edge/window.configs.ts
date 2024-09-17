import { GameComponentConfig, GameComponentType } from "../../../../$component";

export const windowConfig: GameComponentConfig = {
  name: 'Window',
  type: GameComponentType.Edge,
  transparent: true,

  interactions: [],
}

export const reinforcedWindowConfig: GameComponentConfig = {
  name: 'Reinforced wall',
  type: GameComponentType.Edge,
  transparent: true,

  interactions: [],
}
