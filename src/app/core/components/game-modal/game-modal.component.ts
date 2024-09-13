import { Component } from '@angular/core';
import { GameMenuComponent } from "../game-menu/game-menu.component";


@Component({
  selector: 'app-game-modal',
  standalone: true,
  imports: [
    GameMenuComponent,
  ],
  templateUrl: './game-modal.component.html',
  styleUrl: './game-modal.component.scss'
})
export class GameModalComponent {

  constructor(
  ) { }
}
