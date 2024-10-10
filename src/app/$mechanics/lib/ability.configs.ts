import { BaseActionConfig, DamageType, GameActionType } from "src/app/$mechanics";

// ===================== ATTACK =====================

export const deadlyBite: BaseActionConfig = {
  name: 'Deadly bite',
  description: '',
  type: GameActionType.Attack,

  baseAP: 4,

  damage: 3,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 2,

  bleeding: 1,
};

export const advancedDeadlyBite: BaseActionConfig = {
  ...deadlyBite,
  range: 3,
};

export const crushingBlow: BaseActionConfig = {
  name: 'Crushing blow',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 3,

  hindering: 2,
};

export const advancedCrushingBlow: BaseActionConfig = {
  ...crushingBlow,
  hindering: undefined,
  bleeding: 1,
  concussive: 1,
};

export const tendonRip: BaseActionConfig = {
  name: 'Tendon rip',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 2,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 2,

  immobilizing: 2,
};

export const advancedTendonRip: BaseActionConfig = {
  ...tendonRip,
  baseAP: 2,
  immobilizing: 1,
};

export const groundSmash: BaseActionConfig = {
  name: 'Ground smash',
  description: '',
  type: GameActionType.Attack,

  baseAP: 4,

  damage: 2,
  damageType: DamageType.True,
  accuracy: 2,

  targets: 2,
  range: 3,

  concussive: 1,
};

export const advancedGroundSmash: BaseActionConfig = {
  ...groundSmash,
  baseAP: 3,
  concussive: undefined,
  hindering: 1,
};

export const dagger: BaseActionConfig = {
  name: 'Dagger',
  description: '',
  type: GameActionType.Attack,

  baseAP: 2,

  damage: 3,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 1,
  range: 2,

  immobilizing: 1,
};

export const advancedDagger: BaseActionConfig = {
  ...dagger,
  damage: 2,
  bleeding: 1,
  immobilizing: undefined,
};

export const warhammer: BaseActionConfig = {
  name: 'Warhammer',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 1,
  range: 2,

  concussive: 1,
};

export const advancedWarhammer: BaseActionConfig = {
  ...warhammer,
  concussive: 2,
};

export const toxicBlow: BaseActionConfig = {
  name: 'Toxic blow',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 1,
  range: 11,

  poisonous: 2,
};

export const advancedToxicBlow: BaseActionConfig = {
  ...toxicBlow,
  range: 13,
  damage: 4,
  poisonous: undefined,
};

export const gatlingGun: BaseActionConfig = {
  name: 'Gatling gun',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 3,
  range: 8,
};

export const advancedGatlingGun: BaseActionConfig = {
  ...gatlingGun,
  targets: 2,
  range: 7,
  damage: 4,
  bleeding: 1,
};

export const electroBite: BaseActionConfig = {
  name: 'Electro bite',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Elemental,
  accuracy: 1,

  targets: 1,
  range: 2,

  immobilizing: 1,
};

export const advancedElectroBite: BaseActionConfig = {
  ...electroBite,
  damage: 4,
  hindering: 1,
};

export const photonRifle: BaseActionConfig = {
  name: 'Photon rifle',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 4,
  damageType: DamageType.Elemental,
  accuracy: 2,

  targets: 1,
  range: 13,

  concussive: 1,
};

export const advancedPhotonRifle: BaseActionConfig = {
  ...photonRifle,
  hindering: 1,
  concussive: undefined,
};

export const photonShotgun: BaseActionConfig = {
  name: 'Photon shotgun',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 4,
  damageType: DamageType.Elemental,
  accuracy: 2,

  targets: 1,
  range: 5,

  concussive: 1,
};

export const advancedPhotonShotgun: BaseActionConfig = {
  ...photonShotgun,
  bleeding: 1,
  hindering: 1,
  concussive: undefined,
};

export const photonBlaster: BaseActionConfig = {
  name: 'Photon blaster',
  description: '',
  type: GameActionType.Attack,

  baseAP: 2,

  damage: 3,
  damageType: DamageType.Elemental,
  accuracy: 1,

  targets: 1,
  range: 5,
};

