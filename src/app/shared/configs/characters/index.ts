import { CharacterIcon, CharacterLibrary } from "src/app/$character";


export const characters: CharacterLibrary = {
  neo: {
    name: 'Neo',
    icon: CharacterIcon.Neo,
    npc: false,

    maxHP: 10,
    baseMS: 10,

    techLvl: 1,
    powerLvl: 14,

    proficiency: {
      intelligence: 1,
      perception: 2,
      strength: 3,
      toughness: 4
    },

    resistance: {
      physical: 3,
      elemental: 1,
      nuclear: 2,
    },

    actions: [],
  },
  beetle: {
    name: 'Beetle',
    icon: CharacterIcon.Beetle,
    npc: false,

    maxHP: 10,
    baseMS: 10,

    techLvl: 1,
    powerLvl: 14,

    proficiency: {
      intelligence: 1,
      perception: 2,
      strength: 3,
      toughness: 4
    },

    resistance: {
      physical: 3,
      elemental: 1,
      nuclear: 2,
    },

    actions: [],
  }
};
