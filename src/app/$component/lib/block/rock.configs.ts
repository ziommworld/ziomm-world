import { BaseComponentConfig, GameComponentType } from "../../component.models";


export const rock: BaseComponentConfig = {
  name: 'Rock',
  type: GameComponentType.Block,
  height: 2,

  interactions: [
    'climb',
  ],
  events: [

  ],
};

export const jaggedRock: BaseComponentConfig = {
  name: 'Jagged rock',
  type: GameComponentType.Block,
  height: 2,

  interactions: [

  ],
  events: [

  ],
};
