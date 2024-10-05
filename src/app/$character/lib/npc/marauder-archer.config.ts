import { basicActionConfigs, characterInteractionConfigs } from "src/app/$mechanics";

import { BaseCharacterConfig, GameCharacterAlignment, GameCharacterIcon } from "../../character.models";

// ===================== B =====================

export const marauderArcher: BaseCharacterConfig = {
  name: 'Marauder archer',
  icon: GameCharacterIcon.Marauder,

  maxHP: 5,
  baseMS: 2,

  alignment: GameCharacterAlignment.PP,
  techLvl: 2,
  powerLvl: 130,

  proficiency: {
    strength: 1,
    toughness: 0,
    intelligence: 0,
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
    'longBow',
    'stunGun',
    'dodge',
  ],
  interactions: [
    ...characterInteractionConfigs
  ],
}
