import { Component } from '@angular/core';

import { RegistrationService } from './registration.service';

@Component({
    selector: 'registration-form',
    templateUrl: 'app/registration/registration.template.html',
    providers: [RegistrationService]
})
export class RegistrationFormComponent {

    private result;

    constructor(private registrationService: RegistrationService) {
        
    }

    doRegistration(value: any) {
        // this.result =  this.registrationService.register(value);
        // JSON.stringify(this.result);
    }
}