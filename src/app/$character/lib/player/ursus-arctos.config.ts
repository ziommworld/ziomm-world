import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const ursusArctosAlt: BaseCharacterConfig = {
  name: 'Ursus arctos B',
  icon: GameCharacterIcon.UrsusArctos,

  maxHP: 8,
  baseMS: 3,

  alignment: GameCharacterAlignment.AA,
  techLvl: 1,
  powerLvl: 220,

  proficiency: {
    strength: 2,
    toughness: 3,
    intelligence: 2,
    perception: 0,
  },

  resistance: {
    physical: 1,
    elemental: 1,
    nuclear: 2,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedDeadlyBite',
    'advancedSwipe',
    'shift',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const ursusArctos: BaseCharacterConfig = {
  ...ursusArctosAlt,
  name: 'Ursus arctos A',

  powerLvl: 200,

  proficiency: {
    strength: 3,
    toughness: 2,
    intelligence: 1,
    perception: 1,
  },

  abilities: [
    'deadlyBite',
    'swipe',
    'block',
  ],

  alt: ursusArctosAlt,
};
