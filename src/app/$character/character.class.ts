import { v4 as uuidv4 } from 'uuid';
import { SignalState } from '@ngrx/signals';

import { CharacterConfig, CharacterState } from '.';
import { ActionModality } from '../$mechanics';


export class Character {
  private _id: string;

  public get id() {
    return this._id;
  }

  // config

  public get name() {
    return this.config.name;
  }

  public get icon() {
    return this.config.icon;
  }

  public get proficiency() {
    return this.config.proficiency;
  }

  public get resistance() {
    return this.config.resistance;
  }

  public get maxHP() {
    return this.config.maxHP;
  }

  public get defaultMS() {
    return this.config.baseMS;
  }

  public get techLvl() {
    return this.config.techLvl;
  }

  // state

  public get currentHP() {
    return this.state.currentHP;
  }

  public get currentAP() {
    return this.state.currentAP;
  }

  constructor(
    private config: CharacterConfig,
    private state: SignalState<CharacterState>
  ) {
    this._id = uuidv4();
  }

  // private charCheck() {
  //   if (this.stats.initiative === 0) {
  //     throw new Error('Character has no initiative');
  //   }
  // }

  // public setInitiative(initiative?: number) {
  //   // TODO init all initiatives with a static var/function
  //   if (initiative) {
  //     this.stats.initiative = initiative;
  //   }
  // }

  // public doAction(actionKey: string, modality?: ActionModality) {
  //   this.charCheck();
  //   const action = this.config.actions.find(ability => ability.key === actionKey);
  //   if (!action) {
  //     throw new Error('Action not found');
  //   }

  //   if (this.stats.currentAP < action.baseAP) {
  //     throw new Error('Not enough AP');
  //   }

  //   this.stats.currentAP -= action.baseAP;
  // }
}
