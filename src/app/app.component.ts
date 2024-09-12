import { Component, computed, effect, HostListener, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { GameMap } from './$map';
import { MapComponent } from './$map/map/map.component';
import { ActionPanelComponent } from './core/components/action-panel/action-panel.component';
import { GuiService } from './core/services/gui.service';
import { StateService } from './core/services/state.service';
import { GameModalComponent } from './core/components/game-modal/game-modal.component';


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
    MatButtonToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('ldrawer') ldrawer!: MatSidenav;
  @ViewChild('rdrawer') rdrawer!: MatSidenav;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent the default tab behavior (like focusing on next element)
      event.stopPropagation(); // Prevent the event from bubbling up to parent elements
      this.gui.toggleGUI();
    }

    if (event.key === 'Escape') {
      event.preventDefault(); // Prevent the default escape behavior (like closing modals)
      event.stopPropagation(); // Prevent the event from bubbling up to parent elements
      this.gui.toggleGDialog();
    }
  }

  public ldrawerOpened = this.gui.ldrawerOpened;
  public bsheetOpened = this.gui.bsheetOpened;
  public rdrawerOpened = this.gui.rdrawerOpened;

  constructor(
    private gui: GuiService,
    private bsheet: MatBottomSheet,
    private gdialog: MatDialog,
    private state: StateService,
  ) {
    // const map = new GameMap();

    this.initEffects();
  }

  public initEffects() {
    effect(() => {
      const ldrawerOpened = this.gui.ldrawerOpened();

      if (ldrawerOpened) {
        this.ldrawer.close();
      } else {
        this.ldrawer.open();
      }
    });

    effect(() => {
      const bsheetOpened = this.gui.bsheetOpened();

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
      const gdialogOpened = this.gui.gdialogOpened();

      if (gdialogOpened) {
          this.gdialog.closeAll();
      } else {
        const config: MatDialogConfig = {
          id: 'game-modal',
          // hasBackdrop: false,
        };

        this.gdialog.open(GameModalComponent, config);
      }
    });

    effect(() => {
      const rdrawerOpened = this.gui.rdrawerOpened();

      if (rdrawerOpened) {
        this.rdrawer.close();
      } else {
        this.rdrawer.open();
      }
    });
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
