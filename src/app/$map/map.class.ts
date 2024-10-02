import { computed, Signal } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

import { GameMapConfig, GameMapKey, GameMapState, MicroTile } from ".";
import { maps } from "./lib";
import { GameComponent, GameComponentState } from "../$component";
import { GameEvent, GameEventState } from "../$mechanics";


export class GameMap {
  public components: GameComponent[];
  public events: GameEvent[];

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

    this.events = config.events.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state().events;
          return stateMap[config.id];
        });

        return new GameEvent(config, $state);
      });
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
          (terrain, x): MicroTile => ({
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

  // // TODO change to JSON
  // public loadMap(mapData: string): string[][] {
  //   const rows = mapData.split('\n'); // Split by new lines
  //   return rows.map(row => row.trim().split(/\s+/)); // Split each row by spaces
  // }

  // // TODO change to JSON
  // public downloadMap(mapData: string, mapName: string): void {
  //   const blob = new Blob([mapData], { type: 'text/plain' });

  //   const link = document.createElement('a');
  //   const url = window.URL.createObjectURL(blob);

  //   link.href = url;
  //   link.download = `${mapName}.txt`;

  //   document.body.appendChild(link);

  //   link.click();

  //   document.body.removeChild(link);
  //   window.URL.revokeObjectURL(url);
  // }

  // // TODO complete implementation
  // public uploadMap(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = (event) => {
  //       if (event.target) {
  //         resolve(event.target.result as string);
  //       }
  //     };

  //     reader.onerror = (event) => {
  //       reject(event);
  //     };

  //     reader.readAsText(file);
  //   });
  // }
}