export const advancedPhotonBlaster: BaseActionConfig = {
  ...photonBlaster,
  range: 6,
  concussive: 1,
  poisonous: 1,
};

export const nuclearPistol: BaseActionConfig = {
  name: 'Nuclear pistol',
  description: '',
  type: GameActionType.Attack,

  baseAP: 2,

  damage: 4,
  damageType: DamageType.Nuclear,
  accuracy: 1,

  targets: 1,
  range: 8,
};

export const advancedNuclearPistol: BaseActionConfig = {
  ...nuclearPistol,
  range: 7,
  damage: 3,
  poisonous: 2,
};

export const nuclearRifle: BaseActionConfig = {
  name: 'Nuclear rifle',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Nuclear,
  accuracy: 2,

  targets: 1,
  range: 12,

  poisonous: 2,
};

export const advancedNuclearRifle: BaseActionConfig = {
  ...nuclearRifle,
  range: 11,
  bleeding: 1,
  poisonous: 1,
};

export const toxicFumes: BaseActionConfig = {
  name: 'Toxic fumes',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Nuclear,
  accuracy: 1,

  targets: 1,
  range: 5,

  poisonous: 1,
};

export const advancedToxicFumes: BaseActionConfig = {
  ...toxicFumes,
};

export const lightSabre: BaseActionConfig = {
  name: 'Light sabre',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 4,
  damageType: DamageType.Nuclear,
  accuracy: 1,

  targets: 1,
  range: 2,
};

export const toxicSpit: BaseActionConfig = {
  name: 'Toxic spit',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 1,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 8,

  poisonous: 1,
};

export const advancedToxicSpit: BaseActionConfig = {
  ...toxicSpit,
  range: 9,
  poisonous: 2,
};

export const toxicBite: BaseActionConfig = {
  name: 'Toxic bite',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 2,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 2,

  poisonous: 1,
};

export const advancedToxicBite: BaseActionConfig = {
  ...toxicBite,
  immobilizing: 1,
  poisonous: undefined,
};

export const bite: BaseActionConfig = {
  name: 'Bite',
  description: '',
  type: GameActionType.Attack,

  baseAP: 4,

  damage: 1,
  damageType: DamageType.True,
  accuracy: 2,

  targets: 1,
  range: 2,
};

export const advancedBite: BaseActionConfig = {
  ...bite,
  baseAP: 3,
  poisonous: 1,
};

export const toxicSpray: BaseActionConfig = {
  name: 'Toxic spray',
  description: '',
  type: GameActionType.Attack,

  baseAP: 4,

  damage: 2,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 2,
  range: 5,

  poisonous: 2,
};

export const advancedToxicSpray: BaseActionConfig = {
  ...toxicSpray,
  range: 6,
  damage: 1,
  bleeding: 1,
  poisonous: 1,
};

export const superDeadlyBite: BaseActionConfig = {
  name: 'Deadly bite',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.True,
  accuracy: 2,

  targets: 1,
  range: 2,

  poisonous: 2,
};

export const advancedSuperDeadlyBite: BaseActionConfig = {
  ...superDeadlyBite,
  hindering: 1,
  poisonous: undefined,
};

export const battleChain: BaseActionConfig = {
  name: 'Battle chain',
  description: '',
  type: GameActionType.Attack,

  baseAP: 4,

  damage: 4,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 3,
  range: 4,

  concussive: 1,
  hindering: 1,
};

export const shockBaton: BaseActionConfig = {
  name: 'Shock baton',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Elemental,
  accuracy: 1,

  targets: 1,
  range: 2,
};

export const longBow: BaseActionConfig = {
  name: 'Long bow',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 1,
  range: 11,
};

export const axe: BaseActionConfig = {
  name: 'Axe',
  description: '',
  type: GameActionType.Attack,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Physical,
  accuracy: 2,

  targets: 1,
  range: 2,

  bleeding: 1,
};

// ===================== SPECIAL =====================

