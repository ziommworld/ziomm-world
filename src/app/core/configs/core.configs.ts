import { GameDraft } from "src/app/$game";
import { AppState } from "../models";

// TODO: can be converted to environment.ts

export const version = '0.0.1';
// export const bypass = true;
export const bypass = false;
export const guiInitialOpened = false;

export const initialAppState: AppState = {
  rdrawerOpened: !guiInitialOpened,
  ldrawerOpened: !guiInitialOpened,
  bsheetOpened: !guiInitialOpened,
  gdialogOpened: !guiInitialOpened,
}

export const dummyGameDraft: GameDraft = {
  players: ['P1', 'P2'],
  characters: [
    {
      character: 'neo',
      player: 'P1'
    },
  ],
  scenario: 'test',
  settings: {
    difficulty: 100,
    time: 120,
    turns: 30,
  }
}
