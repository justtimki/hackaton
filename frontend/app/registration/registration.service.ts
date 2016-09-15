import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import { User } from '../domain/user';
import { UrlUtil } from '../utils/url.util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistrationService {
    private oAuthCallbackUrl: string;
    private oAuthTokenUrl: string;
    private oAuthUserUrl: string;
    private oAuthUserNameField: string;

    private windowHandle: any = null;

    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    constructor(private http: Http, private oauthService: OAuthService) {
        this.oauthService.loginUrl = "https://accounts.google.com/o/oauth2/v2/auth"; //Id-Provider?

        http.get('config.json')
            .map(res => res.json())
            .subscribe((config: any) => {
                this.oAuthCallbackUrl = config.callbackUrl;
                this.oAuthTokenUrl = config.implicitGrantUrl;
                this.oAuthTokenUrl = this.oAuthTokenUrl
                    .replace('__callbackUrl__', config.callbackUrl)
                    .replace('__clientId__', config.clientId)
                    .replace('__scopes__', config.scopes);
                this.oAuthUserUrl = config.userInfoUrl;
                this.oAuthUserNameField = config.userInfoNameField;
            })
    }

    startGoogleAuth() {
        this.windowHandle = window.open(this.oAuthTokenUrl, 'OAuth2 Login', 'width=600,height=500');
    }

    register(value: User): Promise<User> {
        let body = JSON.stringify({ "username": value.username, "password": value.password });
        return this.http.post(UrlUtil.REGISTER_ACCOUNT, body, { headers: this.headers })
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