import { ActionModality, DamageType } from "../$mechanics";

export interface CharacterConfig {
  name: string;
  npc: boolean;
  powerLvl: number;

  maxHP: number;
  defaultMS: number;
  techLvl: number;

  proficiency: CharacterProficiencies;
  resistance: CharacterResistances;

  actions: CharacterAction[];
}

export interface CharacterStats {
  currentAP: number;
  currentHP: number;
  initiative: number;
}

export interface CharacterProficiencies {
  strength: number;
  dexterity: number;
  toughness: number;
  intelligence: number;
  perception: number;
}

export interface CharacterResistances {
  physical: number;
  elemental: number;
  nuclear: number;
}

export interface CharacterState {
  isCrouching: boolean;
  // isMounted: boolean;

  bolsterCounter: number;
  bleedCounter: number;
  poisonCounter: number;
  concussionCounter: number;
  immobilizeCounter: number;
  hinderCounter: number;
}

export interface CharacterAction {
  key: string;
  name: string;
  description: string;
  costAP: number;

  usageCount?: number;
  cooldown?: number;
  duration?: number;

  targets?: number;
  range?: number;
  accuracy?: number;
  damage?: number;
  damageType?: DamageType;
  modalities?: ActionModality[];
  evasion?: number;
  distance?: number;

  reactive?: boolean;
  // interactive?: boolean;

  bleeding?: boolean;
  concussive?: boolean;
  poisonous?: boolean;
  immobilizing?: boolean;
  hindering?: boolean;
  boosting?: boolean;
  healing?: boolean;
  freeing?: boolean;
}
