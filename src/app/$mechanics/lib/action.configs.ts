import { BaseActionConfig, GameActionType } from "src/app/$mechanics";


export const move: BaseActionConfig = {
  name: 'Move',
  description: 'Move distance points (DP) equal to your Movement speed (MS)',
  type: GameActionType.Utility,
  baseAP: 1,
};

export const crouch: BaseActionConfig = {
  name: 'Crouch',
  description: 'see crouching state for description',
  type: GameActionType.Utility,
  baseAP: 1,
};

export const stand: BaseActionConfig = {
  name: 'Stand up',
  description: 'Usable only when crouching or after being paralyzed to return to normal state.',
  type: GameActionType.Utility,
  baseAP: 1,
};

export const free: BaseActionConfig = {
  name: 'Free up',
  description: 'NAT 0+ check to remove 1 stack of Immobilizing or Hindering or Paralysis',
  type: GameActionType.Utility,
  baseAP: 2,
};

export const bandage: BaseActionConfig = {
  name: 'Bandage',
  description: 'Removes Bleeding state',
  type: GameActionType.Utility,
  baseAP: 3,
};

export const wait: BaseActionConfig = {
  name: 'Wait',
  description: 'At the start of next round, gain +1 Maximum AP for the round.',
  type: GameActionType.Utility,
  baseAP: 3,
};

export const pass: BaseActionConfig = {
  name: 'Pass',
  description: 'At the start of next round, gain +2 Maximum AP for the round.',
  type: GameActionType.Utility,
  baseAP: 6,
};
