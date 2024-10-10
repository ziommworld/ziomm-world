import { MicroTileConfig } from "../$map";

// ===================== CONFIG =====================

export interface ActionMenuItem {
  key: GameActionKey;
  label: string;
  tile: MicroTileConfig;
  icon?: string;
  target?: string;

  subItems?: ActionMenuSubItem[];
}

export interface ActionMenuSubItem {
  key: string;
  label: string;
  icon?: string;
}

export enum DamageType {
  Physical = 'physical',
  Elemental = 'elemental',
  Nuclear = 'nuclear',
  True = 'true',
};

export enum GameActionType {
  Environment,
  Attack,
  Defense,
  Special,
  Utility,
}

export enum GameActionModality {
  Quick,
  Steady,
  Charged,
}

export interface BaseActionConfig {
  name: string;
  description?: string;
  type: GameActionType;

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

  range?: number;
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
  key: GameActionKey;
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
  key: GameEventKey;
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

  // attack abilities
  'deadlyBite' |
  'advancedDeadlyBite' |
  'crushingBlow' |
  'advancedCrushingBlow' |
  'tendonRip' |
  'advancedTendonRip' |
  'groundSmash' |
  'advancedGroundSmash' |
  'dagger' |
  'advancedDagger' |
  'warhammer' |
  'advancedWarhammer' |
  'toxicBlow' |
  'advancedToxicBlow' |
  'gatlingGun' |
  'advancedGatlingGun' |
  'electroBite' |
  'advancedElectroBite' |
  'photonRifle' |
  'advancedPhotonRifle' |
  'photonShotgun' |
  'advancedPhotonShotgun' |
  'photonBlaster' |
  'advancedPhotonBlaster' |
  'nuclearPistol' |
  'advancedNuclearPistol' |
  'nuclearRifle' |
  'advancedNuclearRifle' |
  'toxicFumes' |
  'advancedToxicFumes' |
  'lightSabre' |
  'toxicSpit' |
  'advancedToxicSpit' |
  'toxicBite' |
  'advancedToxicBite' |
  'bite' |
  'advancedBite' |
  'toxicSpray' |
  'advancedToxicSpray' |
  'superDeadlyBite' |
  'advancedSuperDeadlyBite' |
  'battleChain' |
  'shockBaton' |
  'longBow' |
  'axe' |

  // special abilities
  'swipe' |
  'advancedSwipe' |
  'rockToss' |
  'advancedRockToss' |
  'chomp' |
  'advancedChomp' |
  'entangle' |
  'advancedEntangle' |
  'sword' |
  'advancedSword' |
  'shieldSlam' |
  'advancedShieldSlam' |
  'neuroDart' |
  'advancedNeuroDart' |
  'electricNetgun' |
  'advancedElectricNetgun' |
  'rapidBite' |
  'advancedRapidBite' |
  'photonGranade' |
  'advancedPhotonGranade' |
  'healingNanobots' |
  'advancedHealingNanobots' |
  'photonCannon' |
  'advancedPhotonCannon' |
  'blastout' |
  'advancedBlastout' |
  'neuralInjection' |
  'advancedNeuralInjection' |
  'lifeDrain' |
  'advancedLifeDrain' |
  'propelledLunge' |
  'advancedPropelledLunge' |
  'toxicBomb' |
  'advancedToxicBomb' |
  'bleedingClaw' |
  'advancedBleedingClaw' |
  'dominate' |
  'advancedDominate' |
  'jumpOut' |
  'advancedJumpOut' |
  'superBleedingClaw' |
  'advancedSuperBleedingClaw' |
  'quickCharge' |
  'powerPunch' |
  'stunGun' |

  // defense abilities
  'block' |
  'shift' |
  'evade' |
  'deflect' |
  'counter' |
  'rush' |
  'dodge' |
  'elude' |
  'avoid' |
  'vanish' |
  'assault' |
  'sidestep' |
  'charge' |
  'hide' |
  'basicHide' |
  'basicAvoid' |
  'advancedCharge' |
  'shieldWall' |
  'basicAssault' |
  'basicVanish' |
  'basicDodge' |
  'advancedBlock' |

  // component interactions
  'climb' |
  'topple' |
  'mountSentry' |
  'triggerAlarm' |
  'rejuvenate' |
  'lootChest' |

  // character interactions

  // special interactions
  'placeCharacter' |
  'displaceCharacter'
  ;

export type GameEventKey =
  'wind';
// 'fog' |
// 'snow' |

export type GameActionLib = Record<GameActionKey, BaseActionConfig>;

export type GameEventLib = Record<GameEventKey, BaseEventConfig>;
