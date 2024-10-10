import { Component, computed, Input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameCharacter } from 'src/app/$character';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { NgClass, NgFor } from '@angular/common';
import { DamageType, GameAction, GameActionType } from 'src/app/$mechanics';


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
    OverlayModule,
    NgFor,
    NgClass,
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  public readonly fontSet = 'material-icons-outlined';

  public $isOpen = signal([false, false, false]);

  @Input()
  public character!: GameCharacter;

  public $percentageHP = computed(() => {
    return Math.floor(this.character.$currentHP() / this.character.maxHP * 100);
  });

  constructor(
    private overlay: Overlay
  ) {
    const ref = this.overlay.create();
    ref.backdropClick().subscribe(() => {
      console.warn
    });
  }

  public getAbilityClass(ability: GameAction) {
    if (ability.type === GameActionType.Attack) {
      return {
        'attack-action': true,
      }
    }

    if (ability.type === GameActionType.Defense) {
      return {
        'defense-action': true,
      }
    }

    if (ability.type === GameActionType.Special) {
      return {
        'special-action': true,
      }
    }

    return null;
  }

  public getDamageTypeClass(ability: GameAction) {
    if (ability.damageType === DamageType.Physical) {
      return {
        'physical-damage': true,
      }
    }

    if (ability.damageType === DamageType.Elemental) {
      return {
        'elemental-damage': true,
      }
    }

    if (ability.damageType === DamageType.Nuclear) {
      return {
        'nuclear-damage': true,
      }
    }

    return null;
  }

  public isTrueDamage(ability: GameAction) {
    return ability.damageType === DamageType.True;
  }

  public getDamageLabel(ability: GameAction) {
    return `${ability.damageType?.toUpperCase()} damage`;
  }

  public triggerAbilityPanel(idx: number) {
    const isOpen$ = this.$isOpen();
    this.$isOpen.set([
      ...isOpen$.slice(0, idx),
      !isOpen$[idx],
      ...isOpen$.slice(idx + 1)
    ]);
  }
}
