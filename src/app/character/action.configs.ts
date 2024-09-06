import { CharacterAction } from "./character.models";

/**
 * basic abilities
 */
export const actions: CharacterAction[] = [
  {
    key: 'move',
    name: 'Move',
    description: 'Move distance points (DP) equal to your Movement speed (MS)',
    costAP: 1,
  },
  {
    key: 'crouch',
    name: 'Crouch',
    description: 'see crouching state for description',
    costAP: 1,
  },
  {
    key: 'stand',
    name: 'Stand-up',
    description: 'Usable only when crouching or after being paralyzed to return to normal state.',
    costAP: 1,
  },
  {
    key: 'bandage',
    name: 'Bandage',
    description: 'Removes Bleeding state',
    costAP: 3,
  },
  {
    key: 'free',
    name: 'Free-up',
    description: 'NAT 0+ check to remove 1 stack of Immobilizing or Hindering or Paralysis',
    costAP: 2,
  },
  {
    key: 'bandage',
    name: 'Bandage',
    description: 'Removes Bleeding state',
    costAP: 3,
  },
  {
    key: 'wait',
    name: 'Wait',
    description: 'At the start of next round, gain +1 Maximum AP for the round.',
    costAP: 3,
  },
  {
    key: 'pass',
    name: 'Pass',
    description: 'At the start of next round, gain +2 Maximum AP for the round.',
    costAP: 6,
  },
];

/**
 * custom actions
 */
export const abilities: CharacterAction[] = [

];

/**
 * environmental interactions
 */
export const interactions: CharacterAction[] = [

];
