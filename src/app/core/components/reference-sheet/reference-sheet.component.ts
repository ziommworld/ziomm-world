import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor } from '@angular/common';

import { CharacterCardComponent } from '../character-card/character-card.component';
import { GameService } from '../../services/game.service';


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

  public activeCharacters$ = this.gameService.$activeCharacters;

  constructor(
    private gameService: GameService,
  ) {
  }

}
