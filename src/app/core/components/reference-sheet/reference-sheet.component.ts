import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor } from '@angular/common';

import { characters } from 'src/app/shared/configs/characters';
import { Character } from 'src/app/$character';
import { CharacterCardComponent } from '../character-card/character-card.component';


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

  public characters: Character[] = [];


  constructor() {
    this.initCharacters();
  }

  public initCharacters() {
    // this.characters =
  }
}
