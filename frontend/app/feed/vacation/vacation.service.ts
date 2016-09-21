import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Vacation } from '../../domain/vacation';
import { Observable } from 'rxjs/Observable';
import { UrlUtil } from '../../utils/url.util';
import { User } from '../../domain/user';

@Injectable()
export class VacationService {

    constructor(private http: Http) { }

    public getVacations(): Observable<Vacation[]> {
        return this.http.get(UrlUtil.GET_ALL_VACATIONS)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        let i: number = 0;
        let vacations: Vacation[] = [];
        for (let vac of body) {
            let id = vac.id;
            let owner = vac.owner;
            let members = vac.members;
            let title = vac.title;
            let description = vac.description;
            let beginDate = vac.beginDate;
            let endDate = vac.endDate;
            let tags = vac.tags;
            let estimatedCost = vac.estimatedCost;
            let minMembers = vac.minMembers;
            let status = vac.status;
            let plannedActivities = vac.plannedActivities;
            let comments = vac.comments;
            let gallery = vac.gallery;
            let titleImg = vac.titleImg;

            vacations[i] = new Vacation(id, owner, members, title, description, beginDate, endDate, tags, estimatedCost,
                minMembers, status, plannedActivities, comments, gallery, titleImg);

            i++;
        }
        return vacations || {};
    }

    private handleError(error: any) {
        // we might use a remote logging
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}