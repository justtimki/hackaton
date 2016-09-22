import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent, routing, appRoutingProviders }  from './app.component';
import { RegistrationFormComponent } from './registration/registration.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { OAuthService } from "angular2-oauth2/oauth-service";
import { VacationCartComponent } from "./feed/vacation/vacation-cart.component";
import {WindowService} from "./registration/window.service";
import { FooterComponent } from "./footer/main-footer.component";

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
],
  declarations: [ AppComponent, VacationCartComponent, SidebarComponent, HeaderComponent, ProfileComponent, FooterComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ OAuthService, WindowService, appRoutingProviders ]
})
export class AppModule { }
