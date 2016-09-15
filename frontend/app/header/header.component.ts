import { Component } from '@angular/core';

declare var UUI: any;
//declare var $:any;

@Component({
    selector: 'header-login',
    templateUrl: 'app/header/header.template.html'
    
})

export class HeaderComponent {

    constructor() {
        
     }

    openLoginPopup() {
        alert("Some day, perhaps.");

        return false;
    }

    ngAfterViewInit() {
        UUI.Header_Tools.init();
    }
}