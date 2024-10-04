import { v4 as uuidv4 } from 'uuid';
import { Signal } from '@angular/core';

import { GameEventConfig, GameEventKey, GameEventState } from "./mechanics.models";
import { events } from "./lib";


export class GameEvent {

  // ===================== CONFIG =====================

  public get id() {
    return this.config.id;
  }

  // ===================== STATE =====================

  constructor(
    public config: GameEventConfig,
    public $state: Signal<GameEventState>,
  ) {
  }

  static initConfig(key: GameEventKey): GameEventConfig {
    const config = events[key];

    return {
      ...config,

      id: uuidv4(),
      key,
    }
  }

  public static initState(config: GameEventConfig): GameEventState {

    return {
      cooldownCounter: -1,
      stats: {
        occurances: 0,
      }
    }
  }
}
