import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const adam3000Alt: BaseCharacterConfig = {
  name: 'ADAM 3000 B',
  icon: GameCharacterIcon.Adam3000,

  maxHP: 8,
  baseMS: 2,

  alignment: GameCharacterAlignment.ZZ,
  techLvl: 4,
  powerLvl: 220,

  proficiency: {
    strength: 2,
    toughness: 2,
    intelligence: 2,
    perception: 3,
  },

  resistance: {
    physical: 2,
    elemental: 3,
    nuclear: 2,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'lightSabre',
    'advancedPropelledLunge',
    'counter',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const adam3000: BaseCharacterConfig = {
  ...adam3000Alt,
  name: 'ADAM 3000 A',
  maxHP: 7,
  powerLvl: 200,

  proficiency: {
    strength: 1,
    toughness: 2,
    intelligence: 1,
    perception: 1,
  },

  abilities: [
    'lightSabre',
    'propelledLunge',
    'basicVanish',
  ],

  alt: adam3000Alt,
};
