import { Component, computed, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Character } from 'src/app/$character';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';


@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    MatBadgeModule,
    MatMenuModule,
    OverlayModule
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  public readonly fontSet = 'material-icons-outlined';

  isOpen = false;


  @Input()
  public character!: Character;

  // TODO remove ? from currentHP
  public charHP = computed(() => {
    return Math.floor(this.character.currentHP?.() ?? 10 / this.character.maxHP * 100);

  });

  constructor(
    private overlay: Overlay
  ) {
    const ref = this.overlay.create();
    ref.backdropClick().subscribe(() => {
      console.warn
    });
  }

  test() {
    this.isOpen = !this.isOpen;
  }
}
