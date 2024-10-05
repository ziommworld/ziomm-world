import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const nathanielAlt: BaseCharacterConfig = {
  name: 'Nathaniel B',
  icon: GameCharacterIcon.Nathaniel,

  maxHP: 8,
  baseMS: 2,

  alignment: GameCharacterAlignment.SS,
  techLvl: 2,
  powerLvl: 220,

  proficiency: {
    strength: 3,
    toughness: 3,
    intelligence: 2,
    perception: 1,
  },

  resistance: {
    physical: 1,
    elemental: 0,
    nuclear: 1,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedGatlingGun',
    'advancedElectricNetgun',
    'sidestep',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const nathaniel: BaseCharacterConfig = {
  ...nathanielAlt,
  name: 'Nathaniel A',
  powerLvl: 200,

  proficiency: {
    strength: 2,
    toughness: 2,
    intelligence: 2,
    perception: 1,
  },

  abilities: [
    'gatlingGun',
    'electricNetgun',
    'charge',
  ],

  alt: nathanielAlt,
};
