import { Routes } from '@angular/router';

import { InitiativeComponent } from './initiative/initiative.component';
import { InitiativeRegistrationComponent } from './initiative-registration/initiative-registration.component';

export const MainDetailRoutes: Routes = [
    { path: 'initiative', component: InitiativeComponent},
    { path: 'initiative/registration', component: InitiativeRegistrationComponent}
];
