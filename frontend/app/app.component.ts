import { Component, ModuleWithProviders } from "@angular/core";
import { VacationCartComponent } from "./feed/vacation/vacation-cart.component";

import { Routes, RouterModule }   from '@angular/router';

const appRoutes = [
    { path: '', component: VacationCartComponent, useAsDefault: true }
];

@Component({
    selector: "app",
    templateUrl: "app/app.template.html"
})

export class AppComponent {

}

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
