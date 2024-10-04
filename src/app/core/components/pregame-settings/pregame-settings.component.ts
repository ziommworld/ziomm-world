import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GameService } from '../../services/game.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { GameMapCoordinate, TerrainType } from 'src/app/$map';
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

  // ===================== CONFIG =====================

  public characters = this.gameService.characters;

  public charactersSequence = [
    ...this.characters,
  ];

  // ===================== STATE =====================

  public $characters = this.gameService.$characters;
  public $canBegin = this.gameService.$canBegin;

  constructor(
    private gameService: GameService,
  ) {

  }

  public beginGame() {
    this.gameService.beginGame();
  }

  public randomize() {
    this.reset();
    const spawnTiles = this.gameService.$activeMap().tiles.flat().filter(tile => tile.terrain === TerrainType.Spawn);

    // suffle
    spawnTiles.sort(() => Math.random() - 0.5);
    this.charactersSequence.sort(() => Math.random() - 0.5);

    this.charactersSequence.forEach((char, idx) => {
      this.gameService.placeCharacter(char.id, spawnTiles[idx]);
    });

    this.gameService.changeInitiative(this.charactersSequence);
  }

  public reset() {
    this.gameService.displaceAllCharacters();
  }

  public getPlacementIcon(coord?: GameMapCoordinate) {
    return !!coord ? 'where_to_vote' : 'location_off';
  }

  public getPlacementIconClass(coord?: GameMapCoordinate) {
    return !!coord ? 'is-placed' : null;
  }

  public changeInitiative(event: CdkDragDrop<GameCharacterConfig[]>) {
    moveItemInArray(this.charactersSequence, event.previousIndex, event.currentIndex);
    this.gameService.changeInitiative(this.charactersSequence);
  }
}
