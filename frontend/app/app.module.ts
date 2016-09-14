import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent, routing, appRoutingProviders }  from './app.component';
import { RegistrationFormComponent } from './registration/registration.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OAuthService } from "angular2-oauth2/oauth-service";
import { VacationCartComponent } from "./feed/vacation/vacation-cart.component";

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
],
  declarations: [ AppComponent, VacationCartComponent, SidebarComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ OAuthService, appRoutingProviders ]
})
export class AppModule { }
