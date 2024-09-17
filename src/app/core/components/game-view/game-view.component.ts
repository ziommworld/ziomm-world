import { Component } from '@angular/core';
import { GameMapComponent } from 'src/app/core/components/game-map/game-map.component';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [
    GameMapComponent
  ],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.scss'
})
export class GameViewComponent {

}
