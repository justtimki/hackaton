import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from "../domain/user";
import { UrlUtil } from "../utils/url.util";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegistrationService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    register(value: any): Promise<User> {
        return this.http
            .post(UrlUtil.REGISTER_ACCOUNT, JSON.stringify({ value }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}