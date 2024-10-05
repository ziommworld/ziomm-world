import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const ratbeastAlt: BaseCharacterConfig = {
  name: 'Ratbeast B',
  icon: GameCharacterIcon.Ratbeast,

  maxHP: 7,
  baseMS: 2,

  alignment: GameCharacterAlignment.AS,
  techLvl: 1,
  powerLvl: 220,

  proficiency: {
    strength: 2,
    toughness: 2,
    intelligence: 0,
    perception: 2,
  },

  resistance: {
    physical: 0,
    elemental: 1,
    nuclear: 1,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedTendonRip',
    'advancedChomp',
    'rush',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const ratbeast: BaseCharacterConfig = {
  ...ratbeastAlt,
  name: 'Ratbeast A',
  maxHP: 8,
  powerLvl: 200,

  proficiency: {
    strength: 2,
    toughness: 3,
    intelligence: 1,
    perception: 2,
  },

  abilities: [
    'tendonRip',
    'chomp',
    'counter',
  ],

  alt: ratbeastAlt,
};
