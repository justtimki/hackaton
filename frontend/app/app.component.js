"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var vacation_cart_component_1 = require("./feed/vacation/vacation-cart.component");
var add_vacation_component_1 = require("./add-vacation/add-vacation.component");
var registration_component_1 = require("./registration/registration.component");
var profile_component_1 = require("./profile/profile.component");
var router_1 = require('@angular/router');
var appRoutes = [
    { path: '', redirectTo: 'vacations', pathMatch: 'full' },
    { path: 'vacations', component: vacation_cart_component_1.VacationCartComponent, useAsDefault: true },
    { path: 'add-vacation', component: add_vacation_component_1.AddVacationComponent },
    { path: 'my', component: registration_component_1.RegistrationFormComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent }
];
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "app",
            templateUrl: "app/app.template.html"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.component.js.map