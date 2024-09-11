import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { GameMap } from './$map';
import { MapComponent } from './$map/map/map.component';
import { ActionPanelComponent } from './core/components/action-panel/action-panel.component';


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

  constructor(
    private sheet: MatBottomSheet,
  ) {
    // const map = new GameMap();
  }

  public toggleSheet() {
    if (!this.sheet._openedBottomSheetRef) {
      const config: MatBottomSheetConfig = {
        hasBackdrop: false,
      };

      this.sheet.open(ActionPanelComponent, config);
    } else {
      this.sheet._openedBottomSheetRef.dismiss();
    }
  }
}
