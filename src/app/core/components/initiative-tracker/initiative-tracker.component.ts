import { Component, Input, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { Character } from 'src/app/$character';
import { MatIcon } from '@angular/material/icon';


import { characters } from '@lib/characters';
import { NgFor } from '@angular/common';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';


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

  public characters: Character[] = [];

  @ViewChild('stepper')
  private stepper!: MatStepper;

  public round = 1;

  constructor() {
    this.initCharacters();
  }

  public initCharacters() {
    this.characters = [];
  }

  public resetStepper() {
    this.stepper.reset();
  }
}
