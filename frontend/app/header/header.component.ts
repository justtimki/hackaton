import { Component } from '@angular/core';
import { OAuthService } from "angular2-oauth2/oauth-service";

declare var UUI: any;
//declare var $:any;

@Component({
    selector: 'header-login',
    templateUrl: 'app/header/header.template.html'
    
})

export class HeaderComponent {

    constructor() {
        
     }

    startGoogleLogin() {
        alert("Some day, perhaps.");
    }

    ngAfterViewInit() {
        UUI.Header_Tools.init();
    }
}