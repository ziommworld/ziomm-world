import { effect, Injectable, signal } from '@angular/core';
import { patchState, SignalState, signalState } from '@ngrx/signals';

import { AppState } from '../models';
import { initialAppState } from '../configs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private $appState = signalState<AppState>(initialAppState);

  public get $ldrawerOpened() {
    return this.$appState.ldrawerOpened;
  }

  public get $rdrawerOpened() {
    return this.$appState.rdrawerOpened;
  }

  public get $bsheetOpened() {
    return this.$appState.bsheetOpened;
  }

  public get $gdialogOpened() {
    return this.$appState.gdialogOpened;
  }

  constructor() {
  }

  public toggleLDrawer() {
    patchState(
      this.$appState,
      {
        ldrawerOpened: !this.$appState.ldrawerOpened()
      }
    );
  }

  public toggleRDrawer() {
    patchState(
      this.$appState,
      {
        rdrawerOpened: !this.$appState.rdrawerOpened()
      }
    );
  }

  public toggleBSheet() {
    patchState(
      this.$appState,
      {
        bsheetOpened: !this.$appState.bsheetOpened()
      }
    );
  }

  public toggleGDialog() {
    patchState(
      this.$appState,
      {
        gdialogOpened: !this.$appState.gdialogOpened()
      }
    );
  }

  public toggleGUI() {
    const shouldClose = this.$appState.ldrawerOpened() || this.$appState.rdrawerOpened() || this.$appState.bsheetOpened();

    patchState(
      this.$appState,
      {
        ldrawerOpened: !shouldClose,
        rdrawerOpened: !shouldClose,
        bsheetOpened: !shouldClose,
      }
    );
  }

  public closeAll() {
    const shouldClose = true;

    patchState(
      this.$appState,
      {
        ldrawerOpened: shouldClose,
        rdrawerOpened: shouldClose,
        bsheetOpened: shouldClose,
        gdialogOpened: shouldClose,
      }
    );
  }
}
