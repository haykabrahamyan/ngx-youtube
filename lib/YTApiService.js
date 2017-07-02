import { Injectable } from '@angular/core';
import { YTApiConfig } from "./config/YTApiConfig";
import { YTApiProvideService } from "./YTApiProviderService";
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
export { YTApiService };
YTApiService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
YTApiService.ctorParameters = function () { return [
    null,
]; };
//# sourceMappingURL=YTApiService.js.map