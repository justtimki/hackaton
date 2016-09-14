import { Component, ModuleWithProviders } from "@angular/core";
import { VacationCartComponent } from "./feed/vacation/vacation-cart.component";
import { RegistrationFormComponent } from "./registration/registration.component";

import { Routes, RouterModule }   from '@angular/router';

const appRoutes = [
    { path: '', redirectTo: 'all', pathMatch: 'full'},
    { path: 'all', component: VacationCartComponent, useAsDefault: true},
    { path: 'my', component: RegistrationFormComponent }
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
