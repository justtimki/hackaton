import { Component } from '@angular/core';
import { OAuthService } from "angular2-oauth2/oauth-service";
import { RegistrationService } from '../registration/registration.service';

declare var UUI: any;
//declare var $:any;

@Component({
    selector: 'header-login',
    templateUrl: 'app/header/header.template.html',
    providers: [RegistrationService]
})

export class HeaderComponent {
    private registrationService: RegistrationService;
    username: string;
    authenticated: boolean;
    userInfo: any;

    constructor(registrationService: RegistrationService) {
        this.registrationService = registrationService;
    }

    startGoogleAuth() {
        this.registrationService.startGoogleAuth(this);
    }

    logoutGoogle() {
        this.registrationService.doLogout();
        this.authenticated = false;
        this.username = null;
        this.userInfo = null;
        return false;
    }

    onUserLogin(user: any) {
        if (!user) {
            // TODO handle if a case
            return;
        }
        
        this.userInfo = user;
        this.username = this.userInfo.displayName.split(" ")[0];

        this.authenticated = true;
    }

    ngAfterViewInit() {
        UUI.Header_Tools.init();
    }
}