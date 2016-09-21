import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Vacation } from '../../domain/vacation';
import { Observable } from 'rxjs/Observable';
import { UrlUtil } from '../../utils/url.util';

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
        return body || {};
    }

    private handleError(error: any) {
        // we might use a remote logging
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}