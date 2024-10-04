import { BaseActionConfig } from "src/app/$mechanics";

/**
 * compontent interactions
 */

export const climb: BaseActionConfig = {
  name: 'Climb up',
  description: 'DEX 2+ check, Success = +1 accuracy and bypasses half-covers (while occupying the rock unit tiles), Failure = nothing happens',
  baseAP: 3,
};

export const topple: BaseActionConfig = {
  name: 'Topple',
  description: 'STR 2+ check, Success = remove 1 tile of rock, Failure = nothing happens',
  baseAP: 3,
};

export const mountSentry: BaseActionConfig = {
  name: 'Operate sentries',
  description: 'PER 2+ check, Success = open the canalization hatch for 1 round, Failure = nothing happens',
  baseAP: 3,
};

export const triggerAlarm: BaseActionConfig = {
  name: 'Sound the alarm',
  description: 'auto-succeed, Alarm all marauders',
  baseAP: 3,
};

export const rejuvenate: BaseActionConfig = {
  name: 'Sound the alarm',
  description: 'auto-succeed, restore 2 HP, Removes Bleeding',
  baseAP: 6,
};

export const lootChest: BaseActionConfig = {
  name: 'Sound the alarm',
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
};

/**
 * character interactions
 */

/**
 * special interactions
 */
export const placeCharacter: BaseActionConfig = {
  name: 'Place Character',
  baseAP: 0,
};

export const displaceCharacter: BaseActionConfig = {
  name: 'Displace Character',
  baseAP: 0,
};
