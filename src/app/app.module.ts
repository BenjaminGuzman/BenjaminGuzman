import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PortfolioComponent} from './portfolio/portfolio.component';
import {ProjectComponent} from './portfolio/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    PortfolioComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
