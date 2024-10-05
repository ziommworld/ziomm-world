import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const electroWolfAlt: BaseCharacterConfig = {
  name: 'Electro-wolf B',
  icon: GameCharacterIcon.ElectroWolf,

  maxHP: 7,
  baseMS: 2,

  alignment: GameCharacterAlignment.AZ,
  techLvl: 3,
  powerLvl: 220,

  proficiency: {
    strength: 2,
    toughness: 0,
    intelligence: 1,
    perception: 2,
  },

  resistance: {
    physical: 3,
    elemental: 2,
    nuclear: 1,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedElectroBite',
    'advancedRapidBite',
    'shift',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const electroWolf: BaseCharacterConfig = {
  ...electroWolfAlt,
  name: 'Electro-wolf A',
  baseMS: 3,
  powerLvl: 200,

  proficiency: {
    strength: 0,
    toughness: 1,
    intelligence: 1,
    perception: 1,
  },

  abilities: [
    'electroBite',
    'rapidBite',
    'block',
  ],

  alt: electroWolfAlt,
};
