import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { RegistrationFormComponent } from './registration/registration.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OAuthService } from "angular2-oauth2/oauth-service";


@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule
],
  declarations: [ AppComponent, RegistrationFormComponent, SidebarComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ OAuthService ]
})
export class AppModule { }
