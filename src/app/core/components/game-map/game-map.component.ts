import { Component, computed, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  CdkDragEnter,
  CdkDragStart,
} from '@angular/cdk/drag-drop'
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { GameService } from '../../services/game.service';
import { calculateDist, coord2chess, GameMapCoordinate, MicroTileConfig, MicroTileState } from 'src/app/$map';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { ActionMenuComponent } from '../action-menu/action-menu.component';
import { GamePhase } from 'src/app/$game';
import { GameCharacter } from 'src/app/$character';


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
  public charactersDict = this.scenario.charactersDict;
  public npcsDict = this.scenario.npcsDict;

  // ===================== STATE =====================

  private $isDragging = signal(false);

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

  public getCellTooltip(config: MicroTileConfig, state: MicroTileState): string {
    if (this.$isDragging()) {
      return this.getMoveTooltip(config, state);
    }

    return this.getDefaultTooltip(config, state);
  }

  private getDefaultTooltip(config: MicroTileConfig, state: MicroTileState): string {
    const { x, y } = config.coord;

    const coordDisplay = coord2chess({ x, y }, this.$activeMap().config.size);
    const charName = state.characterId ?
      this.charactersDict[state.characterId].config.name ?? this.npcsDict[state.characterId].config.name :
      '';

    return `${coordDisplay} \n ${charName}`;
  }

  private getMoveTooltip(config: MicroTileConfig, state: MicroTileState): string {
    const activeCharacter$ = this.gameService.$activeCharacter();

    const origin = activeCharacter$.$position();
    const destination = config.coord;

    if (!origin) {
      return 'Invalid character origin position';
    }

    const distance = calculateDist(origin, destination);
    const cost = activeCharacter$.getMovementCost$(distance);

    const overdraftAP$ = cost - activeCharacter$.$currentAP();

    return `Distance: ${distance}, Cost: ${cost} \n ${overdraftAP$ > 0 ? 'Insufficient AP: ' + overdraftAP$ : ''}`;
  }

  public getCoordinate(y: number, x: number): GameMapCoordinate {
    return { y, x };
  }

  public onCharacterMove($event: CdkDragDrop<GameMapCoordinate, GameMapCoordinate, GameCharacter>) {
    const origin = $event.previousContainer.data;
    const destination = $event.container.data;
    const character = $event.item.data;

    const distance = calculateDist(origin, destination);
    const cost = character.getMovementCost$(distance);

    if (!character.hasAP$(cost)) {
      console.log('move - insufficient AP');
      return;
    }

    console.warn('move', origin, destination, character);

    this.gameService.moveCharacter(character.id, destination, cost);
  }

  public onCharacterMoveStart($event: CdkDragStart<GameCharacter>) {
    const char = $event.source.data;

    this.$isDragging.set(true);
  }

  public onCharacterMoveEnd($event: CdkDragStart<GameCharacter>) {
    const char = $event.source.data;

    this.$isDragging.set(false);
  }

  public onCharacterMoveHover($event: CdkDragEnter<any>) {
    const destination = $event.container.data;
    const character = $event.item.data;
  }

  public canMoveCharacter(character: GameCharacter): boolean {
    const gamePhase$ = this.gameService.$state().phase;

    if (gamePhase$ === GamePhase.PreGame) {
      return false;
    }

    const activeCharacter$ = this.gameService.$activeCharacter();

    return activeCharacter$.id === character.id;
  }

  public dragEntered($event: CdkDragEnter<any>) {
    const [y, x] = $event.container.data;
    const [char, yc, xc] = $event.item.data;

    console.log($event.container.data, $event.item.data);
  }

  public triggerMenu(config: MicroTileConfig, state: MicroTileState): MatMenu | null {
    if (this.gameService.$state().phase === GamePhase.PreGame) {
      const canBegin$ = this.gameService.$canBegin();

      if (state.characterId) {
        return this.actionMenu?.menu;
      } else {
        if (!canBegin$ && config.terrain === 'spawn') {
          return this.actionMenu?.menu;
        }

        return null;
      }
    } else if (this.gameService.$state().phase === GamePhase.InGame) {
      const activeCharacter$ = this.gameService.$activeCharacter();

      if (state.characterId && state.characterId !== activeCharacter$.id) {

        const abilities = activeCharacter$.abilities;
        const origin = activeCharacter$.$position();

        if (!origin) {
          throw new Error('Invalid character origin position');
        }

        const destination = config.coord;
        const distance = calculateDist(origin, destination);

        const activeAbilities = abilities.filter(
          ability => !ability.reactive &&
          ability.isInRange(distance) &&
          activeCharacter$.hasAP$(ability.config.baseAP)
        );

        if (activeAbilities.length > 0) {
          return this.actionMenu?.menu;
        }

        return null;
      }

      return null;
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
