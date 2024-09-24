import { Injectable } from '@angular/core';

import { GameCharacter } from 'src/app/$character';
import { AppService } from './app.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DraftModalComponent } from '../components/draft-modal/draft-modal.component';
import { Game, GameDraft, GameRecord } from 'src/app/$game';
import { bypass, dummyGameDraft } from '../configs/core.configs';
import { patchState } from '@ngrx/signals';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private game: Game | null = null;

  public get characters(): GameCharacter[] {
    return this.game?.scenario.characters ?? [];
  }

  constructor(
    private dialog: MatDialog,
    private appService: AppService,
  ) { }

  public initGame() {
    if (bypass) {
      this.startGame(dummyGameDraft);
      return;
    }

    const config: MatDialogConfig = {
      id: 'draft-modal',
      autoFocus: false,
      disableClose: true,
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
    patchState(this.game!.$state, (state) => ({
      scenario: {
        ...state.scenario,
        characters: {
          ...state.scenario.characters,
          [this.characters[0].id]: {
            ...state.scenario.characters[this.characters[0].id],
            currentHP: state.scenario.characters[this.characters[0].id].currentHP - 1,
          }
        }
      }
    }));
  }

  public startGame(draft: GameDraft) {
    this.game = new Game(draft);
    this.appService.toggleInGame();
  }

  public loadGame(record: GameRecord) {
    this.game = new Game(undefined, record);
    this.appService.toggleInGame();
  }

  public endGame() {
    this.game = null;
    this.appService.toggleInGame();
  }
}
