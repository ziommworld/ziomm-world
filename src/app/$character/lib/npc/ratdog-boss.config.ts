import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const ratdogBossAlt: BaseCharacterConfig = {
  name: 'Ratdog boss B',
  icon: GameCharacterIcon.Ratdog,

  maxHP: 8,
  baseMS: 3,

  alignment: GameCharacterAlignment.AA,
  techLvl: 1,
  powerLvl: 275,

  proficiency: {
    strength: 2,
    toughness: 3,
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
    'advancedSuperDeadlyBite',
    'advancedSuperBleedingClaw',
    'avoid',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const ratdogBoss: BaseCharacterConfig = {
  ...ratdogBossAlt,
  name: 'Ratdog boss A',
  powerLvl: 250,

  proficiency: {
    strength: 3,
    toughness: 3,
    intelligence: 1,
    perception: 1,
  },

  abilities: [
    'superDeadlyBite',
    'superBleedingClaw',
    'evade',
  ],

  alt: ratdogBossAlt,
};
