import { computed, Signal } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

import { GameComponentConfig, GameComponentKey, GameComponentState } from ".";
import { GameComponentLayout } from "../$map/map.models";
import { components } from "./lib";
import { GameAction, GameActionState, GameEvent, GameEventState } from "../$mechanics";


export class GameComponent {
  public interactions: GameAction[];
  public events: GameEvent[];

  constructor(
    public config: GameComponentConfig,
    public $state: Signal<GameComponentState>,
  ) {
    this.interactions = config.interactions.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state().interactions;
          return stateMap[config.id];
        });

        return new GameAction(config, $state);
      });

    this.events = config.events.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state().events;
          return stateMap[config.id];
        });

        return new GameEvent(config, $state);
      });
  }

  static initConfig(key: GameComponentKey, layout: GameComponentLayout): GameComponentConfig {
    const config = components[key];

    return {
      ...config,

      id: uuidv4(),
      key,

      interactions: config.interactions.map(
        key => GameAction.initConfig(key)
      ),
      events: config.events.map(
        key => GameEvent.initConfig(key)
      ),
    }
  }

  public static initState(config: GameComponentConfig): GameComponentState {
    return {
      durability: config.durability ?? -1,

      interactions: config.interactions.reduce(
        (rec, config) => {
          const state = GameAction.initState(config);
          rec[config.id] = state;
          return rec;
        },
        {} as Record<string, GameActionState>
      ),

      events: config.events.reduce(
        (rec, config) => {
          const state = GameEvent.initState(config);
          rec[config.id] = state;
          return rec;
        },
        {} as Record<string, GameEventState>
      ),

      stats: {

      }
    }
  }
}
