import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SwiperModule} from 'swiper/angular';
import SwiperCore, {Lazy, Navigation} from 'swiper';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PortfolioComponent} from './portfolio/portfolio.component';
import {ProjectComponent} from './portfolio/project/project.component';
import {HttpClientModule} from '@angular/common/http';
import {SocialMediaComponent} from './social-media/social-media.component';
import {DataBackgroundDirective} from './data-background.directive';
import {SkillsComponent} from './skills/skills.component';
import {SkillComponent} from './skills/skill/skill.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AboutExtraComponent} from './about-extra/about-extra.component';

SwiperCore.use([Navigation, Lazy]);
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    PortfolioComponent,
    ProjectComponent,
    SocialMediaComponent,
    DataBackgroundDirective,
    SkillsComponent,
    SkillComponent,
    AboutExtraComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SwiperModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
