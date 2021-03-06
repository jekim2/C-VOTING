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
import { CVotingSearchComponent } from './module-main-detail/c-voting-search/c-voting-search.component';
import { MainDetailModule } from './module-main-detail/main-detail.module';
import { SharedModule } from './module-shared/shared.module';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CVotingMainComponent,
  ],
  imports: [
    BrowserModule,
    MainDetailModule,
    RouterModule.forRoot(
      AppRoutes,{useHash: true}
    ),
    RouterModule.forRoot(
      MainDetailRoutes,{useHash: true}
    ),
    SharedModule.forRoot(),
  ],
  providers:[{provide: APP_BASE_HREF, useValue : '/' }, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
