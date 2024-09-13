import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-initiative-tracker',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
  ],
  templateUrl: './initiative-tracker.component.html',
  styleUrl: './initiative-tracker.component.scss'
})
export class InitiativeTrackerComponent {
  public round = 1;
}
