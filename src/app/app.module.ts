import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SwiperModule} from 'swiper/angular';
import SwiperCore, {Navigation} from 'swiper';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PortfolioComponent} from './portfolio/portfolio.component';
import {ProjectComponent} from './portfolio/project/project.component';
import {HttpClientModule} from '@angular/common/http';

SwiperCore.use([Navigation]);
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
    AppRoutingModule,
    SwiperModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
