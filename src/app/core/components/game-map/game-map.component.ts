import { Component, computed, ViewChild } from '@angular/core';
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
import { coord2chess, GameMapCoordinate, MicroTileConfig } from 'src/app/$map';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { ActionMenuComponent } from '../action-menu/action-menu.component';
import { GamePhase } from 'src/app/$game';


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
    MatMenuModule,
    ActionMenuComponent
  ],
  templateUrl: './game-map.component.html',
  styleUrl: './game-map.component.scss'
})
export class GameMapComponent {
  @ViewChild('actionMenu')
  public actionMenu!: ActionMenuComponent;

  public scenario = this.gameService.scenario;
  public maps = this.scenario.maps;

  public $tiles = computed(() => {
    return this.scenario.$state.maps()[this.scenario.$state().activeMap].tiles;
  });

  public $currentMap = computed(() => {
    const activeMap = this.maps.find(
      map => map.config.key === this.scenario.$state().activeMap
    );

    if (!activeMap) {
      throw new Error('No active map found.');
    }

    return activeMap;
  });

  constructor(
    private gameService: GameService
  ) {

  }

  public getCellTooltip(coord: GameMapCoordinate): string {
    const {
      x,
      y,
    } = coord;

    return coord2chess({ x, y }, this.$currentMap().config.size)
  }

  public getCharacterIcon(characterId: string): string {
    return this.scenario.charactersDict[characterId].config.icon;
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

  public triggerMenu(tile: MicroTileConfig): MatMenu | null {
    if (this.gameService.$state().phase === GamePhase.PreGame) {
      const tileState = this.$currentMap().$state().tiles[tile.coord.y][tile.coord.x];
      const canBegin = this.gameService.$canBegin();

      if (tile.terrain === 'spawn' && tileState.characterId) {
        return this.actionMenu?.menu;
      } else {
        if (!canBegin) {
          return this.actionMenu?.menu;
        }

        return null;
      }
    } else if (this.gameService.$state().phase === GamePhase.InGame) {
      if (tile.terrain === 'spawn') {
        return null;
      } else {
        return this.actionMenu?.menu;
      };
    } else {
      return null;
    }
  }

  public onLeftClick($event: MouseEvent, cell: MicroTileConfig) {
    this.gameService.$activeTile.set(cell);
  }

  public onRightClick($event: MouseEvent, cell: MicroTileConfig) {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
