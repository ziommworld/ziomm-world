import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const jackieAlt: BaseCharacterConfig = {
  name: 'Jackie B',
  icon: GameCharacterIcon.Jackie,

  maxHP: 7,
  baseMS: 3,

  alignment: GameCharacterAlignment.PZ,
  techLvl: 4,
  powerLvl: 220,

  proficiency: {
    strength: 0,
    toughness: 0,
    intelligence: 3,
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
    'advancedNuclearPistol',
    'advancedBlastout',
    'deflect',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const jackie: BaseCharacterConfig = {
  ...jackieAlt,
  name: 'Jackie A',
  maxHP: 6,
  baseMS: 2,
  powerLvl: 200,

  proficiency: {
    strength: 1,
    toughness: 0,
    intelligence: 2,
    perception: 3,
  },

  abilities: [
    'nuclearPistol',
    'blastout',
    'rush',
  ],

  alt: jackieAlt,
};
