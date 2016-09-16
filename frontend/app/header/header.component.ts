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

    constructor(registrationService: RegistrationService) {
        this.registrationService = registrationService;
    }

    startGoogleAuth() {
        this.registrationService.startGoogleAuth(this);
    }

    onUserLogin(user: any) {
        alert(user.displayName);
    }

    ngAfterViewInit() {
        UUI.Header_Tools.init();
    }
}