import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';

import { GameCharacter } from 'src/app/$character';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DraftModalComponent } from '../components/draft-modal/draft-modal.component';
import { Game, GameDraft, GamePhase, GameRecord } from 'src/app/$game';
import { patchState } from '@ngrx/signals';
import { GameMapCoordinate, MicroTileConfig } from 'src/app/$map';
import {
  $setUpdatedOn, $moveCharacter, $changeInitiative, $displaceCharacter,
  $placeCharacter,
  GameActionConfig,
  $actionPass, $actionWait, $characterAction, $endTurn,
  $beginGame,
  $endGame,
  $endRound,
  $setEndedOn,
  $beginRound,
  $beginTurn
} from 'src/app/$mechanics';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private $game = signal<Game | null>(null);
  public $activeTile: WritableSignal<MicroTileConfig | null> = signal(null);

  // ===================== CONFIG =====================

  /**
   * use only while inGame
   */
  private get game() {
    const game = this.$game();
    if (!game) {
      throw new Error('Game not initialized');
    }

    return game;
  }

  public get config() {
    return this.game.config;
  }

  public get scenario() {
    return this.game.scenario;
  }

  public get characters(): GameCharacter[] {
    return this.game.scenario.characters;
  }

  public get npcs(): GameCharacter[] {
    return this.game.scenario.npcs;
  }

  public get maps() {
    return this.game.scenario.maps;
  }

  // ===================== STATE =====================

  public $noGame = computed(() => {
    return !this.$game();
  });

  public $canBegin = computed(() => this.characters.every(
    (character) => !!this.$characters()[character.id].position
  ));

  public $preGame = computed(() => {
    return this.$game()?.$state().phase === GamePhase.PreGame;
  });

  public $inGame = computed(() => {
    return this.$game()?.$state().phase === GamePhase.InGame;
  });

  public $postGame = computed(() => {
    return this.$game()?.$state().phase === GamePhase.PostGame;
  });

  public get $state() {
    return this.game.$state;
  }

  public $currentTurn = computed(() => {
    return this.$state().scenario.currentTurn;
  });

  public $currentRound = computed(() => {
    return this.$state().scenario.currentRound;
  });

  public $characters = computed(() => {
    return this.$state().scenario.characters;
  });

  public $npcs = computed(() => {
    return this.$state().scenario.npcs;
  });

  public $maps = computed(() => {
    return this.$state().scenario.maps;
  });

  public $events = computed(() => {
    return this.$state().scenario.events;
  });

  public $activeMap = computed(() => {
    const activeMapKey = this.scenario.$state().activeMap;
    const activeMap = this.scenario.mapsDict[activeMapKey];

    return activeMap;
  });

  public $activeCharacters = computed(() => {
    const activeMap$ = this.$activeMap();

    const allCharacters = [
      ...this.characters,
      ...this.npcs
    ];

    const activeCharacters = allCharacters
      .filter(
        char => char.$map() === activeMap$.key && !char.$state().hidden
      ).sort(
        (a, b) => a.$state().initiative - b.$state().initiative
      );

    return activeCharacters;
  });

  public $activeCharacter = computed(() => {
    const activeCharacters$ = this.$activeCharacters();
    const currentTurn$ = this.$currentTurn();

    const activeCharacter = activeCharacters$.find(char => char.$state().initiative === currentTurn$);

    if (!activeCharacter) {
      throw new Error('No active character');
    }

    return activeCharacter;
  });

  constructor(
    private dialog: MatDialog,
  ) {
    this.setAutosave();
  }

  private setAutosave() {
    effect(() => {
      const game = this.$game();
      if (!game) {
        return;
      }

      this.autosave();
    });
  }

  private autosave() {
    const config = this.game.config;
    const state = this.$state();
    const record: GameRecord = {
      config,
      state,
    };

    console.warn('State updated.', state)
    localStorage.setItem('autosave', JSON.stringify(record));

    console.warn('Autosaving...');
  }

  // ===================== GAME =====================

  public draftGame() {
    const config: MatDialogConfig = {
      id: 'draft-modal',
      autoFocus: false,
      disableClose: false,
      width: '60vw',
      maxWidth: '80vw',
      height: '60vh',
      maxHeight: '80vh',
    };

    const dialogRef = this.dialog.open(DraftModalComponent, config);

    dialogRef.afterClosed().subscribe(
      (draft: GameDraft) => {
        if (draft) {
          this.startGame(draft);
        }
      }
    );
  }

  public startGame(draft: GameDraft) {
    this.$game.set(new Game(draft));
  }

  public loadGame(record: GameRecord) {
    this.$game.set(new Game(undefined, record));
  }

  public beginGame() {
    const activeCharacters$ = this.$activeCharacters();

    patchState(this.$state,
      $beginGame(),
      $beginRound(activeCharacters$),
      $beginTurn(),
      $setUpdatedOn(),
    );
  }

  public endGame() {
    patchState(this.$state,
      $endGame(),
      $setEndedOn(),
    );

    // explicit autosave necessary to save the PostGame state
    this.autosave();
    console.warn('Game ended');
  }

  public quitGame() {
    this.endGame();
    this.$game.set(null);
  }

  // ===================== CHARACTERS =====================

  public changeInitiative(characters: GameCharacter[]) {
    const charIds = characters.map((char) => char.id);

    patchState(this.$state,
      $changeInitiative(charIds),
    );
  }

  public placeCharacter(characterId: string, tile: MicroTileConfig) {
    patchState(this.$state,
      $placeCharacter(characterId, tile.coord),
    );
  }

  public displaceCharacter(tile: MicroTileConfig) {
    patchState(this.$state,
      $displaceCharacter(tile.coord)
    );
  }

  public displaceAllCharacters() {
    const characters$ = this.$characters();

    this.characters.forEach((char) => {
      const charPosition = characters$[char.id].position;

      if (charPosition) {
        patchState(this.$state,
          $displaceCharacter(charPosition)
        );
      }
    });
  }

  public moveCharacter(characterId: string, coord: GameMapCoordinate) {
    patchState(this.$state,
      $moveCharacter(characterId, coord),
      $setUpdatedOn()
    );
  }

  public characterAction(characterId: string, config: GameActionConfig) {
    patchState(this.$state,
      $characterAction(characterId, config),
      $setUpdatedOn(),
    );
  }

  public characterWait(characterId: string, config: GameActionConfig) {
    patchState(this.$state,
      $actionWait(characterId, config),
      $setUpdatedOn(),
    );
  }

  public characterPass(characterId: string, config: GameActionConfig) {
    patchState(this.$state,
      $actionPass(characterId, config),
      $setUpdatedOn(),
    );
  }

  public endTurn() {
    const activeCharacters$ = this.$activeCharacters();

    const isLastTurn = this.$currentTurn() === activeCharacters$.length;
    const isLastRound = this.$currentRound() === this.scenario.config.maxRounds;

    const updaters = [
      $setUpdatedOn(),
      $endTurn(),
    ];

    if (isLastTurn) {
      updaters.push($endRound());

      if (isLastRound) {
        updaters.push($endGame());
      } else {
        updaters.push($beginRound(activeCharacters$));
      }
    }

    if (!(isLastRound && isLastRound)) {
      updaters.push($beginTurn());
    }

    patchState(this.$state,
      ...updaters
    );
  }
}
