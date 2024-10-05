import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const ratdogFighterAlt: BaseCharacterConfig = {
  name: 'Ratdog fighter B',
  icon: GameCharacterIcon.Ratdog,

  maxHP: 4,
  baseMS: 2,

  alignment: GameCharacterAlignment.AA,
  techLvl: 1,
  powerLvl: 165,

  proficiency: {
    strength: 2,
    toughness: 2,
    intelligence: 0,
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
    'advancedToxicBite',
    'advancedBleedingClaw',
    'sidestep',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const ratdogFighter: BaseCharacterConfig = {
  ...ratdogFighterAlt,
  name: 'Ratdog fighter A',
  powerLvl: 150,

  proficiency: {
    strength: 1,
    toughness: 3,
    intelligence: 0,
    perception: 0,
  },

  abilities: [
    'toxicBite',
    'bleedingClaw',
    'counter',
  ],

  alt: ratdogFighterAlt,
};