export const swipe: BaseActionConfig = {
  name: 'Swipe',
  description: '',
  type: GameActionType.Special,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 2,
  range: 3,

  concussive: 1,
};

export const advancedSwipe: BaseActionConfig = {
  ...swipe,
  range: 4,
  hindering: 1,
};

export const rockToss: BaseActionConfig = {
  name: 'Rock toss',
  description: '',
  type: GameActionType.Special,

  baseAP: 2,

  damage: 2,
  damageType: DamageType.Physical,
  accuracy: 0,

  targets: 1,
  range: 6,

  concussive: 1,
};

export const advancedRockToss: BaseActionConfig = {
  ...rockToss,
  range: 5,
  damage: 3,
  immobilizing: 1,
};

export const chomp: BaseActionConfig = {
  name: 'Chomp',
  description: '',
  type: GameActionType.Special,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 2,

  poisonous: 1,
  healing: 1,
};

export const advancedChomp: BaseActionConfig = {
  ...chomp,
  healing: 2,
};

export const entangle: BaseActionConfig = {
  name: 'Entangle',
  description: '',
  type: GameActionType.Special,

  baseAP: 3,

  damage: 0,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 2,
  range: 3,

  poisonous: 1,
  immobilizing: 2,
};

export const advancedEntangle: BaseActionConfig = {
  ...entangle,
  reactive: true,
  baseAP: 2,
  poisonous: 2,
  immobilizing: 1,
};

export const sword: BaseActionConfig = {
  name: 'Sword',
  description: '',
  type: GameActionType.Special,

  baseAP: 3,

  damage: 4,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 1,
  range: 2,

  bleeding: 1,
};

export const advancedSword: BaseActionConfig = {
  ...sword,
  accuracy: 2,
  boosting: 1,
};

export const shieldSlam: BaseActionConfig = {
  name: 'Shield slam',
  description: '',
  type: GameActionType.Special,

  reactive: true,
  baseAP: 2,

  damage: 2,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 1,
  range: 2,

  concussive: 1,
};

export const advancedShieldSlam: BaseActionConfig = {
  ...shieldSlam,
  damage: 3,
  concussive: undefined,
  evasion: 1,
  freeing: 1,
};

export const neuroDart: BaseActionConfig = {
  name: 'Neuro dart',
  description: '',
  type: GameActionType.Special,

  baseAP: 3,

  damage: 1,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 5,

  poisonous: 1,
  hindering: 1,
};

export const advancedNeuroDart: BaseActionConfig = {
  ...neuroDart,
  baseAP: 2,
  poisonous: undefined,
  hindering: undefined,
  bleeding: 1,
  immobilizing: 1,
  boosting: 1,
};

export const electricNetgun: BaseActionConfig = {
  name: 'Electric netgun',
  description: '',
  type: GameActionType.Special,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Elemental,
  accuracy: 1,

  targets: 1,
  range: 5,

  hindering: 2,
};

export const advancedElectricNetgun: BaseActionConfig = {
  ...electricNetgun,
  damage: 2,
  damageType: DamageType.True,
  immobilizing: 1,
  hindering: 1,
};

export const rapidBite: BaseActionConfig = {
  name: 'Rapid bite',
  description: '',
  type: GameActionType.Special,

  baseAP: 2,

  damage: 1,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 2,

  hindering: 1,
  boosting: 1,
};

export const advancedRapidBite: BaseActionConfig = {
  ...rapidBite,
  damage: 2,
  bleeding: 1,
  hindering: undefined,
};

export const photonGranade: BaseActionConfig = {
  name: 'Photon granade',
  description: '',
  type: GameActionType.Special,

  baseAP: 2,

  damage: 2,
  damageType: DamageType.Elemental,
  accuracy: 1,

  targets: 1,
  range: 6,

  hindering: 1,
};

export const advancedPhotonGranade: BaseActionConfig = {
  ...photonGranade,
  baseAP: 3,
  damageType: DamageType.True,
  boosting: 1,
  hindering: undefined,
};

