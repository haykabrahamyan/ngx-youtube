(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/add/observable/of')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/add/observable/of'], factory) :
	(factory((global.ngx = global.ngx || {}, global.ngx.youtube = global.ngx.youtube || {}),global.ng.core));
}(this, (function (exports,_angular_core) { 'use strict';

var YTApiConfig = (function () {
    function YTApiConfig(config) {
        this.CLIENT_ID = config.clientId;
        this.DISCOVERY_DOCS = config.discoveryDocs;
        this.SCOPE = config.scope;
    }
    YTApiConfig.prototype.getConfigs = function () {
        var configs = {};
        configs.clientId = this.CLIENT_ID;
        configs.discoveryDocs = this.DISCOVERY_DOCS;
        configs.scope = this.SCOPE;
        return configs;
    };
    return YTApiConfig;
}());

var GoogleAuth;
var YTApiProvideService = (function () {
    function YTApiProvideService(config) {
        this.config = new YTApiConfig(config);
    }
    YTApiProvideService.prototype.handleClientLoad = function () {
        gapi.load('client:auth2', this.initClient());
    };
    YTApiProvideService.prototype.initClient = function () {
        // Initialize the gapi.client object, which app uses to make API requests.
        // Get API key and client ID from API Console.
        // 'scope' field specifies space-delimited list of access scopes
        var configs = this.config.getConfigs();
        setTimeout(function () {
            gapi.client.init(configs).then(function () {
                GoogleAuth = gapi.auth2.getAuthInstance();
                // Listen for sign-in state changes.
                // GoogleAuth.isSignedIn.listen(updateSigninStatus);
                // Handle initial sign-in state. (Determine if user is already signed in.)
                // this.setSigninStatus();
            });
        }, 2000);
    };
    //
    YTApiProvideService.prototype.handleAuthClick = function (event) {
        return GoogleAuth.signIn();
    };
    //
    YTApiProvideService.prototype.setSigninStatus = function () {
        // let user = GoogleAuth.currentUser.get();
        // let isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
        // Toggle button text and displayed statement based on current auth status.
        // if (isAuthorized) {
        //     defineRequest();
        // }
    };
    YTApiProvideService.prototype.updateSigninStatus = function (isSignedIn) {
        this.setSigninStatus();
    };
    YTApiProvideService.prototype.createResource = function (properties) {
        var resource = {};
        var normalizedProps = properties;
        for (var p in properties) {
            var value = properties[p];
            if (p && p.substr(-2, 2) == '[]') {
                var adjustedName = p.replace('[]', '');
                if (value) {
                    normalizedProps[adjustedName] = value.split(',');
                }
                delete normalizedProps[p];
            }
        }
        for (var p in normalizedProps) {
            // Leave properties that don't have values out of inserted resource.
            if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
                var propArray = p.split('.');
                var ref = resource;
                for (var pa = 0; pa < propArray.length; pa++) {
                    var key = propArray[pa];
                    if (pa == propArray.length - 1) {
                        ref[key] = normalizedProps[p];
                    }
                    else {
                        ref = ref[key] = ref[key] || {};
                    }
                }
            }
            
        }
        return resource;
    };
    YTApiProvideService.prototype.removeEmptyParams = function (params) {
        for (var p in params) {
            if (!params[p] || params[p] == 'undefined') {
                delete params[p];
            }
        }
        return params;
    };
    YTApiProvideService.prototype.buildApiRequest = function (requestMethod, path, params, properties) {
        if (properties === void 0) { properties = false; }
        params = this.removeEmptyParams(params);
        var request;
        if (properties) {
            var resource = this.createResource(properties);
            request = gapi.client.request({
                'body': resource,
                'method': requestMethod,
                'path': path,
                'params': params
            });
        }
        else {
            request = gapi.client.request({
                'method': requestMethod,
                'path': path,
                'params': params
            });
        }
        return request;
    };
    return YTApiProvideService;
}());

//
var YTApiService = (function () {
    function YTApiService(config) {
        this.config = new YTApiConfig(config);
        this.provider = new YTApiProvideService(config);
    }
    YTApiService.factory = function (config) {
        return new YTApiService(config);
    };
    YTApiService.prototype.auth = function (ev) {
        return this.provider.handleAuthClick(ev);
    };
    YTApiService.prototype.search = function (q, limit, type, part) {
        if (part === void 0) { part = 'snippet'; }
        return this.provider.buildApiRequest('GET', '/youtube/v3/search', {
            'maxResults': limit,
            'part': part,
            'q': q,
            'type': type
        });
    };
    YTApiService.prototype.getChannelByID = function (ID, part) {
        if (part === void 0) { part = 'snippet'; }
        return this.provider.buildApiRequest('GET', '/youtube/v3/channels', { 'id': ID,
            'part': part });
    };
    YTApiService.prototype.getVideosByID = function (ID, part) {
        if (part === void 0) { part = 'snippet'; }
        return this.provider.buildApiRequest('GET', '/youtube/v3/videos', { 'id': ID,
            'part': part });
    };
    YTApiService.prototype.getMostPopular = function (regionCode, videoCategoryId, part) {
        if (videoCategoryId === void 0) { videoCategoryId = ''; }
        if (part === void 0) { part = 'snippet'; }
        return this.provider.buildApiRequest('GET', '/youtube/v3/channels', { 'chart': 'mostPopular',
            'regionCode': regionCode,
            'part': part,
            'videoCategoryId': videoCategoryId });
    };
    YTApiService.prototype.getAuthLiked = function (part) {
        if (part === void 0) { part = 'snippet'; }
        return this.provider.buildApiRequest('GET', '/youtube/v3/channels', { 'myRating': 'like',
            'part': part });
    };
    return YTApiService;
}());
YTApiService.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
YTApiService.ctorParameters = function () { return [
    null,
]; };

var YTApiModule = (function () {
    function YTApiModule() {
    }
    YTApiModule.setConfig = function (apiConfig) {
        var YTP = new YTApiProvideService(apiConfig);
        YTP.handleClientLoad();
        return {
            ngModule: YTApiModule,
            providers: [
                {
                    provide: YTApiService,
                    useFactory: function () { return YTApiService.factory(apiConfig); }
                }
            ]
        };
    };
    return YTApiModule;
}());
YTApiModule.decorators = [
    { type: _angular_core.NgModule },
];
/** @nocollapse */
YTApiModule.ctorParameters = function () { return []; };

exports.YTApiModule = YTApiModule;
exports.YTApiService = YTApiService;
exports.YTApiProvideService = YTApiProvideService;
exports.YTApiConfig = YTApiConfig;

Object.defineProperty(exports, '__esModule', { value: true });

})));
