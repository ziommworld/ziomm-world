import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameRecord } from 'src/app/$game';
import { GameService } from '../../services/game.service';
import { MatButtonModule } from '@angular/material/button';

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

  public onLoadGame($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.snackbar.open('No file selected.', 'Dismiss');
      return;
    }

    const file = input.files[0];

    if (file.type !== 'application/json') {
      this.snackbar.open('Please select a JSON file.', 'Dismiss');
      return;
    }

    const reader = new FileReader();
    let record: GameRecord;

    reader.onload = () => {
      try {
        record = JSON.parse(reader.result as string);
        this.gameService.loadGame(record);
        this.snackbar.open('Game loaded.', 'Dismiss');
      } catch (error) {
        console.error('Error parsing JSON:', error);
        this.snackbar.open(`Invalid JSON file.: ${reader.error}`);
      }
    };

    reader.onerror = () => {
      this.snackbar.open(`Error reading file: ${reader.error}`);
    };

    reader.readAsText(file);

    input.value = '';
  }
}
