import { CharacterConfig, CharacterState, ActionMap } from ".";


export const roundAP: number = 6;

export function getDefaultCharacterState(config: CharacterConfig): CharacterState {
  return {
    initiative: null,
    player: null,

    currentAP: roundAP,
    currentHP: config.maxHP,

    isCrouching: false,
    isDead: false,
    isMounted: false,

    bolsterCounter: 0,
    concussionCounter: 0,

    bleedCounter: 0,
    poisonCounter: 0,

    immobilizeCounter: 0,
    hinderCounter: 0,
  }
};

export const actionMap: ActionMap = {
  move: {
    name: 'Move',
    description: 'Move distance points (DP) equal to your Movement speed (MS)',
    baseAP: 1,
  },
  crouch: {
    name: 'Crouch',
    description: 'see crouching state for description',
    baseAP: 1,
  },
  stand: {
    name: 'Stand up',
    description: 'Usable only when crouching or after being paralyzed to return to normal state.',
    baseAP: 1,
  },
  free: {
    name: 'Free up',
    description: 'NAT 0+ check to remove 1 stack of Immobilizing or Hindering or Paralysis',
    baseAP: 2,
  },
  bandage: {
    name: 'Bandage',
    description: 'Removes Bleeding state',
    baseAP: 3,
  },
  wait: {
    name: 'Wait',
    description: 'At the start of next round, gain +1 Maximum AP for the round.',
    baseAP: 3,
  },
  pass: {
    name: 'Pass',
    description: 'At the start of next round, gain +2 Maximum AP for the round.',
    baseAP: 6,
  },
};
