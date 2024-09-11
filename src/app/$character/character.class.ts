import { v4 as uuidv4 } from 'uuid';
import { CharacterConfig, CharacterState, CharacterStats } from '.';
import { ActionModality } from '../$mechanics';

export class Character {
  private _id: string;

  private state!: CharacterState;
  private stats!: CharacterStats;

  public get id() {
    return this._id;
  }

  constructor (
    private key: string,
    private config: CharacterConfig,
  ) {
    this._id = uuidv4();
    this.initStats();
    this.initState();
  }

  private initStats() {
    this.stats = {
      initiative: 0,
      currentAP: 6,
      currentHP: this.config.maxHP,
    };
  }

  private initState() {
    this.state = {
      isCrouching: false,

      bolsterCounter: 0,
      bleedCounter: 0,
      poisonCounter: 0,
      concussionCounter: 0,
      immobilizeCounter: 0,
      hinderCounter: 0,
    };
  }

  private charCheck() {
    if (this.stats.initiative === 0) {
      throw new Error('Character has no initiative');
    }
  }

  public setInitiative(initiative?: number) {
    // TODO init all initiatives with a static var/function
    if (initiative) {
      this.stats.initiative = initiative;
    }
  }

  public doAction(actionKey: string, modality?: ActionModality) {
    this.charCheck();
    const action = this.config.actions.find(ability => ability.key === actionKey);
    if (!action) {
      throw new Error('Action not found');
    }

    if (this.stats.currentAP < action.costAP) {
      throw new Error('Not enough AP');
    }

    this.stats.currentAP -= action.costAP;
  }
}
