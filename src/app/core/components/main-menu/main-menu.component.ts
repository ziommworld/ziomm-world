import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { GameRecord, quickGameDraft } from 'src/app/$game';
import { GameService } from '../../services/game.service';
import { snackbarDuration } from '../../configs';


@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    MainMenuComponent,
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
  @ViewChild('loadGameInput', { static: false })
  public loadGameInput!: ElementRef<HTMLInputElement>;

  public get canResume() {
    return localStorage.getItem('autosave') !== null;
  }

  constructor(
    private snackbar: MatSnackBar,
    private gameService: GameService,
  ) { }

  public resumeGame() {
    const rawRecord = localStorage.getItem('autosave');

    if (!rawRecord) {
      throw new Error('No autosave found.');
    }

    const record: GameRecord = JSON.parse(rawRecord);
    this.gameService.loadGame(record);
  }

  public newGame() {
    this.gameService.initGame();
  }

  public loadGame() {
    this.loadGameInput.nativeElement.click();
  }

  public quickGame() {
    this.gameService.startGame(quickGameDraft);
  }

  public onLoadGame($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      const snackbarConfig = { duration: snackbarDuration };
      this.snackbar.open('No file selected.', 'Try again', snackbarConfig);
      return;
    }

    const file = input.files[0];

    if (file.type !== 'application/json') {
      const snackbarConfig = { duration: snackbarDuration };
      this.snackbar.open('Please select a JSON file.', 'Try again', snackbarConfig);
      return;
    }

    const reader = new FileReader();
    let record: GameRecord;

    reader.onload = () => {
      try {
        record = JSON.parse(reader.result as string);
        this.gameService.loadGame(record);
        const snackbarConfig = { duration: snackbarDuration };
        this.snackbar.open('Game loaded.', 'OK', snackbarConfig);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        const snackbarConfig = { duration: snackbarDuration };
        this.snackbar.open(`Invalid JSON file.: ${reader.error}`, 'Dismiss', snackbarConfig);
      }
    };

    reader.onerror = () => {
      const snackbarConfig = { duration: snackbarDuration };
      this.snackbar.open(`Error reading file: ${reader.error}`, 'Dismiss', snackbarConfig);
    };

    reader.readAsText(file);

    input.value = '';
  }
}
