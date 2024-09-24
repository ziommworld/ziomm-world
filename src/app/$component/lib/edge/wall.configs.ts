import { BaseComponentConfig, GameComponentType } from "../../component.models";


export const wall: BaseComponentConfig = {
  name: 'Wall',
  type: GameComponentType.Edge,

  interactions: [
  ],
  events: [

  ],
};

export const damagedWall: BaseComponentConfig = {
  name: 'Damaged wall',
  type: GameComponentType.Edge,

  penaltyMS: 2,

  interactions: [
  ],
  events: [

  ],
};

export const reinforcedWall: BaseComponentConfig = {
  name: 'Reinforced wall',
  type: GameComponentType.Edge,

  interactions: [

  ],
  events: [
  ],
};
