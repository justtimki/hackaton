import { Component, OnInit } from '@angular/core';

import { VacationService } from './vacation.service';
import { Vacation } from '../../domain/vacation';
import * as Collections from 'typescript-collections';

@Component({
    selector: 'vacation-cart',
    templateUrl: 'app/feed/vacation/vacation-cart.template.html',
    providers: [VacationService]
})
export class VacationCartComponent implements OnInit {
    vacations: Vacation[] = null;
    errorMsg: string = null;

    constructor(private vacationService: VacationService) {
    }

    ngOnInit() {
        this.getVacations();
    }

    getVacations() {
        this.vacationService.getVacations().
            subscribe(
                vacations => this.vacations = vacations,
                error => this.errorMsg = error);
    }
}