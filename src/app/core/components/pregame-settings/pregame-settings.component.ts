import { Component, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GameService } from '../../services/game.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { GameMapCoordinate } from 'src/app/$map';
import { NgClass } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { GameCharacterConfig } from 'src/app/$character';

@Component({
  selector: 'app-pregame-settings',
  standalone: true,
  imports: [
    MatButtonModule,
    DragDropModule,
    MatChipsModule,
    MatIcon,
    NgClass,
    MatListModule,
  ],
  templateUrl: './pregame-settings.component.html',
  styleUrl: './pregame-settings.component.scss'
})
export class PreGameSettingsComponent {
  public readonly fontSet = 'material-icons-outlined';

  public $characters = this.gameService.$characters;
  public $canBegin = this.gameService.$canBegin;

  public getPlacementIcon(coord?: GameMapCoordinate) {
    return !!coord ? 'where_to_vote' : 'location_off';
  }

  public getPlacementIconClass(coord?: GameMapCoordinate) {
    return !!coord ? 'is-placed' : null;
  }

  public get characters() {
    return this.gameService.characters
  }

  public charactersSequence = [
    ...this.characters,
  ];

  constructor(
    private gameService: GameService,
  ) {

  }

  public changeInitiative(event: CdkDragDrop<GameCharacterConfig[]>) {
    moveItemInArray(this.charactersSequence, event.previousIndex, event.currentIndex);
    this.gameService.changeInitiative(this.charactersSequence);
  }

  public beginGame() {
    this.gameService.beginGame();
  }

  public randomize() {
    console.log('randomize');
  }
}
