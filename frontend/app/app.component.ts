import { Component, ModuleWithProviders } from "@angular/core";
import { VacationCartComponent } from "./feed/vacation/vacation-cart.component";
import { AddVacationComponent } from "./add-vacation/add-vacation.component";
import { RegistrationFormComponent } from "./registration/registration.component";
import { ProfileComponent } from "./profile/profile.component";

import { Routes, RouterModule }   from '@angular/router';

const appRoutes = [
    { path: '', redirectTo: 'vacations', pathMatch: 'full'},
    { path: 'vacations', component: VacationCartComponent, useAsDefault: true},
    { path: 'add-vacation', component: AddVacationComponent},
    { path: 'my', component: RegistrationFormComponent },
    { path: 'profile', component: ProfileComponent }
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
