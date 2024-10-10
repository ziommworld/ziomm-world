import { BaseActionConfig, GameActionType } from "src/app/$mechanics";

/**
 * compontent interactions
 */

export const climb: BaseActionConfig = {
  name: 'Climb up',
  interactive: true,
  description: 'DEX 2+ check, Success = +1 accuracy and bypasses half-covers (while occupying the rock unit tiles), Failure = nothing happens',
  baseAP: 3,
  type: GameActionType.Utility,
};

export const topple: BaseActionConfig = {
  name: 'Topple',
  interactive: true,
  description: 'STR 2+ check, Success = remove 1 tile of rock, Failure = nothing happens',
  baseAP: 3,
  type: GameActionType.Utility,
};

export const mountSentry: BaseActionConfig = {
  name: 'Operate sentries',
  interactive: true,
  description: 'PER 2+ check, Success = open the canalization hatch for 1 round, Failure = nothing happens',
  baseAP: 3,
  type: GameActionType.Utility,
};

export const triggerAlarm: BaseActionConfig = {
  name: 'Sound the alarm',
  interactive: true,
  description: 'auto-succeed, Alarm all marauders',
  baseAP: 3,
  type: GameActionType.Utility,
};

export const rejuvenate: BaseActionConfig = {
  name: 'Sound the alarm',
  interactive: true,
  description: 'auto-succeed, restore 2 HP, Removes Bleeding',
  baseAP: 6,
  type: GameActionType.Utility,
};

export const lootChest: BaseActionConfig = {
  name: 'Sound the alarm',
  interactive: true,
  description: "STR 2+, Success = Roll a D6 and receive the following item: \
      1 = nothing \
      2 = Stim pack \
        2AP to use , gain 2xbolster for 3 rounds \
      3 = Flash grenade \
        3AP, Range = 6, AOE = 3, ACC = 1, Hinder x2 \
      4 = Armor padding \
        2AP to use, Gain +1 to physical resistance \
      5 = Healing injection \
        2AP to use, gain 3 HP \
      6 = Rocket launcher \
        4AP, Range = 10, AOE = 3, ACC = 2, DMG = 5, DMG Type = P \
      Failure = nothing happens",
  baseAP: 3,
  type: GameActionType.Utility,
};

/**
 * character interactions
 */

/**
 * special interactions
 */
export const placeCharacter: BaseActionConfig = {
  name: 'Place Character',
  interactive: true,
  baseAP: 0,
  type: GameActionType.Environment,
};

export const displaceCharacter: BaseActionConfig = {
  name: 'Displace Character',
  interactive: true,
  baseAP: 0,
  type: GameActionType.Environment,
};
