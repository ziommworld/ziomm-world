import { Component, effect, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { GameService } from '../../services/game.service';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { GameCharacter } from 'src/app/$character';


@Component({
  selector: 'app-initiative-tracker',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    NgFor,
    MatIcon,
    CharacterCardComponent,
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './initiative-tracker.component.html',
  styleUrl: './initiative-tracker.component.scss'
})
export class InitiativeTrackerComponent {
  public readonly fontSet = 'material-icons-outlined';

  public $currentTurn = this.gameService.$currentTurn;
  public $currentRound = this.gameService.$currentRound;
  public $activeCharacters = this.gameService.$activeCharacters;

  @ViewChild('stepper')
  private stepper!: MatStepper;

  constructor(
    private gameService: GameService,
  ) {

    this.initRoundResetEffects();
  }

  private initRoundResetEffects() {
    effect(() => {
      const round = this.$currentRound();

      this.resetStepper();
    });
  }

  public getPlayedBy(char: GameCharacter) {
    return char.player
      ? `Played by ${char.player}`
      : 'NPC';
  }

  public resetStepper() {
    this.stepper.reset();
  }
}
