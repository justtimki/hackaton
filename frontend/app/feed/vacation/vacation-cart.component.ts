import { Component, OnInit } from '@angular/core';

import { VacationService } from './vacation.service';
import { Vacation } from '../../domain/vacation';

@Component({
    selector: 'vacation-cart',
    templateUrl: 'app/feed/vacation/vacation-cart.template.html',
    providers: [VacationService]
})
export class VacationCartComponent {
    vacation: Vacation = null;

    constructor(private vacationService: VacationService) {
        this.vacation = this.vacationService.getVacation();
     }

    
}