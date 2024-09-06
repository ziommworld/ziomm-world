import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GameMap } from './map';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor() {
    const map = new GameMap();
  }
}
