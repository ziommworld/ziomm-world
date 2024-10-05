import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const jhwackAlt: BaseCharacterConfig = {
  name: 'Jhwack B',
  icon: GameCharacterIcon.Jhwack,

  maxHP: 8,
  baseMS: 3,

  alignment: GameCharacterAlignment.AP,
  techLvl: 1,
  powerLvl: 220,

  proficiency: {
    strength: 3,
    toughness: 2,
    intelligence: 2,
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
    'advancedCrushingBlow',
    'advancedRockToss',
    'deflect',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const jhwack: BaseCharacterConfig = {
  ...jhwackAlt,
  name: 'Jhwack A',
  maxHP: 7,
  powerLvl: 200,

  proficiency: {
    strength: 2,
    toughness: 1,
    intelligence: 1,
    perception: 2,
  },

  abilities: [
    'crushingBlow',
    'rockToss',
    'evade',
  ],

  alt: jhwackAlt,
};
