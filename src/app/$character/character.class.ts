import { v4 as uuidv4 } from 'uuid';

import { GameCharacterConfig, GameCharacterKey, GameCharacterState, roundAP } from '.';
import { computed, Signal } from '@angular/core';
import { characters } from './lib';
import { GameAction, GameActionState } from '../$mechanics';


export class GameCharacter {
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

  public $currentHP = computed(() => {
    return this.$state().currentHP;
  });

  public $currentAP = computed(() => {
    return this.$state().currentAP;
  });

  constructor(
    public config: GameCharacterConfig,
    public $state: Signal<GameCharacterState>,
  ) {
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

  public static initConfig(
    key: GameCharacterKey,
    player?: string
  ): GameCharacterConfig {
    const config = characters[key];

    return {
      ...config,

      id: uuidv4(),
      key,
      player,

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
      // TODO set position according to scenario and initial map
      player: config.player,

      currentAP: roundAP,
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
}
