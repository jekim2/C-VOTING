import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './layouts/header-layout/header-layout.component';
import { InitiativeComponent } from './module-initiative/initiative/initiative.component';
import { ReviewComponent } from './module-review/review/review.component';
import { VoteComponent } from './module-vote/vote/vote.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    InitiativeComponent,
    ReviewComponent,
    VoteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      AppRoutes
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
