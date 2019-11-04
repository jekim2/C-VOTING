import { Routes } from '@angular/router';
import { CVotingMainComponent } from './module-main/c-voting-main/c-voting-main.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: CVotingMainComponent,
    children: [
      {
        path: 'mainDetail',
        loadChildren: './module-main-detail/main-detail.module#MainDetailModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
  ];
