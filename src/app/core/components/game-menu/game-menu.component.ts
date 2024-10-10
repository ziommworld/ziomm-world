import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateTime } from 'luxon';

import { AppService } from '../../services/app.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { GameService } from '../../services/game.service';
import { GameRecord } from 'src/app/$game';
import { snackbarDuration } from '../../configs';


@Component({
  selector: 'app-game-menu',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './game-menu.component.html',
  styleUrl: './game-menu.component.scss'
})
export class GameMenuComponent {
  constructor(
    private appService: AppService,
    private gameService: GameService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
    this.initEffects();
  }

  public initEffects() {
  }

  public mainMenu() {
    window.location.reload();
  }

  public saveGame() {
    const rawRecord = localStorage.getItem('autosave');
    if (!rawRecord) {
      return;
    }
    const savedOn = DateTime.now();

    const record: GameRecord = JSON.parse(rawRecord);
    const filename = `save@${savedOn.toFormat('yyyy-MM-dd_HH-mm-ss')}.json`;

    const json = JSON.stringify(record, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);

    this.appService.toggleGDialog();

    const snackbarConfig = { duration: snackbarDuration };
    this.snackbar.open('Game saved.', 'OK', snackbarConfig);
  }

  public quitGame() {
    const config: MatDialogConfig = {
      id: 'confirm-modal',
      width: '30vw',
      height: '30vh',
      data: {
        message: 'Are you sure you want to quit?'
      },
      disableClose: true,
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gameService.quitGame();
        this.appService.closeAll();
        // * no need to remove autosave, give option to download last save
        // localStorage.removeItem('autosave');
      }
    });
  }
}
