import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const ratdogHunterAlt: BaseCharacterConfig = {
  name: 'Ratdog hunter B',
  icon: GameCharacterIcon.Ratdog,

  maxHP: 5,
  baseMS: 2,

  alignment: GameCharacterAlignment.AA,
  techLvl: 1,
  powerLvl: 165,

  proficiency: {
    strength: 0,
    toughness: 1,
    intelligence: 1,
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
    'advancedToxicSpray',
    'advancedJumpOut',
    'avoid',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const ratdogHunter: BaseCharacterConfig = {
  ...ratdogHunterAlt,
  name: 'Ratdog hunter A',
  maxHP: 4,
  powerLvl: 150,

  proficiency: {
    strength: 0,
    toughness: 2,
    intelligence: 1,
    perception: 1,
  },

  abilities: [
    'toxicSpray',
    'jumpOut',
    'elude',
  ],

  alt: ratdogHunterAlt,
};
