import { v4 as uuidv4 } from 'uuid';

import { GameCharacterConfig, GameCharacterKey, GameCharacterState, GameCharacterTeam, defaultAP } from '.';
import { computed, Signal } from '@angular/core';
import { characters } from './lib';
import { GameAction, GameActionKey, GameActionState } from '../$mechanics';

export class GameCharacter {
  public static instanceMap = new Map<GameCharacterKey, number>();
  private instanceIdx!: number;

  public actions!: GameAction[];
  public abilities!: GameAction[];
  public interactions!: GameAction[];

  public actionsDict!: Record<string, GameAction>;
  public abilitiesDict!: Record<string, GameAction>;
  public interactionsDict!: Record<string, GameAction>;

  // ===================== CONFIG =====================

  public get id() {
    return this.config.id;
  }

  public get idx() {
    return this.instanceIdx;
  }

  public get showIdx() {
    return GameCharacter.instanceMap.get(this.config.key)! > 1;
  }

  public get name() {
    return this.config.name;
  }

  public get player() {
    return this.config.player;
  }

  public get icon() {
    return this.config.icon;
  }

  public get proficiency() {
    return this.config.proficiency;
  }

  public get resistance() {
    return this.config.resistance;
  }

  public get maxHP() {
    return this.config.maxHP;
  }

  public get defaultMS() {
    return this.config.baseMS;
  }

  public get techLvl() {
    return this.config.techLvl;
  }

  // ===================== STATE =====================

  public $initiative = computed(() => {
    return this.$state().initiative;
  });

  public $zLevel = computed(() => {
    return this.$state().zLevel;
  });

  public $hidden = computed(() => {
    return this.$state().hidden;
  });

  public $map = computed(() => {
    return this.$state().map;
  });

  public $position = computed(() => {
    return this.$state().position;
  });

  public $bonusAP = computed(() => {
    return this.$state().bonusAP;
  });

  public $currentHP = computed(() => {
    return this.$state().currentHP;
  });

  public $currentAP = computed(() => {
    return this.$state().currentAP;
  });

  public $isCrouching = computed(() => {
    return this.$state().isCrouching;
  });

  public $isMounted = computed(() => {
    return this.$state().isMounted;
  });

  public $isDead = computed(() => {
    return this.$state().isDead;
  });

  public $bolsterCounter = computed(() => {
    return this.$state().bolsterCounter;
  });

  public $concussionCounter = computed(() => {
    return this.$state().concussionCounter;
  });

  public $bleedCounter = computed(() => {
    return this.$state().bleedCounter;
  });

  public $poisonCounter = computed(() => {
    return this.$state().poisonCounter;
  });

  public $immobilizeCounter = computed(() => {
    return this.$state().immobilizeCounter;
  });

  public $hinderCounter = computed(() => {
    return this.$state().hinderCounter;
  });

  constructor(
    public config: GameCharacterConfig,
    public $state: Signal<GameCharacterState>,
  ) {
    this.initIdx();

    this.actions = config.actions.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state().actions;
          return stateMap[config.id]
        });

        return new GameAction(config, $state);
      });

    this.actionsDict = this.actions.reduce(
      (rec, action) => {
        rec[action.id] = action;
        return rec;
      },
      {} as Record<string, GameAction>
    );

    this.abilities = config.abilities.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state().abilities;
          return stateMap[config.id]
        });

        return new GameAction(config, $state);
      });

    this.abilitiesDict = this.abilities.reduce(
      (rec, ability) => {
        rec[ability.id] = ability
        return rec;
      },
      {} as Record<string, GameAction>
    );

    this.interactions = config.interactions.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state().interactions;
          return stateMap[config.id]
        });

        return new GameAction(config, $state);
      });

    this.interactionsDict = this.interactions.reduce(
      (rec, interaction) => {
        rec[interaction.id] = interaction;
        return rec;
      },
      {} as Record<string, GameAction>
    );
  }

  public initIdx() {
    let count;

    if (GameCharacter.instanceMap.has(this.config.key)) {
      count = GameCharacter.instanceMap.get(this.config.key)!;
    } else {
      count = 0;
    }

    const idx = count + 1;
    GameCharacter.instanceMap.set(this.config.key, idx);
    this.instanceIdx = idx;
  }

  public static initConfig(
    key: GameCharacterKey,
    player?: string,
    team: GameCharacterTeam = GameCharacterTeam.Team1,
  ): GameCharacterConfig {
    const config = characters[key];

    const npcKeys: GameCharacterKey[] = [
      'ratdogBoss', 'ratdogFighter', 'ratdogHunter', 'ratdogRanger', 'ratdogVanguard',
      'marauderBoss', 'marauderArcher', 'marauderPatrol', 'marauderVanguard',
    ];
    const defaultTeam = !player && npcKeys.includes(key) ? GameCharacterTeam.Enemy : team;

    return {
      ...config,

      id: uuidv4(),
      key,
      defaultAP,
      player,
      team: team ?? defaultTeam,

      abilities: config.abilities.map(
        key => GameAction.initConfig(key)
      ),
      actions: config.actions.map(
        key => GameAction.initConfig(key)
      ),
      interactions: config.interactions.map(
        key => GameAction.initConfig(key)
      ),
    }
  }

  public static initState(
    config: GameCharacterConfig,
  ): GameCharacterState {
    return {
      initiative: -1,
      zLevel: 0,
      player: config.player,

      bonusAP: null,
      currentAP: config.defaultAP,
      currentHP: config.maxHP,

      isCrouching: false,
      isMounted: false,
      isDead: false,

      bolsterCounter: 0,
      concussionCounter: 0,

      bleedCounter: 0,
      poisonCounter: 0,

      immobilizeCounter: 0,
      hinderCounter: 0,

      actions: config.actions.reduce(
        (rec, config) => {
          const state = GameAction.initState(config);
          rec[config.id] = state;
          return rec;
        },
        {} as Record<string, GameActionState>
      ),
      abilities: config.abilities.reduce(
        (rec, config) => {
          const state = GameAction.initState(config);
          rec[config.id] = state;
          return rec;
        },
        {} as Record<string, GameActionState>
      ),
      interactions: config.interactions.reduce(
        (rec, config) => {
          const state = GameAction.initState(config);
          rec[config.id] = state;
          return rec;
        },
        {} as Record<string, GameActionState>
      ),

      stats: {
        playedAP: 0,
        healedHP: 0,
      },
    }
  }

  public hasAP$(cost: number) {
    return this.$state().currentAP >= cost;
  }

  public getMovementCost$(distance: number) {
    const cost = Math.ceil(distance / this.config.baseMS);

    return cost;
  }

  public getAction(key: GameActionKey) {
    const action = this.actions.find(action => action.config.key === key) ??
      this.abilities.find(action => action.config.key === key) ??
      this.interactions.find(action => action.config.key === key);

    if (!action) {
      throw new Error(`Action ${key} not found`);
    }

    return action;
  }
}
