import { Component, Input, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


import { NgFor } from '@angular/common';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Character, CharacterState } from 'src/app/$character';
import { neo } from '@lib/characters/player/neo.config';
import { signalState } from '@ngrx/signals';


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

  public characters: Character[] = [
    new Character(neo, signalState({
      currentHP: 100,
      currentAP: 100,
    }))
  ];

  @ViewChild('stepper')
  private stepper!: MatStepper;

  public round = 1;

  constructor() {
    // this.initCharacters();
  }

  public initCharacters() {
    this.characters = [];
  }

  public resetStepper() {
    this.stepper.reset();
  }
}
