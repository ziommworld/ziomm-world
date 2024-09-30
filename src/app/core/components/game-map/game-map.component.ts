import { Component, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  CdkDragEnter,
} from '@angular/cdk/drag-drop'
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { GameService } from '../../services/game.service';


@Component({
  selector: 'app-game-map',
  standalone: true,
  imports: [
    MatIconModule,
    MatBadgeModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    NgClass,
    MatTooltipModule,
  ],
  templateUrl: './game-map.component.html',
  styleUrl: './game-map.component.scss'
})
export class GameMapComponent {
  public scenario = this.gameService.scenario;
  public maps = this.scenario.maps;

  public $currentMap = computed(() => {
    const activeMap = this.maps.find(
      map => map.config.key === this.scenario.$state().activeMap
    );

    if (!activeMap) {
      throw new Error('No active map found.');
    }

    console.warn('activeMap', activeMap);
    return activeMap;
  });

  constructor(
    private gameService: GameService
  ) {

  }

  public drop($event: CdkDragDrop<any, any, any>) {
    console.log($event.container.data, $event.item.data);
    const [y, x] = $event.container.data;
    const [char, yc, xc] = $event.item.data;

    // if (y === yc && x === xc ||
    //   this.map.rows[y].cells[x].component
    // ) {
    //   return;
    // }

    // this.map.rows[y].cells[x].character = char;
    // this.map.rows[yc].cells[xc].character = undefined;
  }

  public dragEntered($event: CdkDragEnter<any>) {
    const [y, x] = $event.container.data;
    const [char, yc, xc] = $event.item.data;

    console.log($event.container.data, $event.item.data);

  }
}
