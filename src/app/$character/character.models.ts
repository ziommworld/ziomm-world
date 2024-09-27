import { GameActionConfig, GameActionKey, GameActionState, GameMapCoordinate } from "../$mechanics";

// ===================== DRAFT =====================

export interface GameCharacterDraft {
  character: GameCharacterKey;
  player: string;
}

// ===================== CONFIG =====================

export interface GameCharacterProficiencies {
  strength: number;
  toughness: number;
  intelligence: number;
  perception: number;
}

export interface GameCharacterResistances {
  physical: number;
  elemental: number;
  nuclear: number;
}

export enum GameCharacterIcon {
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

export interface BaseCharacterConfig {
  name: string;
  icon: GameCharacterIcon;
  player?: string; // npc if undefined

  maxHP: number;
  baseMS: number;

  techLvl: number;
  powerLvl: number;

  proficiency: GameCharacterProficiencies;
  resistance: GameCharacterResistances;

  abilities: GameActionKey[];
  actions: GameActionKey[];
  interactions: GameActionKey[];

  alt?: BaseCharacterConfig;
}

export interface GameCharacterConfig extends Omit<BaseCharacterConfig, 'abilities' | 'actions' | 'interactions'> {
  id: string;
  key: string;

  abilities: GameActionConfig[];
  actions: GameActionConfig[];
  interactions: GameActionConfig[];
}

// ===================== STATE =====================

export interface GameCharacterStats {
  playedAP: number;
  healedHP: number;
}

export interface GameCharacterState {
  initiative: number;
  position: GameMapCoordinate;
  player?: string;

  currentAP: number;
  currentHP: number;

  isCrouching: boolean;
  isDead: boolean;
  isMounted: boolean;

  bolsterCounter: number;
  concussionCounter: number;

  bleedCounter: number;
  poisonCounter: number;

  immobilizeCounter: number;
  hinderCounter: number;

  actions: Record<string, GameActionState>;
  abilities: Record<string, GameActionState>;
  interactions: Record<string, GameActionState>;

  stats: GameCharacterStats;
}

// ===================== LIBRARY =====================

export type GameCharacterKey =
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

// key -> character config
export type GameCharacterLib = Record<GameCharacterKey, BaseCharacterConfig>;
