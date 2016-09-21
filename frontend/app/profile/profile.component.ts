import { Component } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';

@Component({
    //selector: 'header-login',
    templateUrl: 'app/profile/profile.template.html',
    providers: [RegistrationService]
})

export class ProfileComponent {
    constructor(private registrationService: RegistrationService) {
        
    }
}