import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const ratdogVanguardAlt: BaseCharacterConfig = {
  name: 'Ratdog vanguard B',
  icon: GameCharacterIcon.Ratdog,

  maxHP: 6,
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
    elemental: 2,
    nuclear: 3,
  },

  actions: [
    ...basicActionConfigs
  ],
  abilities: [
    'advancedBite',
    'advancedDominate',
    'basicDodge',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const ratdogVanguard: BaseCharacterConfig = {
  ...ratdogVanguardAlt,
  name: 'Ratdog vanguard A',
  maxHP: 5,
  powerLvl: 150,

  proficiency: {
    strength: 1,
    toughness: 2,
    intelligence: 0,
    perception: 0,
  },

  abilities: [
    'bite',
    'dominate',
    'block',
  ],

  alt: ratdogVanguardAlt,
};
