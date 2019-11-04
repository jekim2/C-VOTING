import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { CVotingMainComponent } from './module-main/c-voting-main/c-voting-main.component';


@NgModule({
  declarations: [
    AppComponent,
    CVotingMainComponent
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
