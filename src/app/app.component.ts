import { Component, computed, effect, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgClass, NgIf } from '@angular/common';

import { GameMapComponent } from './core/components/game-map/game-map.component';
import { ActionPanelComponent } from './core/components/action-panel/action-panel.component';
import { AppService } from './core/services/app.service';
import { GameModalComponent } from './core/components/game-modal/game-modal.component';
import { GameViewComponent } from "./core/components/game-view/game-view.component";
import { InitiativeTrackerComponent } from "./core/components/initiative-tracker/initiative-tracker.component";
import { ReferenceSheetComponent } from "./core/components/reference-sheet/reference-sheet.component";
import { GameService } from './core/services/game.service';
import { MainMenuComponent } from "./core/components/main-menu/main-menu.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GameMapComponent,
    MatSidenavModule,
    MatIcon,
    MatTooltip,
    MatButtonToggleModule,
    NgClass,
    GameViewComponent,
    InitiativeTrackerComponent,
    ReferenceSheetComponent,
    NgIf,
    MainMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('ldrawer')
  public ldrawer!: MatSidenav;

  @ViewChild('rdrawer')
  public rdrawer!: MatSidenav;

  @ViewChild(MainMenuComponent)
  public mainMenu!: MainMenuComponent;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab' || event.key === 'Escape' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!this.$inGame()) {
      if (event.key === ' ') {
        this.mainMenu.resumeGame();
      }
    } else {
      if (event.key === 'Tab') {
        if (!this.appService.$gdialogOpened()) {
          return;
        } else {
          this.appService.toggleGUI();
        }
      }

      if (event.key === 'Escape') {
        this.appService.toggleGDialog();
      }
    }
  }

  public $ldrawerOpened = this.appService.$ldrawerOpened;
  public $bsheetOpened = this.appService.$bsheetOpened;
  public $rdrawerOpened = this.appService.$rdrawerOpened;

  public $inGame = this.gameService.$inGame;

  public $buttonGroupContainerClass = computed(() => {
    return {
      'button-group-container-hidden': !this.$inGame(),
    };
  });

  constructor(
    private bsheet: MatBottomSheet,
    private gdialog: MatDialog,
    private appService: AppService,
    private gameService: GameService,
  ) {
    this.initEffects();
  }

  public initEffects() {
    effect(() => {
      const ldrawerOpened = this.appService.$ldrawerOpened();

      if (ldrawerOpened) {
        this.ldrawer.close();
      } else {
        this.ldrawer.open();
      }
    });

    effect(() => {
      const bsheetOpened = this.appService.$bsheetOpened();

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
      const gdialogOpened = this.appService.$gdialogOpened();

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
      const rdrawerOpened = this.appService.$rdrawerOpened();

      if (rdrawerOpened) {
        this.rdrawer.close();
      } else {
        this.rdrawer.open();
      }
    });
  }



  public toggleBSheet() {
    this.appService.toggleBSheet();
  }

  public toggleLDrawer() {
    this.appService.toggleLDrawer();
  }

  public toggleRDrawer() {
    this.appService.toggleRDrawer();
  }
}
