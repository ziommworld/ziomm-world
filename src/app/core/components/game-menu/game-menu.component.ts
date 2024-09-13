import { Component, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { AppService } from '../../services/app.service';
import { GuiService } from '../../services/gui.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private gui: GuiService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
    this.initEffects();
  }

  public initEffects() {
  }

  public saveGame() {
    this.snackbar.open('Save game not implemented', 'Dismiss');
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
        this.gui.toggleGDialog();
        this.appService.toggleInGame();
      }
    });
  }
}
