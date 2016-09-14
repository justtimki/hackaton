import { Component } from '@angular/core';

import { RegistrationService } from './registration.service';

import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
    selector: 'registration-form',
    templateUrl: 'app/registration/registration.template.html',
    providers: [RegistrationService]
})
export class RegistrationFormComponent {

    private result;

    constructor(private registrationService: RegistrationService, private oauthService: OAuthService) {
     }

    doRegistration(value: any) {
        this.result =  this.registrationService.register(value);
        JSON.stringify(this.result);
    }
}