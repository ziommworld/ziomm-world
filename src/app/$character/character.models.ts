import { GameMapCoordinate } from "../$map";
import { GameActionConfig, GameActionKey, GameActionState } from "../$mechanics";

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
  MechaSpider = 'pest_control',
  Adam3000 = 'adb',
  XAVR = 'accessible_forward',
  ElectroWolf = 'bolt',
  Ratbeast = 'pest_control_rodent',
  Bango = 'boy',
  Rafaela = 'sports_handball',
  Nathaniel = 'hail',
  HumanPlantHybrid = 'park',
  DrMax = 'directions_bike',
  DonPablo = 'nordic_walking',
  Francisko = 'engineering',
  Jackie = 'kitesurfing',
  Esmeralda = 'elderly_woman',
  Jhwack = 'snowshoeing',
  UrsusArctos = 'pets',

  Marauder = 'accessibility',
  Ratdog = 'mouse',
}

export enum GameCharacterAlignment {
  'AA' = 'A-a',
  'AP' = 'A-p',
  'AS' = 'A-s',
  'AZ' = 'A-z',

  'PA' = 'P-a',
  'PP' = 'P-p',
  'PS' = 'P-s',
  'PZ' = 'P-z',

  'SA' = 'S-a',
  'SP' = 'S-p',
  'SS' = 'S-s',
  'SZ' = 'S-z',

  'ZA' = 'Z-a',
  'ZP' = 'Z-p',
  'ZS' = 'Z-s',
  'ZZ' = 'Z-z',
}

export enum GameCharacterTeam {
  Team1 = 'team1',
  Team2 = 'team2',
  Enemy = 'enemy',
  Neutral = 'npc',
}

export interface BaseCharacterConfig {
  name: string;
  icon: GameCharacterIcon;
  iconBadge?: string;

  maxHP: number;
  baseMS: number;

  alignment: GameCharacterAlignment;
  techLvl: number;
  powerLvl: number;

  // ? initiative
  // ? armor?

  proficiency: GameCharacterProficiencies;
  resistance: GameCharacterResistances;

  abilities: GameActionKey[];
  actions: GameActionKey[];
  interactions: GameActionKey[];

  alt?: BaseCharacterConfig;
}

export interface GameCharacterConfig extends Omit<BaseCharacterConfig, 'abilities' | 'actions' | 'interactions' | 'alt'> {
  id: string;
  key: GameCharacterKey;

  player?: string; // npc if undefined
  team: GameCharacterTeam;

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
  position?: GameMapCoordinate;
  zLevel: number;
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
  'adam3000' |
  'bango' |
  'donPablo' |
  'drMax' |
  'electroWolf' |
  'esmeralda' |
  'francisko' |
  'humanPlantHybrid' |
  'jackie' |
  'jhwack' |
  'mechaSpider' |
  'nathaniel' |
  'rafaela' |
  'ratbeast' |
  'ursusArctos' |
  'xavr' |

  'marauderArcher' |
  'marauderBoss' |
  'marauderPatrol' |
  'marauderVanguard' |
  'ratdogBoss' |
  'ratdogFighter' |
  'ratdogHunter' |
  'ratdogRanger' |
  'ratdogVanguard'
  ;

// key -> character config
export type GameCharacterLib = Record<GameCharacterKey, BaseCharacterConfig>;
