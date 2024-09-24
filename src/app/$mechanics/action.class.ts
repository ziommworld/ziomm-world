import { v4 as uuidv4 } from 'uuid';
import { Signal } from "@angular/core";

import { GameActionConfig, GameActionKey, GameActionState } from ".";
import { actions } from "./lib";


export class GameAction {

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
