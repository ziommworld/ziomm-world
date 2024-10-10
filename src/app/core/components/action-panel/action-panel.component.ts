import { Component, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { GameService } from '../../services/game.service';
import { NgIf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';


@Component({
  selector: 'app-action-panel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    NgIf,
    MatChipsModule,
    MatIcon,
    MatBadgeModule,
  ],
  templateUrl: './action-panel.component.html',
  styleUrl: './action-panel.component.scss'
})
export class ActionPanelComponent {
  public readonly fontSet = 'material-icons-outlined';

  public $inGame = this.gameService.$inGame;
  public $activeCharacter = this.gameService.$activeCharacter;

  public $actions = computed(() => {
    return this.$activeCharacter().config.actions;
  });

  public $waitAction = computed(() => {
    const activeCharacter$ = this.$activeCharacter();
    const action = activeCharacter$.getAction('wait');
    return action;
  });

  public $canWait = computed(() => {
    const action = this.$waitAction();
    return this.gameService.$activeCharacter().$currentAP() >= action.config.baseAP;
  });

  public $passAction = computed(() => {
    const activeCharacter$ = this.$activeCharacter();
    const action = activeCharacter$.getAction('pass');
    return action;
  });

  public $canPass = computed(() => {
    const action = this.$passAction();
    return this.gameService.$activeCharacter().$currentAP() >= action.config.baseAP;
  });


  constructor(
    private gameService: GameService,
  ) {

  }

  public wait() {
    const activeCharacter$ = this.$activeCharacter();
    const action = activeCharacter$.getAction('wait');

    this.gameService.characterWait(activeCharacter$.id, action.config);
  }

  public pass() {
    const activeCharacter$ = this.$activeCharacter();
    const action = activeCharacter$.getAction('pass');

    this.gameService.characterPass(activeCharacter$.id, action.config);
  }

  public end() {
    this.gameService.endTurn();
  }
}
