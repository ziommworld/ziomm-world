import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

const drMaxAlt: BaseCharacterConfig = {
  name: 'Dr. Max B',
  icon: GameCharacterIcon.DrMax,

  maxHP: 7,
  baseMS: 3,

  alignment: GameCharacterAlignment.SZ,
  techLvl: 3,
  powerLvl: 220,

  proficiency: {
    strength: 1,
    toughness: 1,
    intelligence: 2,
    perception: 3,
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
    'advancedPhotonBlaster',
    'advancedPhotonCannon',
    'sidestep',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}

// ===================== A =====================

export const drMax: BaseCharacterConfig = {
  ...drMaxAlt,
  name: 'Dr. Max A',
  maxHP: 6,
  baseMS: 2,
  powerLvl: 200,

  proficiency: {
    strength: 1,
    toughness: 2,
    intelligence: 3,
    perception: 2,
  },

  abilities: [
    'photonBlaster',
    'photonCannon',
    'evade',
  ],

  alt: drMaxAlt,
};
