import { BaseCharacterConfig, GameCharacterIcon } from "src/app/$character";
import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";


export const beetle: BaseCharacterConfig = {
  name: 'Beetle',
  icon: GameCharacterIcon.Beetle,

  maxHP: 10,
  baseMS: 10,

  techLvl: 1,
  powerLvl: 14,

  proficiency: {
    intelligence: 1,
    perception: 2,
    strength: 3,
    toughness: 4
  },

  resistance: {
    physical: 3,
    elemental: 1,
    nuclear: 2,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [

  ],
  interactions: [
    ...characterInteractionConfigs
  ],
};
