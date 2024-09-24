import {
  GameActionLib,
  GameEventLib
} from "src/app/$mechanics";

import { move, crouch, stand, free, bandage, wait, pass } from "./action.configs";
import { climb, topple, mountSentry, triggerAlarm, rejuvenate, lootChest } from "./interaction.configs";
import { wind } from "./event.configs";


export const actions: GameActionLib = {
  // actions
  move,
  crouch,
  stand,
  free,
  bandage,
  wait,
  pass,

  // abilities

  // component interactions
  climb,
  topple,
  mountSentry,
  triggerAlarm,
  rejuvenate,
  lootChest,

  // character interactions
};

export const events: GameEventLib = {
  wind,
};
