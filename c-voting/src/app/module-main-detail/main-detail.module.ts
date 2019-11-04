import { MainDetailRoutes } from './main-detail.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitiativeComponent } from './initiative/initiative.component';
import { InitiativeRegistrationComponent } from './initiative/initiative-registration/initiative-registration.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainDetailRoutes)
  ],
  declarations: [
    InitiativeComponent,
    InitiativeRegistrationComponent
  ]
})
export class MainDetailModule { }
