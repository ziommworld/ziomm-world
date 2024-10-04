import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';

import { GameCharacter, GameCharacterConfig } from 'src/app/$character';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DraftModalComponent } from '../components/draft-modal/draft-modal.component';
import { Game, GameDraft, GamePhase, GameRecord } from 'src/app/$game';
import { patchState } from '@ngrx/signals';
import { MicroTileConfig } from 'src/app/$map';
import { changeInitiative, displaceCharacter, doDmg, placeCharacter } from 'src/app/$mechanics';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private $game = signal<Game | null>(null);

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

  public $noGame = computed(() => {
    return !this.$game();
  });

  public $inGame = computed(() => {
    return this.$game()?.$state().phase === GamePhase.InGame;
  });

  public $preGame = computed(() => {
    return this.$game()?.$state().phase === GamePhase.PreGame;
  });

  public $endGame = computed(() => {
    return this.$game()?.$state().phase === GamePhase.PreGame;
  });

  public $canBegin = computed(() => this.characters.every(
    (character) => !!this.$characters()[character.id].position
  ));

  public $activeTile: WritableSignal<MicroTileConfig | null> = signal(null);

  public get config() {
    return this.game.config;
  }

  public get $state() {
    return this.game.$state;
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

  public $characters = computed(() => {
    return this.$state().scenario.characters;
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

      const config = this.game.config;
      const state = this.game.$state();
      const record: GameRecord = {
        config,
        state,
      };

      localStorage.setItem('autosave', JSON.stringify(record));

      console.warn('State updated', state)
    });
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
    this.game.beginGame();
  }

  public endGame() {
    this.$game.set(null);
  }

  // ===================== CHARACTERS =====================

  public changeInitiative(chars: GameCharacter[]) {
    patchState(this.game.$state, changeInitiative(chars.map((char) => char.id)));
  }

  public placeCharacter(charId: string, tile: MicroTileConfig) {
    patchState(this.game.$state, placeCharacter(charId, tile.coord));
  }

  public displaceCharacter(tile: MicroTileConfig) {
    patchState(this.game.$state, displaceCharacter(tile.coord));
  }

  public doAction() {
    patchState(this.game.$state, doDmg());
  }
}
