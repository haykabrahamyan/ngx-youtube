import "./api.js";
// import * as google from "googleapis";
import { NgModule } from "@angular/core";
import { YTApiService } from "./YTApiService";
import { YTApiProvideService } from "./YTApiProviderService";
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
export { YTApiModule };
YTApiModule.decorators = [
    { type: NgModule },
];
/** @nocollapse */
YTApiModule.ctorParameters = function () { return []; };
//# sourceMappingURL=YTApiModule.js.map