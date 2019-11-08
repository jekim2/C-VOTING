import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { CVotingMainComponent } from './module-main/c-voting-main/c-voting-main.component';
import { InitiativeComponent } from './module-main-detail/initiative/initiative.component';
import { InitiativeRegistrationComponent } from './module-main-detail/initiative-registration/initiative-registration.component';
import { MainDetailRoutes } from './module-main-detail/main-detail.routing';
import { VoteComponent } from './module-main-detail/vote/vote.component';
import { VoteDetailComponent } from './module-main-detail/vote/vote-detail/vote-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CVotingMainComponent,
    InitiativeComponent,
    InitiativeRegistrationComponent,
    VoteComponent,
    VoteDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      AppRoutes
    ),
    RouterModule.forRoot(
      MainDetailRoutes
    ),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
