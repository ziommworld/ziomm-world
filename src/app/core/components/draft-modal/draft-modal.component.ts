import { Component, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


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
    MatIconModule,
  ],
  templateUrl: './draft-modal.component.html',
  styleUrl: './draft-modal.component.scss'
})
export class DraftModalComponent {
  public readonly fontSet = 'material-icons-outlined';

  @ViewChild('stepper')
  public stepper!: MatStepper;

  public playersFormArray = this.formBuilder.array([
    this.formBuilder.control('', [Validators.required]),
  ])

  public playersFormGroup = this.formBuilder.group({
    players: this.playersFormArray
  });

  public secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  public get isNextDisabled () {
    return !this.stepper?.selected?.stepControl.valid;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  public nextStep() {
    this.stepper.next();
  }

  public prevStep() {
    this.stepper.previous();
  }

  public addPlayer() {
    this.playersFormArray.push(
      this.formBuilder.control('', [Validators.required]),
    )
  }

  public removePlayer() {
    this.playersFormArray.removeAt(-1);
  }
}
