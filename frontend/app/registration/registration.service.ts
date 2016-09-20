import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { WindowService } from "./window.service";

import { User } from '../domain/user';
import { UrlUtil } from '../utils/url.util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

declare var Cookies: any;

@Injectable()
export class RegistrationService {
    private ckTokenName = "STKN";
    private ckUserInfoName = "userInfoJSON";
    private oAuthCallbackUrl: string;
    private oAuthTokenUrl: string;
    private oAuthUserUrl: string;
    private oAuthUserNameField: string;
    private authenticated: boolean = false;
    private token: string;
    private expires: any = 0;
    private userInfo: any = {};
    private windowHandle: any = null;
    private intervalId: any = null;
    private expiresTimerId: any = null;
    private loopCount = 600;
    private intervalLength = 100;
    private registerUrl: string;
    private listener: any;

    private locationWatcher = new EventEmitter();

    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    constructor(private windows: WindowService, private http: Http/*private oauthService: OAuthService*/) {
        //this.oauthService.loginUrl = "https://accounts.google.com/o/oauth2/v2/auth"; //Id-Provider?

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

                this.registerUrl = config.restRegister;
                // this.oauthService.loginUrl = config.implicitGrantUrl;
                // this.oauthService.clientId = config.clientId;
                // this.oauthService.redirectUri = config.callbackUrl;
                // this.oauthService.scope = config.scopes;
            })
    }

    setListener(listener: any) {
        this.listener = listener;
    }

    registerUser(user: User) {
        this.http.post(this.registerUrl, JSON.stringify(user), null).toPromise().then(this.onRegReturn);
    }

    private onRegReturn(res: Response) {
        if (res.ok) {
            if (this.listener) {
                this.listener.onUserRegister();
            }
        }
    }

    startGoogleAuth() {
        //this.oauthService.initImplicitFlow();
        var loopCount = this.loopCount;
        this.windowHandle = this.windows.createWindow(this.oAuthTokenUrl, 'OAuth2 Login');

        this.intervalId = setInterval(() => {
            if (loopCount-- < 0) {
                clearInterval(this.intervalId);
                this.emitAuthStatus(false);
                this.windowHandle.close();
            } else {
                var href: string;
                try {
                    href = this.windowHandle.location.href;
                } catch (e) {
                    //console.log('Error:', e);
                }
                if (href != null) {
                    var re = /access_token=(.*)/;
                    var found = href.match(re);
                    if (found) {
                        console.log("Callback URL:", href);
                        clearInterval(this.intervalId);
                        var parsed = this.parse(href.substr(this.oAuthCallbackUrl.length + 1));
                        console.log("Parsed:", parsed);
                        var expiresSeconds = Number(parsed.expires_in) || 1800;

                        this.token = parsed.access_token;
                        if (this.token) {
                            this.saveTokenToCookies();
                            this.authenticated = true;
                            this.startExpiresTimer(expiresSeconds);
                            this.expires = new Date();
                            this.expires = this.expires.setSeconds(this.expires.getSeconds() + expiresSeconds);

                            this.windowHandle.close();
                            this.emitAuthStatus(true);
                            this.fetchUserInfo();
                        } else {
                            this.authenticated = false; // we got the login callback just fine, but there was no token
                            this.emitAuthStatus(false); // so we are still going to fail the login
                        }

                    } else {
                        // http://localhost:3000/auth/callback#error=access_denied
                        if (href.indexOf(this.oAuthCallbackUrl) == 0) {
                            clearInterval(this.intervalId);
                            var parsed = this.parse(href.substr(this.oAuthCallbackUrl.length + 1));
                            this.windowHandle.close();
                            this.emitAuthStatusError(false, parsed);
                        }
                    }
                }
            }
        }, this.intervalLength);
    }

    tryLogin() {
        let tokenSaved = this.getTokenFromCookies();
        if (tokenSaved) {
            this.authenticated = true;
            this.userInfo = this.restoreUserFromCookies();

            if (this.listener) {
                this.listener.onUserLogin(this.userInfo);
            }
        }
    }

    private saveTokenToCookies() {
        Cookies.set(this.ckTokenName, this.token, { expires: 14, secure: true });
    }

    private getTokenFromCookies() {
        return Cookies.get(this.ckTokenName/*, {secure: true}*/);
    }

    private saveUserToCookies() {
        Cookies.set(this.ckUserInfoName, JSON.stringify(this.userInfo), {expires: 14});
    }

    private restoreUserFromCookies() {
        let userInfoString = Cookies.get(this.ckUserInfoName);
        if (userInfoString) {
            return JSON.parse(userInfoString);
        } else {
            return null;
        }
    }

    private clearCookies() {
        Cookies.remove(this.ckTokenName);
        Cookies.remove(this.ckUserInfoName, { secure: true });
    }

    private onUserParsed() {
        console.log("User Info:", JSON.stringify(this.userInfo));
        this.saveUserToCookies();
        if (this.listener) {
            this.listener.onUserLogin(this.userInfo);
        }
    } 

    public doLogout() {
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
        this.emitAuthStatus(true);
        this.clearCookies();
        console.log('Session has been cleared');
    }

    private emitAuthStatus(success: boolean) {
        this.emitAuthStatusError(success, null);
    }

    private emitAuthStatusError(success: boolean, error: any) {
        this.locationWatcher.emit(
            {
                success: success,
                authenticated: this.authenticated,
                token: this.token,
                expires: this.expires,
                error: error
            }
        );
    }

    public getSession() {
        return { authenticated: this.authenticated, token: this.token, expires: this.expires };
    }

    private fetchUserInfo() {
        if (this.token != null) {
            var headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);
            //noinspection TypeScriptUnresolvedFunction
            this.http.get(this.oAuthUserUrl, { headers: headers })
                .map(res => res.json())
                .subscribe(info => {
                    this.userInfo = info;
                    this.onUserParsed();
                }, err => {
                    console.error("Failed to fetch user info:", err);
                });
        }
    }

    public getUserInfo() {
        return this.userInfo;
    }

    public getUserName() {
        return this.userInfo ? this.userInfo[this.oAuthUserNameField] : null;
    }

    private startExpiresTimer(seconds: number) {
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(() => {
            console.log('Session has expired');
            this.doLogout();
        }, seconds * 1000); // seconds * 1000
        console.log('Token expiration timer set for', seconds, "seconds");
    }

    public subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void) {
        return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
    }

    public isAuthenticated() {
        return this.authenticated;
    }

    private parse(str) { // lifted from https://github.com/sindresorhus/query-string
        if (typeof str !== 'string') {
            return {};
        }

        str = str.trim().replace(/^(\?|#|&)/, '');

        if (!str) {
            return {};
        }

        return str.split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            // Firefox (pre 40) decodes `%3D` to `=`
            // https://github.com/sindresorhus/query-string/pull/37
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join('=') : undefined;

            key = decodeURIComponent(key);

            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }

            return ret;
        }, {});
    };

    // register(value: User): Promise<User> {
    //     let body = JSON.stringify({ "username": value.username, "password": value.password });
    //     return this.http.post(UrlUtil.REGISTER_ACCOUNT, body, { headers: this.headers })
    //         .toPromise()
    //         .then(this.extractData)
    //         .catch(this.handleError);
    // }

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