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
import { GameCharacter, GameCharacterTeam } from 'src/app/$character';


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

  // ===================== CONFIG =====================

  public scenario = this.gameService.scenario;
  public mapsDict = this.scenario.mapsDict;

  // ===================== STATE =====================

  public $tiles = computed(() => {
    return this.scenario.$state.maps()[this.scenario.$state().activeMap].tiles;
  });

  public $activeMap = this.gameService.$activeMap;

  constructor(
    private gameService: GameService
  ) {

  }

  public getCharacterIcon(character: GameCharacter): string {
    return character.config.icon;
  }

  public getCharacterIconClass(character: GameCharacter) {
    const team = character.config.team;

    return team;
  }

  public getCharacterCellBadge(character: GameCharacter) {
    return character.config.iconBadge;
  }

  public getCharacterCellBadgePosition(character: GameCharacter) {
    // icon badge is inheriting position from cell badge if it does not exist
    return character.config.iconBadge ? 'above' : 'below';
  }

  public getCharacterIconBadge(character: GameCharacter) {
    return character.showIdx ? character.idx : null;
  }

  public getCellTooltip(coord: GameMapCoordinate): string {
    const { x, y } = coord;

    return coord2chess({ x, y }, this.$activeMap().config.size)
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
      const tile$ = this.$activeMap().$state().tiles[tile.coord.y][tile.coord.x];
      const canBegin$ = this.gameService.$canBegin();

      if (tile$.characterId) {
        return this.actionMenu?.menu;
      } else {
        if (!canBegin$ && tile.terrain === 'spawn') {
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
