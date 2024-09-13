import { Component, computed, effect, HostListener, signal, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';

import { MapComponent } from './$map/map/map.component';
import { ActionPanelComponent } from './core/components/action-panel/action-panel.component';
import { GuiService } from './core/services/gui.service';
import { AppService } from './core/services/app.service';
import { GameModalComponent } from './core/components/game-modal/game-modal.component';
import { GameViewComponent } from "./core/components/game-view/game-view.component";
import { InitiativeTrackerComponent } from "./core/components/initiative-tracker/initiative-tracker.component";
import { ReferenceSheetComponent } from "./core/components/reference-sheet/reference-sheet.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIcon,
    MatTooltip,
    MatButtonToggleModule,
    MatListModule,
    MatCardModule,
    NgClass,
    GameViewComponent,
    InitiativeTrackerComponent,
    ReferenceSheetComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('ldrawer') ldrawer!: MatSidenav;
  @ViewChild('rdrawer') rdrawer!: MatSidenav;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab' || event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.$inGame()) {
      return;
    }

    if (event.key === 'Tab') {
      if (!this.gui.$gdialogOpened()) {
        return;
      } else {
        this.gui.toggleGUI();
      }
    }

    if (event.key === 'Escape') {
      this.gui.toggleGDialog();
    }
  }

  public $ldrawerOpened = this.gui.$ldrawerOpened;
  public $bsheetOpened = this.gui.$bsheetOpened;
  public $rdrawerOpened = this.gui.$rdrawerOpened;

  public $inGame = this.appService.$inGame;

  public $buttonGroupContainerClass = computed(() => {
    return {
      'button-group-container-hidden': !this.$inGame(),
    };
  });

  constructor(
    private gui: GuiService,
    private bsheet: MatBottomSheet,
    private gdialog: MatDialog,
    private snackbar: MatSnackBar,
    private appService: AppService,
  ) {
    this.initEffects();
  }

  public initEffects() {
    effect(() => {
      const ldrawerOpened = this.gui.$ldrawerOpened();

      if (ldrawerOpened) {
        this.ldrawer.close();
      } else {
        this.ldrawer.open();
      }
    });

    effect(() => {
      const bsheetOpened = this.gui.$bsheetOpened();

      if (bsheetOpened) {
        if (this.bsheet._openedBottomSheetRef) {
          this.bsheet._openedBottomSheetRef.dismiss();
        }
      } else {
        const config: MatBottomSheetConfig = {
          hasBackdrop: false,
          disableClose: true,
        };

        this.bsheet.open(ActionPanelComponent, config);
      }
    });

    effect(() => {
      const gdialogOpened = this.gui.$gdialogOpened();

      if (gdialogOpened) {
        this.gdialog.closeAll();
      } else {
        const config: MatDialogConfig = {
          id: 'game-modal',
          autoFocus: false,
          disableClose: true,
          width: '60vw',
          maxWidth: '80vw',
          height: '60vh',
          maxHeight: '80vh',
        };

        this.gdialog.open(GameModalComponent, config);
      }
    });

    effect(() => {
      const rdrawerOpened = this.gui.$rdrawerOpened();

      if (rdrawerOpened) {
        this.rdrawer.close();
      } else {
        this.rdrawer.open();
      }
    });
  }

  public newGame() {
    this.appService.toggleInGame();
  }

  public loadGame() {
    this.snackbar.open('Load game not implemented', 'Dismiss');
  }

  public toggleBSheet() {
    this.gui.toggleBSheet();
  }

  public toggleLDrawer() {
    this.gui.toggleLDrawer();
  }

  public toggleRDrawer() {
    this.gui.toggleRDrawer();
  }
}
