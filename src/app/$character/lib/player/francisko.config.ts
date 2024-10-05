import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const franciskoAlt: BaseCharacterConfig = {
  name: 'Francisko B',
  icon: GameCharacterIcon.Francisko,

  maxHP: 7,
  baseMS: 2,

  alignment: GameCharacterAlignment.PP,
  techLvl: 3,
  powerLvl: 220,

  proficiency: {
    strength: 1,
    toughness: 3,
    intelligence: 1,
    perception: 2,
  },

  resistance: {
    physical: 1,
    elemental: 1,
    nuclear: 0,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedPhotonShotgun',
    'advancedHealingNanobots',
    'basicAvoid',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const francisko: BaseCharacterConfig = {
  ...franciskoAlt,
  name: 'Francisko A',
  maxHP: 8,
  powerLvl: 200,

  proficiency: {
    strength: 2,
    toughness: 1,
    intelligence: 1,
    perception: 1,
  },

  abilities: [
    'photonShotgun',
    'healingNanobots',
    'basicHide',
  ],

  alt: franciskoAlt,
};
