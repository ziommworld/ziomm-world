import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const humanPlantHybridAlt: BaseCharacterConfig = {
  name: 'Human-plant hybrid B',
  icon: GameCharacterIcon.HumanPlantHybrid,

  maxHP: 9,
  baseMS: 2,

  alignment: GameCharacterAlignment.ZS,
  techLvl: 1,
  powerLvl: 220,

  proficiency: {
    strength: 2,
    toughness: 2,
    intelligence: 1,
    perception: 1,
  },

  resistance: {
    physical: 1,
    elemental: 2,
    nuclear: 3,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedGroundSmash',
    'advancedEntangle',
    'dodge',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const humanPlantHybrid: BaseCharacterConfig = {
  ...humanPlantHybridAlt,
  name: 'Human-plant hybrid A',
  maxHP: 8,
  powerLvl: 200,

  proficiency: {
    strength: 2,
    toughness: 3,
    intelligence: 1,
    perception: 0,
  },

  abilities: [
    'groundSmash',
    'entangle',
    'block',
  ],

  alt: humanPlantHybridAlt,
};
