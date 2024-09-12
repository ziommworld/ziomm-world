import { Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { GUI } from '../models/gui.models';


@Injectable({
  providedIn: 'root'
})
export class GuiService {

  private guiState = signalState<GUI>({
    rdrawerOpened: true,
    ldrawerOpened: true,
    bsheetOpened: true
  });

  public get ldrawerOpened() {
    return this.guiState.ldrawerOpened;
  }

  public get rdrawerOpened() {
    return this.guiState.rdrawerOpened;
  }

  public get bsheetOpened() {
    return this.guiState.bsheetOpened;
  }

  constructor() { }

  public toggleLDrawer() {
    patchState(
      this.guiState,
      {
        ldrawerOpened: !this.guiState.ldrawerOpened()
      }
    );
  }

  public toggleRDrawer() {
    patchState(
      this.guiState,
      {
        rdrawerOpened: !this.guiState.rdrawerOpened()
      }
    );
  }

  public toggleBSheet() {
    patchState(
      this.guiState,
      {
        bsheetOpened: !this.guiState.bsheetOpened()
      }
    );
  }

  public toggleGUI() {
    const shouldClose = this.guiState.ldrawerOpened() || this.guiState.rdrawerOpened() || this.guiState.bsheetOpened();

    patchState(
      this.guiState,
      {
        ldrawerOpened: !shouldClose,
        rdrawerOpened: !shouldClose,
        bsheetOpened: !shouldClose,
      }
    );
  }
}
