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
var window_service_1 = require("./window.service");
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/catch');
var RegistrationService = (function () {
    function RegistrationService(windows, http /*private oauthService: OAuthService*/) {
        //this.oauthService.loginUrl = "https://accounts.google.com/o/oauth2/v2/auth"; //Id-Provider?
        var _this = this;
        this.windows = windows;
        this.http = http;
        this.ckTokenName = "STKN";
        this.ckUserInfoName = "userInfoJSON";
        this.authenticated = false;
        this.expires = 0;
        this.windowHandle = null;
        this.intervalId = null;
        this.expiresTimerId = null;
        this.loopCount = 600;
        this.intervalLength = 100;
        this.locationWatcher = new core_1.EventEmitter();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        http.get('config.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (config) {
            _this.oAuthCallbackUrl = config.callbackUrl;
            _this.oAuthTokenUrl = config.implicitGrantUrl;
            _this.oAuthTokenUrl = _this.oAuthTokenUrl
                .replace('__callbackUrl__', config.callbackUrl)
                .replace('__clientId__', config.clientId)
                .replace('__scopes__', config.scopes);
            _this.oAuthUserUrl = config.userInfoUrl;
            _this.oAuthUserNameField = config.userInfoNameField;
            _this.registerUrl = config.restRegister;
            // this.oauthService.loginUrl = config.implicitGrantUrl;
            // this.oauthService.clientId = config.clientId;
            // this.oauthService.redirectUri = config.callbackUrl;
            // this.oauthService.scope = config.scopes;
        });
    }
    RegistrationService.prototype.setListener = function (listener) {
        this.listener = listener;
    };
    RegistrationService.prototype.registerUser = function (user) {
        this.http.post(this.registerUrl, JSON.stringify(user), null).toPromise().then(this.onRegReturn);
    };
    RegistrationService.prototype.onRegReturn = function (res) {
        if (res.ok) {
            if (this.listener) {
                this.listener.onUserRegister();
            }
        }
    };
    RegistrationService.prototype.startGoogleAuth = function () {
        var _this = this;
        //this.oauthService.initImplicitFlow();
        var loopCount = this.loopCount;
        this.windowHandle = this.windows.createWindow(this.oAuthTokenUrl, 'OAuth2 Login');
        this.intervalId = setInterval(function () {
            if (loopCount-- < 0) {
                clearInterval(_this.intervalId);
                _this.emitAuthStatus(false);
                _this.windowHandle.close();
            }
            else {
                var href;
                try {
                    href = _this.windowHandle.location.href;
                }
                catch (e) {
                }
                if (href != null) {
                    var re = /access_token=(.*)/;
                    var found = href.match(re);
                    if (found) {
                        console.log("Callback URL:", href);
                        clearInterval(_this.intervalId);
                        var parsed = _this.parse(href.substr(_this.oAuthCallbackUrl.length + 1));
                        console.log("Parsed:", parsed);
                        var expiresSeconds = Number(parsed.expires_in) || 1800;
                        _this.token = parsed.access_token;
                        if (_this.token) {
                            _this.saveTokenToCookies();
                            _this.authenticated = true;
                            _this.startExpiresTimer(expiresSeconds);
                            _this.expires = new Date();
                            _this.expires = _this.expires.setSeconds(_this.expires.getSeconds() + expiresSeconds);
                            _this.windowHandle.close();
                            _this.emitAuthStatus(true);
                            _this.fetchUserInfo();
                        }
                        else {
                            _this.authenticated = false; // we got the login callback just fine, but there was no token
                            _this.emitAuthStatus(false); // so we are still going to fail the login
                        }
                    }
                    else {
                        // http://localhost:3000/auth/callback#error=access_denied
                        if (href.indexOf(_this.oAuthCallbackUrl) == 0) {
                            clearInterval(_this.intervalId);
                            var parsed = _this.parse(href.substr(_this.oAuthCallbackUrl.length + 1));
                            _this.windowHandle.close();
                            _this.emitAuthStatusError(false, parsed);
                        }
                    }
                }
            }
        }, this.intervalLength);
    };
    RegistrationService.prototype.tryLogin = function () {
        var tokenSaved = this.getTokenFromCookies();
        if (tokenSaved) {
            this.authenticated = true;
            this.userInfo = this.restoreUserFromCookies();
            return this.userInfo;
        }
        else {
            return null;
        }
    };
    RegistrationService.prototype.saveTokenToCookies = function () {
        Cookies.set(this.ckTokenName, this.token, { expires: 14 /*, secure: true */ });
    };
    RegistrationService.prototype.getTokenFromCookies = function () {
        return Cookies.get(this.ckTokenName);
    };
    RegistrationService.prototype.saveUserToCookies = function () {
        Cookies.set(this.ckUserInfoName, JSON.stringify(this.userInfo), { expires: 14 });
    };
    RegistrationService.prototype.restoreUserFromCookies = function () {
        var userInfoString = Cookies.get(this.ckUserInfoName);
        if (userInfoString) {
            return JSON.parse(userInfoString);
        }
        else {
            return null;
        }
    };
    RegistrationService.prototype.clearCookies = function () {
        Cookies.remove(this.ckTokenName);
        Cookies.remove(this.ckUserInfoName, {});
    };
    RegistrationService.prototype.onUserParsed = function () {
        console.log("User Info:", JSON.stringify(this.userInfo));
        this.saveUserToCookies();
        if (this.listener) {
            this.listener.onUserLogin(this.userInfo);
        }
    };
    RegistrationService.prototype.doLogout = function () {
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
        this.emitAuthStatus(true);
        this.clearCookies();
        console.log('Session has been cleared');
    };
    RegistrationService.prototype.emitAuthStatus = function (success) {
        this.emitAuthStatusError(success, null);
    };
    RegistrationService.prototype.emitAuthStatusError = function (success, error) {
        this.locationWatcher.emit({
            success: success,
            authenticated: this.authenticated,
            token: this.token,
            expires: this.expires,
            error: error
        });
    };
    RegistrationService.prototype.getSession = function () {
        return { authenticated: this.authenticated, token: this.token, expires: this.expires };
    };
    RegistrationService.prototype.fetchUserInfo = function () {
        var _this = this;
        if (this.token != null) {
            var headers = new http_1.Headers();
            headers.append('Authorization', "Bearer " + this.token);
            //noinspection TypeScriptUnresolvedFunction
            this.http.get(this.oAuthUserUrl, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (info) {
                _this.userInfo = info;
                _this.onUserParsed();
            }, function (err) {
                console.error("Failed to fetch user info:", err);
            });
        }
    };
    RegistrationService.prototype.getUserInfo = function () {
        return this.userInfo;
    };
    RegistrationService.prototype.getUserName = function () {
        return this.userInfo ? this.userInfo[this.oAuthUserNameField] : null;
    };
    RegistrationService.prototype.startExpiresTimer = function (seconds) {
        var _this = this;
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(function () {
            console.log('Session has expired');
            _this.doLogout();
        }, seconds * 1000); // seconds * 1000
        console.log('Token expiration timer set for', seconds, "seconds");
    };
    RegistrationService.prototype.subscribe = function (onNext, onThrow, onReturn) {
        return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
    };
    RegistrationService.prototype.isAuthenticated = function () {
        return this.authenticated;
    };
    RegistrationService.prototype.parse = function (str) {
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
            }
            else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            }
            else {
                ret[key] = [ret[key], val];
            }
            return ret;
        }, {});
    };
    ;
    // register(value: User): Promise<User> {
    //     let body = JSON.stringify({ "username": value.username, "password": value.password });
    //     return this.http.post(UrlUtil.REGISTER_ACCOUNT, body, { headers: this.headers })
    //         .toPromise()
    //         .then(this.extractData)
    //         .catch(this.handleError);
    // }
    RegistrationService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    RegistrationService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // better use external log system
        return Promise.reject(errMsg);
    };
    RegistrationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [window_service_1.WindowService, http_1.Http])
    ], RegistrationService);
    return RegistrationService;
}());
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=registration.service.js.map