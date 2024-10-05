import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

export const marauderBoss: BaseCharacterConfig = {
  name: 'Marauder boss',
  icon: GameCharacterIcon.Marauder,

  maxHP: 9,
  baseMS: 3,

  alignment: GameCharacterAlignment.PP,
  techLvl: 2,
  powerLvl: 230,

  proficiency: {
    strength: 3,
    toughness: 2,
    intelligence: 1,
    perception: 0,
  },

  resistance: {
    physical: 2,
    elemental: 2,
    nuclear: 2,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'battleChain',
    'quickCharge',
    'elude',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}
