import { Component, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogRef } from '@angular/material/dialog';


import {
  maxTime, minTime, ScenarioKey, minDifficulty, maxDifficulty
} from 'src/app/$scenario';
import { CharacterKey } from 'src/app/$character';
import { characters } from '@lib/characters/index';
import { scenarios } from '@lib/scenarios/index';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-draft-modal',
  standalone: true,
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgFor,
    NgIf,
    NgClass,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
  ],
  templateUrl: './draft-modal.component.html',
  styleUrl: './draft-modal.component.scss'
})
export class DraftModalComponent {
  public readonly fontSet = 'material-icons-outlined';

  @ViewChild('stepper')
  public stepper!: MatStepper;

  // 1st step
  public playersFormArray = this.formBuilder.array([
    this.formBuilder.control('', [Validators.required]),
  ]);

  public playersFormGroup = this.formBuilder.group({
    players: this.playersFormArray
  });

  // 2nd step
  public scenarioFormControl = this.formBuilder.control('', [Validators.required]);

  public scenarioFormGroup = this.formBuilder.group({
    scenario: this.scenarioFormControl,
  });

  // 3rd step

  public charactersFormArray = this.formBuilder.array([
    this.formBuilder.group({
      player: this.formBuilder.control('', [Validators.required]),
      character: this.formBuilder.control('', [Validators.required]),
    })
  ]);

  public charactersFormGroup = this.formBuilder.group({
    characters: this.charactersFormArray
  });

  // 4th step
  public difficultyFormControl = this.formBuilder.control(100, [Validators.required]);
  public turnsFormControl = this.formBuilder.control(10, [Validators.required]);
  public timeFormControl = this.formBuilder.control(60, [Validators.required]);

  public settingsFormGroup = this.formBuilder.group({
    difficulty: this.difficultyFormControl,
    turns: this.turnsFormControl,
    time: this.timeFormControl,
  });

  // getter

  public get isNextDisabled() {
    return !this.stepper?.selected?.stepControl.valid;
  }

  public get scenarioKeys() {
    return Object.keys(scenarios) as ScenarioKey[];
  }

  public get selectedScenario() {
    const scenarioKey = this.scenarioFormControl.value as ScenarioKey;
    return scenarios[scenarioKey];
  }

  public get characterKeys() {
    return Object.keys(characters) as CharacterKey[];
  }

  public get minCharacters() {
    return this.selectedScenario.minCharacters;
  }

  public get maxCharacters() {
    return this.selectedScenario.maxCharacters;
  }

  public get minDifficulty() {
    return minDifficulty;
  }

  public get maxDifficulty() {
    return maxDifficulty;
  }

  public get minTime() {
    return minTime;
  }

  public get maxTime() {
    return maxTime;
  }

  public get minTurns() {
    return this.selectedScenario.defaultTurns / 2;
  }

  public get maxTurns() {
    return this.selectedScenario.defaultTurns * 2;
  }

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private dialogRef: MatDialogRef<DraftModalComponent>,
  ) {
  }

  // private

  private getDraftConfig() {
    return {
      players: this.playersFormArray.value,
      scenario: this.scenarioFormControl.value,
      characters: this.charactersFormArray.value,
      serttings: this.settingsFormGroup.value,
    }
  }

  // public

  public nextStep() {
    this.stepper.next();
  }

  public prevStep() {
    this.stepper.previous();
  }

  public addPlayer() {
    this.playersFormArray.push(
      this.formBuilder.control('', [Validators.required]),
    );
  }

  public removePlayer() {
    this.playersFormArray.removeAt(-1);
  }

  public addCharacter() {
    this.charactersFormArray.push(
      this.formBuilder.group({
        character: this.formBuilder.control('', [Validators.required]),
        player: this.formBuilder.control('', [Validators.required]),
      })
    );
  }

  public onSelectScenario() {
    if (this.charactersFormArray.length > this.selectedScenario.maxCharacters) {
      for (let i = this.charactersFormArray.length - 1; i >= this.selectedScenario.maxCharacters; i--) {
        this.charactersFormArray.removeAt(i);
      }
    }

    this.turnsFormControl.setValue(this.selectedScenario.defaultTurns);
  }

  public removeCharacter() {
    this.charactersFormArray.removeAt(-1);
  }

  public getScenarioNameByKey(key: ScenarioKey) {
    return scenarios[key].name;
  }

  public getCharacterNameByKey(key: CharacterKey) {
    return characters[key].name;
  }

  public startGame() {
    this.dialogRef.close(this.getDraftConfig());
  }
}
