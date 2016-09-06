import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { User } from '../domain/user';
import { UrlUtil } from '../utils/url.util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistrationService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    constructor(private http: Http) { }

    register(value: User): Promise<User> {
        //let body = JSON.stringify({ "username": value.username, "password": value.password });
        return this.http.post(UrlUtil.REGISTER_ACCOUNT + '?username=' + value.username + '&password=' + value.password, { headers: this.headers })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // better use external log system
        return Promise.reject(errMsg);
    }
}