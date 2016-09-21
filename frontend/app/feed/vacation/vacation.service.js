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
var http_1 = require('@angular/http');
var vacation_1 = require('../../domain/vacation');
var Observable_1 = require('rxjs/Observable');
var url_util_1 = require('../../utils/url.util');
var VacationService = (function () {
    function VacationService(http) {
        this.http = http;
    }
    VacationService.prototype.getVacations = function () {
        return this.http.get(url_util_1.UrlUtil.GET_ALL_VACATIONS)
            .map(this.extractData)
            .catch(this.handleError);
    };
    VacationService.prototype.extractData = function (res) {
        var body = res.json();
        var i = 0;
        var vacations = [];
        for (var _i = 0, body_1 = body; _i < body_1.length; _i++) {
            var vac = body_1[_i];
            var id = vac.id;
            var owner = vac.owner;
            var members = vac.members;
            var title = vac.title;
            var description = vac.description;
            var beginDate = vac.beginDate;
            var endDate = vac.endDate;
            var tags = vac.tags;
            var estimatedCost = vac.estimatedCost;
            var minMembers = vac.minMembers;
            var status_1 = vac.status;
            var plannedActivities = vac.plannedActivities;
            var comments = vac.comments;
            var gallery = vac.gallery;
            var titleImg = vac.titleImg;
            vacations[i] = new vacation_1.Vacation(id, owner, members, title, description, beginDate, endDate, tags, estimatedCost, minMembers, status_1, plannedActivities, comments, gallery, titleImg);
            i++;
        }
        return vacations || {};
    };
    VacationService.prototype.handleError = function (error) {
        // we might use a remote logging
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    VacationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VacationService);
    return VacationService;
}());
exports.VacationService = VacationService;
//# sourceMappingURL=vacation.service.js.map