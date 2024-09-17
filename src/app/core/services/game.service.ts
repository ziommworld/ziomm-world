import { Injectable } from '@angular/core';
import { GameEngine } from 'src/app/$mechanics';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private engine: GameEngine | null = null;

  constructor(
    private appService: AppService,
  ) { }


}
