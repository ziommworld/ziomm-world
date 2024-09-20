import { ActionModality, DamageType } from "../$mechanics";


export interface CharacterProficiencies {
  strength: number;
  toughness: number;
  intelligence: number;
  perception: number;
}

export interface CharacterResistances {
  physical: number;
  elemental: number;
  nuclear: number;
}

// TODO extract to dedicated entity as soon as we start tracking action state
export interface CharacterAction {
  name: string;
  description?: string;
  baseAP: number;
  modalities?: ActionModality[];

  reactive?: boolean;
  // interactive?: boolean; -> deployed_code_account

  // usageCount?: number;
  // cooldown?: number;
  // duration?: number;

  damage?: number;
  damageType?: DamageType;
  accuracy?: number;
  armorPenetration?: number;

  range?: number;
  aoe?: number;
  targets?: number;

  evasion?: number;
  distance?: number;

  concussive?: number;
  boosting?: number;

  bleeding?: number;
  poisonous?: number;
  healing?: number;

  hindering?: number;
  immobilizing?: number;
  freeing?: number;
}

export enum CharacterIcon {
  Goblin = 'surfing',
  Spiderman = 'sports_handball',
  Legolas = 'snowboarding',
  Frodo = 'taunt',
  Hitler = 'hail',
  Xavier = 'accessible_forward',
  Gandalf = 'elderly',
  Yoda = 'hiking',
  Neo = 'sports_martial_arts',
  Flash = 'sprint',
  MaxMax = 'directions_bike',

  Bug = 'bug_report',
  Beetle = 'pest_control',
  Rabbit = 'cruelty_free',
  Raven = 'raven',
  R2D2 = 'adb',
  C3PO = 'android',
}

export interface CharacterConfig {
  name: string;
  icon: string;
  npc: boolean;

  maxHP: number;
  baseMS: number;

  techLvl: number;
  powerLvl: number;

  proficiency: CharacterProficiencies;
  resistance: CharacterResistances;

  actions: string[]; // keys
}

export interface CharacterStats {
  playedAP: number;
  healedHP: number;
}

export interface CharacterState {
  initiative: number | null;
  player: string | null;

  stats: CharacterStats;

  currentAP: number;
  currentHP: number;

  isCrouching: boolean;
  isDead: boolean; // -> skull
  isMounted: boolean; // -> body_system

  bolsterCounter: number;
  concussionCounter: number;

  bleedCounter: number;
  poisonCounter: number;

  immobilizeCounter: number;
  hinderCounter: number;
}

export type CharacterKey =
  // 'goblin' |
  // 'spiderman' |
  // 'legolas' |
  // 'frodo' |
  // 'hitler' |
  // 'xavier' |
  // 'gandalf' |
  // 'yoda' |
  'neo' |
  // 'flash' |
  // 'madmax' |

  // 'bug' |
  'beetle';
  // 'rabbit' |
  // 'raven' |
  // 'r2d2' |
  // 'c3po';

export type ActionKey =
  'move' |
  'crouch' |
  'stand' |
  'free' |
  'bandage' |
  'wait' |
  'pass';

export type ActionMap = Record<ActionKey, CharacterAction>;

// key -> character config
export type CharacterLibrary = Record<CharacterKey, CharacterConfig>;
