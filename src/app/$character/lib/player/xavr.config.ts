import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const xavrAlt: BaseCharacterConfig = {
  name: 'XAVR B',
  icon: GameCharacterIcon.XAVR,

  maxHP: 7,
  baseMS: 2,

  alignment: GameCharacterAlignment.ZP,
  techLvl: 4,
  powerLvl: 220,

  proficiency: {
    strength: 3,
    toughness: 2,
    intelligence: 2,
    perception: 1,
  },

  resistance: {
    physical: 1,
    elemental: 2,
    nuclear: 1,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedToxicFumes',
    'advancedLifeDrain',
    'basicAssault',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const xavr: BaseCharacterConfig = {
  ...xavrAlt,
  name: 'XAVR A',
  powerLvl: 200,

  proficiency: {
    strength: 1,
    toughness: 2,
    intelligence: 3,
    perception: 1,
  },

  abilities: [
    'toxicFumes',
    'lifeDrain',
    'shieldWall',
  ],

  alt: xavrAlt,
};
