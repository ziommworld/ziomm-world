import { v4 as uuidv4 } from 'uuid';
import { Signal } from "@angular/core";

import { GameActionConfig, GameActionKey, GameActionState } from ".";
import { actions } from "./lib";


export class GameAction {
  // ===================== CONFIG =====================

  public get id() {
    return this.config.id;
  }

  public get key() {
    return this.config.key;
  }

  public get name() {
    return this.config.name;
  }

  public get description() {
    return this.config.description;
  }

  public get type() {
    return this.config.type;
  }

  public get reactive() {
    return this.config.reactive;
  }

  public get interactive() {
    return this.config.interactive;
  }

  // ===================== ATTRIBUTES =====================

  public get damage() {
    return this.config.damage;
  }

  public get damageType() {
    return this.config.damageType;
  }

  public get accuracy() {
    return this.config.accuracy;
  }

  public get range() {
    return this.config.range;
  }

  public get targets() {
    return this.config.targets;
  }

  public get boosting() {
    return this.config.boosting;
  }

  public get concussive() {
    return this.config.concussive;
  }

  public get evasion() {
    return this.config.evasion;
  }

  public get distance() {
    return this.config.distance;
  }

  public get bleeding() {
    return this.config.bleeding;
  }

  public get poisonous() {
    return this.config.poisonous;
  }

  public get healing() {
    return this.config.healing;
  }

  public get hindering() {
    return this.config.hindering;
  }

  public get immobilizing() {
    return this.config.immobilizing;
  }

  public get freeing() {
    return this.config.freeing;
  }

  // ===================== STATE =====================

  constructor(
    public config: GameActionConfig,
    public $state: Signal<GameActionState>,
  ) {
  }

  static initConfig(key: GameActionKey): GameActionConfig {
    const config = actions[key];

    return {
      ...config,

      id: uuidv4(),
      key,
    }
  }

  public static initState(config: GameActionConfig): GameActionState {

    return {
      cooldownCounter: -1,
      stats: {
        usages: 0,
      }
    }
  }
}
