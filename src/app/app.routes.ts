import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'game',
    loadChildren: () => import('./core/configs/game.routes')
      .then(m => m.GAME_ROUTES),
  },
];
