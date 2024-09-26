import { computed, effect, Injectable, signal } from '@angular/core';

import { GameCharacter } from 'src/app/$character';
import { AppService } from './app.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DraftModalComponent } from '../components/draft-modal/draft-modal.component';
import { Game, GameDraft, GameRecord, GameState } from 'src/app/$game';
import { bypass, dummyGameDraft } from '../configs/core.configs';
import { patchState } from '@ngrx/signals';
import { doDmg } from 'src/app/$game/game.configs';


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

  public $inGame = computed(() => {
    return !!this.$game();
  });

  public get characters(): GameCharacter[] {
    return this.game.scenario.characters;
  }

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

  public initGame() {
    if (bypass) {
      this.startGame(dummyGameDraft);
      return;
    }

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

  public doAction() {
    patchState(this.game.$state, doDmg());
  }

  public startGame(draft: GameDraft) {
    this.$game.set(new Game(draft));
  }

  public loadGame(record: GameRecord) {
    this.$game.set(new Game(undefined, record));
  }

  public endGame() {
    this.$game.set(null);
  }
}
