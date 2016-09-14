import { Component } from '@angular/core';

declare var $:any;

@Component({
    selector: 'sidebar',
    templateUrl: 'app/sidebar/sidebar.template.html'
    
})

export class SidebarComponent {

    constructor() {
        
     }

    doSomthing(value: any) {
        
    }

    ngAfterViewInit() {
        UUI.Sidebar.init({open: true, animate: true});

        $(".sidebar-menu li").click(function() {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        });
    }
}