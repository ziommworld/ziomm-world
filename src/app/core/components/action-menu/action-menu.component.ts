import { Component, computed, Signal, ViewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

import { placeCharacter, displaceCharacter } from '@lib/mechanics/interaction.configs';
import { GamePhase } from 'src/app/$game';
import { ActionMenuItem, ActionMenuSubItem } from 'src/app/$mechanics';
import { GameService } from '../../services/game.service';


@Component({
  selector: 'app-action-menu',
  standalone: true,
  imports: [
    MatMenuModule
  ],
  templateUrl: './action-menu.component.html',
  styleUrl: './action-menu.component.scss'
})
export class ActionMenuComponent {
  @ViewChild(MatMenu)
  public menu!: MatMenu;

  public $state = this.gameService.$state;
  public characters = this.gameService.characters;

  public $menuItems: Signal<ActionMenuItem[]> = computed(() => {
    const activeTile = this.gameService.$activeTile();

    if (!activeTile) {
      return [];
    }

    const state$ = this.$state();
    const characters$ = this.gameService.$characters();
    const canBegin$ = this.gameService.$canBegin();
    const activeMap$ = this.gameService.$activeMap().$state();

    const {
      coord: { x, y }
    } = activeTile;

    const activeTile$ = activeMap$.tiles[y][x];

    if (state$.phase === GamePhase.PreGame) {
      const actions: ActionMenuItem[] = [];

      if (activeTile$.characterId) {
        actions.push({
          key: 'displaceCharacter',
          label: displaceCharacter.name,
          tile: activeTile,
        });
      } else if (!canBegin$) {
        actions.push({
          key: 'placeCharacter',
          label: placeCharacter.name,
          tile: activeTile,
          subItems: this.characters
            .filter(
              (character) => {
                return !characters$[character.id].position;
              }
            ).map(
              (character) => ({
                key: character.id,
                label: character.name,
              })
            )
        });
      }

      return actions;
    }

    const buttons: ActionMenuItem[] = [

    ];

    return buttons;
  });

  constructor(
    private gameService: GameService,
  ) {
  }

  public onMenuItemClick(item: ActionMenuItem, subItem?: ActionMenuSubItem): void {
    const {
      tile,
      subItems,
    } = item;

    if (subItems && !subItem) {
      return;
    }

    switch (item.key) {
      case 'placeCharacter': {
        const charId = subItem!.key;

        this.gameService.placeCharacter(charId, tile);
        break;
      }

      case 'displaceCharacter': {
        this.gameService.displaceCharacter(tile);
        break;
      }

      default:
        throw new Error(`Unknown action: ${item.key}`);
    }
  }
}
