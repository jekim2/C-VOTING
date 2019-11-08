import { Routes } from '@angular/router';

import { InitiativeComponent } from './initiative/initiative.component';
import { InitiativeRegistrationComponent } from './initiative-registration/initiative-registration.component';
import { VoteComponent } from './vote/vote.component';
import { VoteDetailComponent } from './vote/vote-detail/vote-detail.component';

export const MainDetailRoutes: Routes = [
    { path: 'initiative', component: InitiativeComponent},
    { path: 'initiative/registration', component: InitiativeRegistrationComponent},
    { path: 'vote', component: VoteComponent},
    { path: 'vote/detail', component: VoteDetailComponent}
];
