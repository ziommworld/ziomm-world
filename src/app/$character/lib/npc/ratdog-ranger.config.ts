import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const ratdogRangerAlt: BaseCharacterConfig = {
  name: 'Ratdog ranger B',
  icon: GameCharacterIcon.Ratdog,

  maxHP: 4,
  baseMS: 2,

  alignment: GameCharacterAlignment.AA,
  techLvl: 1,
  powerLvl: 165,

  proficiency: {
    strength: 0,
    toughness: 2,
    intelligence: 0,
    perception: 0,
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
    'advancedToxicSpit',
    'advancedToxicBomb',
    'shift',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const ratdogRanger: BaseCharacterConfig = {
  ...ratdogRangerAlt,
  name: 'Ratdog ranger A',
  powerLvl: 150,

  proficiency: {
    strength: 0,
    toughness: 1,
    intelligence: 0,
    perception: 1,
  },

  abilities: [
    'toxicSpit',
    'toxicBomb',
    'dodge',
  ],

  alt: ratdogRangerAlt,
};
