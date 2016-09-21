import { Component } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
/*import { Router }   from '@angular/router';*/

@Component({
    //selector: 'header-login',
    templateUrl: 'app/profile/profile.template.html',
    providers: [RegistrationService]
})

export class ProfileComponent {
    private userInfo: any;
    private authenticated: boolean = false;
    private userPortraitUrl: string;
    private username: string;

    constructor(private registrationService: RegistrationService/*, private router: Router*/) {
        let user = this.registrationService.tryLogin();
        if (!user) {
            //alert("Error getting user info");
            return;
        }

        this.authenticated = true;
        this.userInfo = user;

        this.userPortraitUrl = this.resizeImageUrl(this.userInfo.image.url, 100);
        this.username = this.userInfo.displayName;
    }

    ngAfterViewInit() {

    }

    private resizeImageUrl(str: string, size: number) {
        return str.replace(/\?sz=\d+/g, "?sz=" + size);
    }
}