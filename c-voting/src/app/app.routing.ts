import { Routes } from '@angular/router';
import { CVotingMainComponent } from './module-main/c-voting-main/c-voting-main.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: CVotingMainComponent
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
  ];
