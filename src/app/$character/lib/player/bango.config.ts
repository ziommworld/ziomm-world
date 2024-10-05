import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const bangoAlt: BaseCharacterConfig = {
  name: 'Bango B',
  icon: GameCharacterIcon.Bango,

  maxHP: 8,
  baseMS: 2,

  alignment: GameCharacterAlignment.SA,
  techLvl: 2,
  powerLvl: 220,

  proficiency: {
    strength: 3,
    toughness: 1,
    intelligence: 0,
    perception: 1,
  },

  resistance: {
    physical: 2,
    elemental: 1,
    nuclear: 2,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedWarhammer',
    'advancedShieldSlam',
    'assault',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const bango: BaseCharacterConfig = {
  ...bangoAlt,
  name: 'Bango A',
  maxHP: 7,
  baseMS: 3,
  powerLvl: 200,

  proficiency: {
    strength: 2,
    toughness: 2,
    intelligence: 0,
    perception: 0,
  },

  abilities: [
    'warhammer',
    'shieldSlam',
    'vanish',
  ],

  alt: bangoAlt,
};
