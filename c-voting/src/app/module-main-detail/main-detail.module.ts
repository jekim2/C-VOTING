import { MainDetailRoutes } from './main-detail.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitiativeComponent } from './initiative/initiative.component';
import { InitiativeRegistrationComponent } from './initiative-registration/initiative-registration.component';
import { VoteComponent } from './vote/vote.component';
import { VoteDetailComponent } from './vote/vote-detail/vote-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainDetailRoutes)
  ],
  declarations: [
    InitiativeComponent,
    InitiativeRegistrationComponent,
    VoteComponent,
    VoteDetailComponent
  ]
})
export class MainDetailModule { }
