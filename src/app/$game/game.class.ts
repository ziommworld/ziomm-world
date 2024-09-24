import { signalState, SignalState } from "@ngrx/signals";
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { GameScenario } from "../$scenario";
import { GameConfig, GameDraft, GamePhase, GameRecord, GameState } from ".";


export class Game {
  public scenario!: GameScenario;

  public config!: GameConfig;
  public $state!: SignalState<GameState>;

  constructor(
    draft?: GameDraft,
    record?: GameRecord,
  ) {
    if (record) {
      this.config = record.config;
      this.$state = signalState<GameState>(record.state);
    } else if (draft) {
      this.config = this.initConfig(draft);
      this.$state = signalState<GameState>(this.initState());
    } else {
      throw new Error("Game must be initialized with either record or draft.");
    }

    this.scenario = new GameScenario(this.config.scenario, this.$state.scenario);
  }

  private initConfig(
    draft: GameDraft,
  ): GameConfig {
    const startedOn = DateTime.now();

    const scenario = GameScenario.initConfig(draft);

    return {
      id: uuidv4(),
      name: `game@${startedOn.toFormat('dd.MM.yyyy-HH:mm')}`,
      players: draft.players,

      scenario,

      startedOn: startedOn.toMillis(),
    };
  }

  private initState(): GameState {
    const scenario = GameScenario.initState(this.config.scenario);

    return {
      phase: GamePhase.PreGame,
      isPaused: false,

      scenario,

      stats: {
        totalTime: 0,
      },

      updatedOn: this.config.startedOn,
    }
  };

  public endGame() {
    throw new Error("Method not implemented.");
  }
}
