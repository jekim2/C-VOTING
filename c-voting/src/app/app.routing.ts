import { Routes } from '@angular/router';
import { HeaderLayoutComponent } from "./layouts/header-layout/header-layout.component";

export const AppRoutes: Routes = [
  {
    path: '',
    component: HeaderLayoutComponent,
    children: [
      {
        path: 'initiative',
        loadChildren: './module-initiative/initiative.module#InitiativeModule'
      },
      {
        path: 'review',
        loadChildren: './module-review/initiative.module#ReviewModule'
      },
      {
        path: 'vote',
        loadChildren: './module-vote/initiative.module#VoteModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
  ];
  