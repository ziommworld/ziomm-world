import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor } from '@angular/common';

import { Character } from 'src/app/$character';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { neo } from '@lib/characters/player/neo.config';
import { signalState } from '@ngrx/signals';


@Component({
  selector: 'app-reference-sheet',
  standalone: true,
  imports: [
    MatTabsModule,
    MatIcon,
    MatExpansionModule,
    NgFor,
    CharacterCardComponent
  ],
  templateUrl: './reference-sheet.component.html',
  styleUrl: './reference-sheet.component.scss'
})
export class ReferenceSheetComponent {
  public readonly fontSet = 'material-icons-outlined';

  public characters: Character[] = [
    new Character(neo, signalState({
      currentHP: 100,
      currentAP: 100,
    }))
  ]

  constructor() {
    this.initCharacters();
  }

  public initCharacters() {
    // this.characters =
  }
}
