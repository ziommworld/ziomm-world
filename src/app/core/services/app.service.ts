import { Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { AppState } from '../models/app.models';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  public readonly version = '0.0.1';

  private $appState = signalState<AppState>({
    inGame: true, // TODO revert to false
  });

  public get $inGame() {
    return this.$appState.inGame;
  }

  constructor() { }

  public toggleInGame() {
    patchState(
      this.$appState,
      {
        inGame: !this.$appState.inGame()
      }
    );
  }
}
