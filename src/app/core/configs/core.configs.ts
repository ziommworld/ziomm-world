import { AppState } from "../models";

// TODO: can be converted to environment.ts

export const version = '0.0.1';
export const guiInitialOpened = false;

export const initialAppState: AppState = {
  rdrawerOpened: !guiInitialOpened,
  ldrawerOpened: !guiInitialOpened,
  bsheetOpened: !guiInitialOpened,
  gdialogOpened: !guiInitialOpened,
}

export const snackbarDuration = 3000;
