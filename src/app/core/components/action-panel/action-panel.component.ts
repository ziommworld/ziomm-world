import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { GameService } from '../../services/game.service';


@Component({
  selector: 'app-action-panel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './action-panel.component.html',
  styleUrl: './action-panel.component.scss'
})
export class ActionPanelComponent {

  constructor(
    private gameService: GameService,
  ) {

  }

  public test() {
  }

}
