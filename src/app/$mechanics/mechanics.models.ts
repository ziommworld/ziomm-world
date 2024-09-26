// ===================== GLOBAL =====================

export interface GameMapCoordinate {
  x: number;
  y: number;
}

export type GameMapDirection = 'north' | 'east' | 'south' | 'west';

// ===================== CONFIG =====================

export enum DamageType {
  Physical,
  Elemental,
  Nuclear,
  True,
};

export enum GameActionModality {
  Quick,
  Steady,
  Charged,
}

export interface BaseActionConfig {
  name: string;
  description?: string;

  baseAP: number;
  modalities?: GameActionModality[];

  reactive?: boolean;
  interactive?: boolean;

  cooldown?: number; // turns
  duration?: number; // turns
  maxUsages?: number;

  damage?: number;
  damageType?: DamageType;
  accuracy?: number;
  // armorPenetration?: number;

  range?: number;
  // aoe?: number;
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

export interface GameActionConfig extends BaseActionConfig {
  id: string;
  key: string;
}

export interface BaseEventConfig {
  name: string;
  description?: string;

  reactive?: boolean;
  interactive?: boolean;

  cooldown?: number; // rounds
  duration?: number; // rounds

  damage?: number;
  damageType?: DamageType;
  armorPenetration?: number;

  range?: number;
  aoe?: number;
  targets?: number;

  concussive?: number;
  boosting?: number;

  bleeding?: number;
  poisonous?: number;
  healing?: number;

  hindering?: number;
  immobilizing?: number;
  freeing?: number;
}

export interface GameEventConfig extends BaseEventConfig {
  id: string;
  key: string;
}

// ===================== STATE =====================

export interface GameActionStats {
  usages: number;
}

export interface GameEventStats {
  occurances: number;
}

export interface GameActionState {
  cooldownCounter: number;

  stats: GameActionStats;
}

export interface GameEventState {
  cooldownCounter: number;

  stats: GameEventStats;
}

// ===================== LIBRARY =====================

export type GameActionKey =
  // actions
  'move' |
  'crouch' |
  'stand' |
  'free' |
  'bandage' |
  'wait' |
  'pass' |

  // abilities

  // component interactions
  'climb' |
  'topple' |
  'mountSentry' |
  'triggerAlarm' |
  'rejuvenate' |
  'lootChest'

  // character interactions
  ;

export type GameEventKey =
  'wind';
// 'fog' |
// 'snow' |

export type GameActionLib = Record<GameActionKey, BaseActionConfig>;

export type GameEventLib = Record<GameEventKey, BaseEventConfig>;
