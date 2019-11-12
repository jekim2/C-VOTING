import { MainDetailRoutes } from './main-detail.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitiativeComponent } from './initiative/initiative.component';
import { InitiativeRegistrationComponent } from './initiative-registration/initiative-registration.component';
import { VoteComponent } from './vote/vote.component';
import { VoteDetailComponent } from './vote/vote-detail/vote-detail.component';
import { CVotingSearchComponent } from './c-voting-search/c-voting-search.component';
import { ReviewComponent } from './review/review.component';
import { SharedModule } from '../module-shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(MainDetailRoutes)
  ],
  declarations: [
    InitiativeComponent,
    InitiativeRegistrationComponent,
    ReviewComponent,
    VoteComponent,
    VoteDetailComponent,
    CVotingSearchComponent
  ]
})
export class MainDetailModule { }
