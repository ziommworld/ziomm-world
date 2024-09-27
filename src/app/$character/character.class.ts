import { v4 as uuidv4 } from 'uuid';

import { GameCharacterConfig, GameCharacterKey, GameCharacterState, roundAP } from '.';
import { computed, Signal } from '@angular/core';
import { characters } from './lib';
import { GameAction, GameActionState } from '../$mechanics';


export class GameCharacter {

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
      // TODO set position according to scenario and initial map
      position: { x: 0, y: 0 },
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
