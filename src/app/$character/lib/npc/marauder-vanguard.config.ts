import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

export const marauderVanguard: BaseCharacterConfig = {
  name: 'Marauder vanguard',
  icon: GameCharacterIcon.Marauder,
  iconBadge: 'V',

  maxHP: 6,
  baseMS: 2,

  alignment: GameCharacterAlignment.PP,
  techLvl: 2,
  powerLvl: 145,

  proficiency: {
    strength: 2,
    toughness: 1,
    intelligence: 0,
    perception: 1,
  },

  resistance: {
    physical: 2,
    elemental: 2,
    nuclear: 1,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'axe',
    'advancedBlock',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}
