import { Component } from '@angular/core';
import { MicroTile } from '../../../$map/map.models';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';


interface GameMap {
  rows: MapRow[];
}

interface MapRow {
  id: number;
  cells: MapCell[];
}

interface MapCell {
  id: string;
  component?: string;
  character?: string;
}

@Component({
  selector: 'app-game-map',
  standalone: true,
  imports: [
    MatIconModule,
    MatBadgeModule
  ],
  templateUrl: './game-map.component.html',
  styleUrl: './game-map.component.scss'
})
export class GameMapComponent {
  public map: GameMap = {
    rows: [
      {
        id: 1,
        cells: [
          {
            id: 'A1',
            component: 'home'
          },
          {
            id: 'B1',
            component: 'home'
          },
          {
            id: 'C1',
            component: 'home'
          }
        ]
      },
      {
        id: 2,
        cells: [
          {
            id: 'A2',
            component: 'home',
            character: 'send',
          },
          {
            id: 'B2',
            component: 'home',
          },
          {
            id: 'C2',
            component: 'home'
          }
        ]
      },
      {
        id: 3,
        cells: [
          {
            id: 'A3',
            component: 'home'
          },
          {
            id: 'B3',
            component: 'home',
          },
          {
            id: 'C3',
            component: 'home'
          }
        ]
      }
    ]
  };
}
