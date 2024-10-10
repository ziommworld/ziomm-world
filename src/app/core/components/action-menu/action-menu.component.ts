import { Component, computed, Signal, ViewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

import { placeCharacter, displaceCharacter } from '@lib/mechanics/interaction.configs';
import { GamePhase } from 'src/app/$game';
import { ActionMenuItem, ActionMenuSubItem } from 'src/app/$mechanics';
import { GameService } from '../../services/game.service';
import { calculateDist } from 'src/app/$map';
import { MatIcon } from '@angular/material/icon';
import { actions } from '@lib/mechanics/index';


@Component({
  selector: 'app-action-menu',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIcon,
  ],
  templateUrl: './action-menu.component.html',
  styleUrl: './action-menu.component.scss'
})
export class ActionMenuComponent {
  @ViewChild(MatMenu)
  public menu!: MatMenu;

  public characters = this.gameService.characters;

  public $state = this.gameService.$state;
  public $activeCharacter = this.gameService.$activeCharacter;

  public $menuItems: Signal<ActionMenuItem[]> = computed(() => {
    const activeTile = this.gameService.$activeTile();

    if (!activeTile) {
      return [];
    }

    const state$ = this.$state();
    const characters$ = this.gameService.$characters();
    const canBegin$ = this.gameService.$canBegin();
    const activeMap$ = this.gameService.$activeMap();
    const activeCharacter$ = this.$activeCharacter();

    const {
      coord: { x, y }
    } = activeTile;

    const activeTile$ = activeMap$.$tiles()[y][x];

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
    } else if (state$.phase === GamePhase.InGame) {
      const origin = activeCharacter$.$position();

      if (!origin) {
        throw new Error('Invalid character origin position');
      }

      const destination = activeTile.coord;
      const distance = calculateDist(origin, destination);

      const menuItems = activeCharacter$.abilities
        .filter(
          (ability) => {
            return !ability.reactive &&
              ability.isInRange(distance) &&
              activeCharacter$.hasAP$(ability.config.baseAP);
          }
        ).map(
          (ability) => {
            return {
              key: ability.key,
              icon: 'construction',
              label: ability.name,
              tile: activeTile,
              target: activeTile$.characterId,
            };
          }
        );

      return menuItems.length > 0 ? menuItems : [];
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
      label,
      icon,
      target,
      subItems,
    } = item;

    if (subItems && !subItem) {
      return;
    }

    const activeCharacter$ = this.$activeCharacter();

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

      default: {
        if (item.key in actions) {
          const actionConfig = this.$activeCharacter().getAction(item.key).config;

          const targetCharacter = target ? this.gameService.scenario.charactersDict[target] : undefined;

          this.gameService.characterAction(actionConfig.id, activeCharacter$, targetCharacter);
        } else {
          throw new Error(`Unknown action: ${item.key}`);
        }
      }
    }
  }
}
