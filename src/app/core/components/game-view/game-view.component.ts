import { Component } from '@angular/core';
import { MapComponent } from 'src/app/$map/map/map.component';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [
    MapComponent
  ],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.scss'
})
export class GameViewComponent {

}
