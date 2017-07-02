import { ModuleWithProviders } from "@angular/core";
import { initConfigs } from "./config/YTApiConfig";
export declare class YTApiModule {
    static setConfig(apiConfig: initConfigs): ModuleWithProviders;
}
