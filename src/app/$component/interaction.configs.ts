import { CharacterAction } from "../$character";

/**
 * environmental interactions
 */
export const interactions: CharacterAction[] = [
  {
    key: 'climb',
    name: 'Climb up',
    description: 'DEX 2+ check, Success = +1 accuracy and bypasses half-covers (while occupying the rock unit tiles), Failure = nothing happens',
    costAP: 3,
  },
  {
    key: 'topple',
    name: 'Topple',
    description: 'STR 2+ check, Success = remove 1 tile of rock, Failure = nothing happens',
    costAP: 3,
  },
  {
    key: 'mount-sentry',
    name: 'Operate sentries',
    description: 'PER 2+ check, Success = open the canalization hatch for 1 round, Failure = nothing happens',
    costAP: 3,
  },
  {
    key: 'trigger-alarm',
    name: 'Sound the alarm',
    description: 'auto-succeed, Alarm all marauders',
    costAP: 3,
  },
  {
    key: 'rejuvenate',
    name: 'Sound the alarm',
    description: 'auto-succeed, restore 2 HP, Removes Bleeding',
    costAP: 6,
  },
  {
    key: 'loot-chest',
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
    costAP: 3,
  },
];
