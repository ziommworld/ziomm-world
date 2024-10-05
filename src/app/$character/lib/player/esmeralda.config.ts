import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const esmeraldaAlt: BaseCharacterConfig = {
  name: 'Esmeralda B',
  icon: GameCharacterIcon.Esmeralda,

  maxHP: 6,
  baseMS: 3,

  alignment: GameCharacterAlignment.SP,
  techLvl: 2,
  powerLvl: 220,

  proficiency: {
    strength: 1,
    toughness: 1,
    intelligence: 1,
    perception: 2,
  },

  resistance: {
    physical: 1,
    elemental: 0,
    nuclear: 1,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedToxicBlow',
    'advancedNeuroDart',
    'sidestep',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const esmeralda: BaseCharacterConfig = {
  ...esmeraldaAlt,
  name: 'Esmeralda A',
  maxHP: 7,
  powerLvl: 200,

  proficiency: {
    strength: 1,
    toughness: 2,
    intelligence: 2,
    perception: 2,
  },

  abilities: [
    'toxicBlow',
    'neuroDart',
    'elude',
  ],

  alt: esmeraldaAlt,
};
