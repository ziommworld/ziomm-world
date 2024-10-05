import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const rafaelaAlt: BaseCharacterConfig = {
  name: 'Rafaela B',
  icon: GameCharacterIcon.Rafaela,

  maxHP: 7,
  baseMS: 2,

  alignment: GameCharacterAlignment.PA,
  techLvl: 3,
  powerLvl: 220,

  proficiency: {
    strength: 1,
    toughness: 1,
    intelligence: 2,
    perception: 2,
  },

  resistance: {
    physical: 2,
    elemental: 1,
    nuclear: 1,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedPhotonRifle',
    'advancedPhotonGranade',
    'hide',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const rafaela: BaseCharacterConfig = {
  ...rafaelaAlt,
  name: 'Rafaela A',
  maxHP: 6,
  powerLvl: 200,

  proficiency: {
    strength: 0,
    toughness: 1,
    intelligence: 3,
    perception: 2,
  },

  abilities: [
    'photonRifle',
    'photonGranade',
    'dodge',
  ],

  alt: rafaelaAlt,
};
