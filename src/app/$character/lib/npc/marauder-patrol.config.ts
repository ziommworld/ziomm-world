import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

export const marauderPatrol: BaseCharacterConfig = {
  name: 'Marauder patrol',
  icon: GameCharacterIcon.Marauder,

  maxHP: 5,
  baseMS: 2,

  alignment: GameCharacterAlignment.PP,
  techLvl: 2,
  powerLvl: 130,

  proficiency: {
    strength: 1,
    toughness: 1,
    intelligence: 0,
    perception: 1,
  },

  resistance: {
    physical: 1,
    elemental: 1,
    nuclear: 1,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'shockBaton',
    'powerPunch',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}
