import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const mechaSpiderAlt: BaseCharacterConfig = {
  name: 'Mecha-spider B',
  icon: GameCharacterIcon.MechaSpider,

  maxHP: 7,
  baseMS: 3,

  alignment: GameCharacterAlignment.ZA,
  techLvl: 4,
  powerLvl: 220,

  proficiency: {
    strength: 1,
    toughness: 1,
    intelligence: 2,
    perception: 1,
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
    'advancedNuclearRifle',
    'advancedNeuralInjection',
    'advancedCharge',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const mechaSpider: BaseCharacterConfig = {
  ...mechaSpiderAlt,
  name: 'Mecha-spider A',
  maxHP: 8,
  baseMS: 2,
  powerLvl: 200,

  proficiency: {
    strength: 1,
    toughness: 1,
    intelligence: 3,
    perception: 3,
  },

  abilities: [
    'nuclearRifle',
    'neuralInjection',
    'shieldWall',
  ],

  alt: mechaSpiderAlt,
};
