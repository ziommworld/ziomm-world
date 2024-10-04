import { computed, Signal } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

import { GameComponentConfig, GameComponentKey, GameComponentLayout, GameComponentState } from ".";
import { components } from "./lib";
import { GameAction, GameActionState, GameEvent, GameEventState } from "../$mechanics";


export class GameComponent {
  public interactions: GameAction[];
  public events: GameEvent[];

  public interactionsDict!: Record<string, GameAction>;
  public eventsDict!: Record<string, GameEvent>;

  // ===================== CONFIG =====================

  public get id() {
    return this.config.id;
  }

  // ===================== STATE =====================

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

    this.interactionsDict = this.interactions.reduce(
      (rec, interaction) => {
        rec[interaction.id] = interaction;
        return rec;
      },
      {} as Record<string, GameAction>
    );

    this.events = config.events.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state().events;
          return stateMap[config.id];
        });

        return new GameEvent(config, $state);
      });

    this.eventsDict = this.events.reduce(
      (rec, event) => {
        rec[event.id] = event;
        return rec;
      },
      {} as Record<string, GameEvent>
    );
  }

  static initConfig(key: GameComponentKey, layout: GameComponentLayout): GameComponentConfig {
    const config = components[key];

    return {
      ...config,

      id: uuidv4(),
      key,
      layout,

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
