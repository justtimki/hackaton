import { Component } from '@angular/core';
declare var $: any;

@Component({
    templateUrl: 'app/add-vacation/add-vacation.template.html',
    providers: []
})

export class AddVacationComponent {
    constructor() {

    }

    ngAfterViewInit() {
        $('#pickerDateRange').uui_datepicker({ todayHighlight: true });
        $('.fileinput').fileinput();
    }
}