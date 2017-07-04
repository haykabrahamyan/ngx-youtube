import { YTApiConfig } from "./config/YTApiConfig";
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
            ;
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
export { YTApiProvideService };
//# sourceMappingURL=YTApiProviderService.js.map