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
var core_1 = require('@angular/core');
var registration_service_1 = require('../registration/registration.service');
/*import { Router }   from '@angular/router';*/
var ProfileComponent = (function () {
    function ProfileComponent(registrationService /*, private router: Router*/) {
        this.registrationService = registrationService;
        this.authenticated = false;
        var user = this.registrationService.tryLogin();
        if (!user) {
            //alert("Error getting user info");
            return;
        }
        this.authenticated = true;
        this.userInfo = user;
        this.userPortraitUrl = this.resizeImageUrl(this.userInfo.image.url, 100);
        this.username = this.userInfo.displayName;
    }
    ProfileComponent.prototype.ngAfterViewInit = function () {
    };
    ProfileComponent.prototype.resizeImageUrl = function (str, size) {
        return str.replace(/\?sz=\d+/g, "?sz=" + size);
    };
    ProfileComponent = __decorate([
        core_1.Component({
            //selector: 'header-login',
            templateUrl: 'app/profile/profile.template.html',
            providers: [registration_service_1.RegistrationService]
        }), 
        __metadata('design:paramtypes', [registration_service_1.RegistrationService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map