export const healingNanobots: BaseActionConfig = {
  name: 'Healing nanobots',
  description: '',
  type: GameActionType.Special,

  baseAP: 4,

  damage: 0,
  accuracy: 2,

  targets: 3,
  range: 3,

  healing: 2,
};

export const advancedHealingNanobots: BaseActionConfig = {
  ...healingNanobots,
  boosting: 1,
};

export const photonCannon: BaseActionConfig = {
  name: 'Photon cannon',
  description: '',
  type: GameActionType.Special,

  baseAP: 4,

  damage: 4,
  damageType: DamageType.Elemental,
  accuracy: 1,

  targets: 1,
  range: 10,

  bleeding: 1,
  immobilizing: 1,
};

export const advancedPhotonCannon: BaseActionConfig = {
  ...photonCannon,
  range: 9,
  poisonous: 2,
  bleeding: undefined,
};

export const blastout: BaseActionConfig = {
  name: 'Blastout',
  description: '',
  type: GameActionType.Special,

  reactive: true,
  baseAP: 1,

  targets: 0,

  evasion: 1,
  distance: 4,
  freeing: 1,
};

export const advancedBlastout: BaseActionConfig = {
  ...blastout,
  targets: 1,
  range: 4,
  accuracy: 1,
  damage: 2,
  damageType: DamageType.Nuclear,
  poisonous: 1,
  distance: 2,
  freeing: undefined,
};

export const neuralInjection: BaseActionConfig = {
  name: 'Neural injection',
  description: '',
  type: GameActionType.Special,

  baseAP: 3,

  damage: 1,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 4,

  poisonous: 2,
  immobilizing: 1,
};

export const advancedNeuralInjection: BaseActionConfig = {
  ...neuralInjection,
  range: 2,
  damage: 2,
  bleeding: 1,
  hindering: 1,
  poisonous: undefined,
  immobilizing: undefined,
};

export const lifeDrain: BaseActionConfig = {
  name: 'Life drain',
  description: '',
  type: GameActionType.Special,

  baseAP: 3,

  damage: 2,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 6,
  healing: 1,
};

export const advancedLifeDrain: BaseActionConfig = {
  ...lifeDrain,
  baseAP: 2,
  damage: 3,
};

export const propelledLunge: BaseActionConfig = {
  name: 'Propelled lunge',
  description: '',
  type: GameActionType.Special,

  reactive: true,
  baseAP: 3,

  damage: 2,
  damageType: DamageType.Nuclear,
  accuracy: 1,

  targets: 1,
  range: 2,

  distance: 5,
};

export const advancedPropelledLunge: BaseActionConfig = {
  ...propelledLunge,
  damage: 3,
  evasion: 1,
};

export const toxicBomb: BaseActionConfig = {
  name: 'Toxic bomb',
  description: '',
  type: GameActionType.Special,

  baseAP: 4,

  damage: 1,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 2,
  range: 6,

  poisonous: 2,
};

export const advancedToxicBomb: BaseActionConfig = {
  ...toxicBomb,
  damage: 2,
  poisonous: 1,
  boosting: 1,
};

export const bleedingClaw: BaseActionConfig = {
  name: 'Bleeding claw',
  description: '',
  type: GameActionType.Special,

  baseAP: 2,

  damage: 2,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 2,

  bleeding: 1,
  poisonous: 1,
};

export const advancedBleedingClaw: BaseActionConfig = {
  ...bleedingClaw,
  baseAP: 3,
  boosting: 1,
  poisonous: undefined,
};

export const dominate: BaseActionConfig = {
  name: 'Dominate',
  description: '',
  type: GameActionType.Special,

  baseAP: 2,

  accuracy: 1,

  targets: 1,
  range: 2,

  hindering: 1,
};

export const advancedDominate: BaseActionConfig = {
  ...dominate,
  baseAP: 3,
  immobilizing: 1,
};

export const jumpOut: BaseActionConfig = {
  name: 'Jump out',
  description: '',
  type: GameActionType.Special,

  reactive: true,
  baseAP: 3,

  damage: 2,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 2,
  range: 5,

  evasion: 1,
  distance: 4,
};

