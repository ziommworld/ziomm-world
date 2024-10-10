import { computed, Signal } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

import { GameMapConfig, GameMapKey, GameMapState, MicroTileConfig } from ".";
import { maps } from "./lib";
import { GameComponent, GameComponentState } from "../$component";
import { GameEvent, GameEventState } from "../$mechanics";


export class GameMap {
  public components: GameComponent[];
  public events: GameEvent[];

  public componentsDict!: Record<string, GameComponent>;
  public eventsDict!: Record<string, GameEvent>;

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

  public get tiles() {
    return this.config.tiles;
  }

  // ===================== STATE =====================

  public $tiles = computed(() => this.$state().tiles);

  constructor(
    public config: GameMapConfig,
    public $state: Signal<GameMapState>,
  ) {
    this.components = config.components.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state().components;
          return stateMap[config.id];
        });

        return new GameComponent(config, $state);
      });

    this.componentsDict = this.components.reduce(
      (rec, component) => {
        rec[component.id] = component;
        return rec;
      },
      {} as Record<string, GameComponent>
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

  static initConfig(key: GameMapKey): GameMapConfig {
    const {
      terrain,
      ...config
    } = maps[key];

    return {
      ...config,

      id: uuidv4(),
      key,

      tiles: terrain.map(
        (row, y) => row.map(
          (terrain, x): MicroTileConfig => ({
            coord: {
              x,
              y
            },
            terrain,
          })
        )
      ),

      components: config.components.map(
        ([key, layout]) => GameComponent.initConfig(key, layout)
      ),
      events: config.events.map(
        (key) => GameEvent.initConfig(key)
      ),
    }
  }

  public static initState(config: GameMapConfig): GameMapState {

    return {
      tiles: config.tiles.map(
        row => row.map(
          () => ({})
        )
      ),
      components: config.components.reduce(
        (map, config) => {
          const state = GameComponent.initState(config);
          map[config.id] = state;
          return map
        },
        {} as Record<string, GameComponentState>
      ),
      events: config.events.reduce(
        (map, config) => {
          const state = GameEvent.initState(config);
          map[config.id] = state;
          return map
        },
        {} as Record<string, GameEventState>
      ),

      stats: {

      }
    };
  }
}
