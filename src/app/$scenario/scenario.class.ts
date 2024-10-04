import { computed } from "@angular/core";
import { DeepSignal } from "@ngrx/signals";
import { v4 as uuidv4 } from 'uuid';

import { scenarios } from "./lib";
import { GameCharacter, GameCharacterState } from "../$character";
import { GameDraft } from "../$game";
import { GameMap, GameMapKey, GameMapState } from "../$map";
import { GameScenarioConfig, GameScenarioState } from ".";
import { GameEvent, GameEventState } from "../$mechanics";


export class GameScenario {
  public characters: GameCharacter[];
  public npcs: GameCharacter[];
  public maps: GameMap[];
  public events: GameEvent[];

  public charactersDict!: Record<string, GameCharacter>;
  public npcsDict!: Record<string, GameCharacter>;
  public mapsDict!: Record<GameMapKey, GameMap>;
  public eventsDict!: Record<string, GameEvent>;

  // ===================== CONFIG =====================

  public get id() {
    return this.config.id;
  }

  // ===================== STATE =====================


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

    this.charactersDict = this.characters.reduce(
      (rec, character) => {
        rec[character.id] = character;
        return rec;
      },
      {} as Record<string, GameCharacter>
    );

    this.npcs = config.npcs.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state.characters();
          return stateMap[config.id];
        });

        return new GameCharacter(config, $state);
      });

    this.npcsDict = this.npcs.reduce(
      (rec, npc) => {
        rec[npc.id] = npc;
        return rec;
      },
      {} as Record<string, GameCharacter>
    );

    this.maps = config.maps.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state.maps();
          return stateMap[config.key]
        });

        return new GameMap(config, $state);
      });

    this.mapsDict = this.maps.reduce(
      (rec, map) => {
        rec[map.key] = map;
        return rec;
      },
      {} as Record<GameMapKey, GameMap>
    );

    this.events = config.events.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state.events();
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
      events: config.events.map(
        event => GameEvent.initConfig(event)
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
          // TODO add other configs as params
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
          rec[config.key] = state;
          return rec;
        },
        {} as Record<GameMapKey, GameMapState>
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
        avgRoundTime: 0,
        totalTurns: 0,
        avgTurnTime: 0,
      },
    }
  }
}
