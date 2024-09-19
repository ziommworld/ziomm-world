import { Injectable } from '@angular/core';
import { signalState, SignalState } from '@ngrx/signals';

import { CharacterState } from 'src/app/$character';
import { GameComponentState } from 'src/app/$component';
import { GameEngine } from 'src/app/$mechanics';
import { GameMapState } from 'src/app/$map';
import { AppService } from './app.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DraftModalComponent } from '../components/draft-modal/draft-modal.component';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private $characterStateMap: Record<string, SignalState<CharacterState>> = {};
  private $componentStateMap: Record<string, SignalState<GameComponentState>> = {};
  private $gameMapState: SignalState<GameMapState> | null = null;

  private engine: GameEngine | null = null;

  constructor(
    private dialog: MatDialog,
    private appService: AppService,
  ) { }

  public draftGame() {
    // this.engine = new GameEngine();

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
      (result) => {
        if (result) {
          console.warn(result)
          this.startGame();
          this.appService.toggleInGame();
        }
      }
    );
  }

  public startGame() {
    this.engine = new GameEngine();
  }

  public endGame() {
    this.engine = null;
  }
}
