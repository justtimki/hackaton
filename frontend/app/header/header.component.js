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
var core_2 = require('@angular/core');
var registration_service_1 = require('../registration/registration.service');
var HeaderComponent = (function () {
    function HeaderComponent(registrationService, ref) {
        this.ref = ref;
        this.username = "";
        this.userPortraitUrl = "";
        this.authInProgress = false;
        this.authenticated = false;
        this.registrationService = registrationService;
        this.registrationService.setListener(this);
    }
    HeaderComponent.prototype.startGoogleAuth = function () {
        this.authInProgress = true;
        this.registrationService.startGoogleAuth();
    };
    HeaderComponent.prototype.logoutGoogle = function () {
        this.registrationService.doLogout();
        this.authenticated = false;
        this.username = null;
        this.userInfo = null;
        this.userPortraitUrl = null;
        return false;
    };
    HeaderComponent.prototype.onUserLogin = function (user) {
        if (!user) {
            // TODO handle if a case
            return;
        }
        this.userInfo = user;
        this.authenticated = true;
        this.onUserRegister();
        this.ref.detectChanges();
    };
    HeaderComponent.prototype.onUserRegister = function () {
        this.userPortraitUrl = this.userInfo.image.url;
        this.username = this.userInfo.name.givenName ? this.userInfo.name.givenName : this.userInfo.displayName;
        if (this.authInProgress) {
            this.authInProgress = false;
            $("#loginDialog .close").trigger("click");
        }
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        UUI.Header_Tools.init();
        this.registrationService.tryLogin();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header-login',
            templateUrl: 'app/header/header.template.html',
            providers: [registration_service_1.RegistrationService]
        }), 
        __metadata('design:paramtypes', [registration_service_1.RegistrationService, core_2.ChangeDetectorRef])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
/*
{
    "kind":"plus#person",
    "etag":"\"xw0en60W6-NurXn4VBU-CMjSPEw/y94uXrhVwFkI8XQxnu_rVuN3X4k\"",
    "gender":"male",
    "objectType":"person",
    "id":"117000538289220516067",
    "displayName":"Егор Фролов",
    "name":{
        "familyName":"Фролов",
        "givenName":"Егор"
    },
    "url":"https://plus.google.com/117000538289220516067",
    "image":{
        "url":"https://lh5.googleusercontent.com/-I0wwBw5zi_w/AAAAAAAAAAI/AAAAAAAADXI/YVedgBlyWDw/photo.jpg?sz=50",
        "isDefault":false
    },
    "placesLived":[{"value":"Гомель"}],
    "isPlusUser":true,
    "language":"ru",
    "circledByCount":8,
    "verified":false,
    "cover":{"layout":"banner","coverPhoto":{"url":"https://lh3.googleusercontent.com/6gsqFS0yW1Z4g9Dywq-xGrggr78J2B-yEYcsWs4xCCNIltECBdUH9PVaijDyAl8svjrfpHJ3=s630-fcrop64=1,00000000ffffffff","height":530,"width":940},"coverInfo":{"topImageOffset":0,"leftImageOffset":0}}
}
*/ 
//# sourceMappingURL=header.component.js.map