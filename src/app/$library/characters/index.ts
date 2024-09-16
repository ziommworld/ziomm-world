import { Character, CharacterConfig } from "src/app/$character"


const config: CharacterConfig = {
  maxHP: 10,
  actions: [
    {
      key: 'attack',
      name: 'Attack',
      range: 1,
      damage: 2,
      costAP: 2,
      description: 'Deal 2 damage to an enemy',
    },
    {
      key: 'heal',
      name: 'Heal',
      costAP: 2,
      description: 'Heal an ally for 2 HP',
      range: 1,
    },
  ],
  defaultMS: 6,
  name: 'Gandalf',
  npc: true,
  powerLvl: 10,
  proficiency: {
    strength: 10,
    intelligence: 10,
    perception: 10,
    toughness: 10,
  },
  resistance: {
    elemental: 0,
    physical: 0,
    nuclear: 0,
  },
  techLvl: 10,
};

export const gandalf = new Character('Gandalf', config);
export const frodo = new Character('Frodo', config);
export const sam = new Character('Sam', config);
export const aragorn = new Character('Aragorn', config);
