import { effect, Injectable, signal } from '@angular/core';
import { patchState, SignalState, signalState } from '@ngrx/signals';

import { AppState } from '../models';
import { initialAppState } from '../configs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private $appState = signalState<AppState>(initialAppState);

  public get $inGame() {
    return this.$appState.inGame;
  }

  constructor() {
  }

  public toggleInGame() {
    patchState(
      this.$appState,
      {
        inGame: !this.$appState.inGame()
      }
    );
  }
}
