import { Component, computed, Signal, ViewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { GameService } from '../../services/game.service';
import { GamePhase } from 'src/app/$game';
import { GameActionKey } from 'src/app/$mechanics';
import { placeCharacter } from '@lib/mechanics/interaction.configs';
import { MicroTileConfig } from 'src/app/$map';


interface ActionMenuItem {
  key: GameActionKey;
  label: string;
  tile: MicroTileConfig;

  subItems?: ActionMenuSubItem[];
}

interface ActionMenuSubItem {
  key: string;
  label: string;
}

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
  public config = this.gameService.config;

  public $menuItems: Signal<ActionMenuItem[]> = computed(() => {
    const activeTile = this.gameService.$activeTile();
    const characters = this.$state.scenario.characters();

    const canBegin = this.config.scenario.characters.every(
      (character) => !!characters[character.id].position
    );

    if (!activeTile) {
      return [];
    }

    const $state = this.$state();
    const activeMapKey = $state.scenario.activeMap;
    const activeMap = $state.scenario.maps[activeMapKey];
    const {
      coord: {
        x,
        y,
      }
    } = activeTile;

    const activeTileState = activeMap.tiles[y][x];

    if ($state.phase === GamePhase.PreGame) {
      const actions: ActionMenuItem[] = [];

      if (activeTileState.characterId) {
        actions.push({
          key: 'displaceCharacter',
          label: 'Displace Character',
          tile: activeTile,
        });
      } else if (!canBegin) {
        actions.push({
          key: 'placeCharacter',
          label: placeCharacter.name,
          tile: activeTile,
          subItems: this.config.scenario.characters
            .filter(
              (character) => {
                return !characters[character.id].position;
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
