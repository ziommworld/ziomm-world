import { computed } from "@angular/core";
import { DeepSignal } from "@ngrx/signals";
import { v4 as uuidv4 } from 'uuid';

import { scenarios } from "./lib";
import { GameCharacter, GameCharacterState } from "../$character";
import { GameDraft } from "../$game";
import { GameMap, GameMapState } from "../$map";
import { GameScenarioConfig, GameScenarioState } from ".";


export class GameScenario {
  public characters: GameCharacter[];
  public npcs: GameCharacter[];
  public maps: GameMap[];

  constructor(
    public config: GameScenarioConfig,
    public $state: DeepSignal<GameScenarioState>,
  ) {

    this.characters = config.characters.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state.characters();
          return stateMap[config.id]
        });

        return new GameCharacter(config, $state);
      });

    this.npcs = config.npcs.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state.characters();
          return stateMap[config.id];
        });

        return new GameCharacter(config, $state);
      });

    this.maps = config.maps.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state.maps();
          return stateMap[config.id]
        });

        return new GameMap(config, $state);
      });
  }

  public static initConfig(draft: GameDraft): GameScenarioConfig {
    const key = draft.scenario;
    const config = scenarios[key];

    return {
      ...config,
      id: uuidv4(),
      key,

      maxTurns: draft.settings.turns,
      maxTime: draft.settings.time,
      difficulty: draft.settings.difficulty,

      characters: draft.characters.map(
        char => GameCharacter.initConfig(char.character, char.player)
      ),
      npcs: config.npcs.map(
        npc => GameCharacter.initConfig(npc)
      ),
      maps: config.maps.map(
        map => GameMap.initConfig(map)
      ),
    };
  }

  public static initState(
    config: GameScenarioConfig
  ): GameScenarioState {
    return {
      currentTurn: 0,
      currentRound: 0,
      activeMap: config.initialMap,

      characters: config.characters.reduce(
        (rec, config) => {
          const state = GameCharacter.initState(config);
          rec[config.id] = state;
          return rec;
        },
        {} as Record<string, GameCharacterState>
      ),
      npcs: config.characters.reduce(
        (rec, config) => {
          const state = GameCharacter.initState(config);
          rec[config.id] = state;
          return rec;
        },
        {} as Record<string, GameCharacterState>
      ),
      maps: config.maps.reduce(
        (rec, config) => {
          const state = GameMap.initState(config);
          rec[config.id] = state;
          return rec;
        },
        {} as Record<string, GameMapState>
      ),

      stats: {
        avgRoundTime: 0,
        totalRounds: 0,
      },
    }
  }
}
