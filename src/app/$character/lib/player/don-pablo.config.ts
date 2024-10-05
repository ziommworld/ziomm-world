import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const donPabloAlt: BaseCharacterConfig = {
  name: 'Don Pablo B',
  icon: GameCharacterIcon.DonPablo,

  maxHP: 7,
  baseMS: 3,

  alignment: GameCharacterAlignment.PS,
  techLvl: 2,
  powerLvl: 220,

  proficiency: {
    strength: 1,
    toughness: 1,
    intelligence: 1,
    perception: 3,
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
    'advancedDagger',
    'advancedSword',
    'avoid',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const donPablo: BaseCharacterConfig = {
  ...donPabloAlt,
  name: 'Don Pablo A',
  powerLvl: 200,

  proficiency: {
    strength: 1,
    toughness: 0,
    intelligence: 1,
    perception: 1,
  },

  abilities: [
    'dagger',
    'sword',
    'elude',
  ],

  alt: donPabloAlt,
};
