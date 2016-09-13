import { Component } from '@angular/core';

declare var $:any;

@Component({
    selector: 'sidebar',
    templateUrl: 'app/sidebar/sidebar.template.html'
    
})

export class SidebarComponent {

    constructor() {
        //UUI.Sidebar.init({open: true});
     }

    doSomthing(value: any) {
        
    }
}