export const advancedJumpOut: BaseActionConfig = {
  ...jumpOut,
  baseAP: 2,
};

export const superBleedingClaw: BaseActionConfig = {
  name: 'Bleeding claw',
  description: '',
  type: GameActionType.Special,

  baseAP: 2,

  damage: 2,
  damageType: DamageType.True,
  accuracy: 1,

  targets: 1,
  range: 2,

  bleeding: 1,
  boosting: 1,
};

export const advancedSuperBleedingClaw: BaseActionConfig = {
  ...superBleedingClaw,
  reactive: true,
  evasion: 1,
  freeing: 1,
  boosting: undefined,
};

export const quickCharge: BaseActionConfig = {
  name: 'Quick charge',
  description: '',
  type: GameActionType.Special,

  baseAP: 1,
  reactive: true,

  evasion: 1,
  distance: 4,
};

export const powerPunch: BaseActionConfig = {
  name: 'Power punch',
  description: '',
  type: GameActionType.Special,

  baseAP: 2,

  damage: 1,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 1,
  range: 2,

  concussive: 1,
};

export const stunGun: BaseActionConfig = {
  name: 'Stun gun',
  description: '',
  type: GameActionType.Special,

  baseAP: 3,

  damage: 3,
  damageType: DamageType.Physical,
  accuracy: 1,

  targets: 1,
  range: 3,

  concussive: 1,
};

// ===================== DEFENSE =====================

export const block: BaseActionConfig = {
  name: 'Block',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 3,

  evasion: 1,
}

export const advancedBlock: BaseActionConfig = {
  ...block,
  evasion: 2,
}

export const shift: BaseActionConfig = {
  name: 'Shift',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 2,

  evasion: 1,
  distance: 2,
};

export const evade: BaseActionConfig = {
  name: 'Evade',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 1,

  evasion: 1,
};

export const deflect: BaseActionConfig = {
  name: 'Deflect',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 2,

  evasion: 2,
};

export const counter: BaseActionConfig = {
  name: 'Counter',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 3,

  evasion: 1,
  distance: 2,
}

export const rush: BaseActionConfig = {
  name: 'Rush',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 1,

  evasion: 1,
  distance: 4,
}

export const dodge: BaseActionConfig = {
  name: 'Dodge',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 2,

  evasion: 1,
}

export const basicDodge: BaseActionConfig = {
  ...dodge,
  baseAP: 3,
}

export const elude: BaseActionConfig = {
  name: 'Elude',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 1,

  evasion: 2,
}

export const avoid: BaseActionConfig = {
  name: 'Avoid',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 1,

  evasion: 2,
  distance: 3,
}

export const basicAvoid: BaseActionConfig = {
  ...avoid,
  distance: 2,
}

export const vanish: BaseActionConfig = {
  name: 'Vanish',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 3,

  evasion: 2,
  distance: 3,
}

export const basicVanish: BaseActionConfig = {
  ...vanish,
  distance: 2,
}

export const assault: BaseActionConfig = {
  name: 'Assault',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 2,

  evasion: 1,
  distance: 6,
}

export const basicAssault: BaseActionConfig = {
  ...assault,
  distance: 4,
}

export const sidestep: BaseActionConfig = {
  name: 'Sidestep',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 2,

  evasion: 2,
  distance: 3,
}

export const charge: BaseActionConfig = {
  name: 'Charge',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 3,

  evasion: 2,
  distance: 4,
}

export const advancedCharge: BaseActionConfig = {
  ...charge,
  distance: 5,
}

export const hide: BaseActionConfig = {
  name: 'Hide',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 1,

  evasion: 1,
  distance: 3,
}

export const basicHide: BaseActionConfig = {
  ...hide,
  distance: 2,
}

export const shieldWall: BaseActionConfig = {
  name: 'Shield wall',
  description: '',
  type: GameActionType.Defense,

  reactive: true,
  baseAP: 3,

  evasion: 2,
  distance: 0,
}
