import { initConfigs } from "./config/YTApiConfig";
import 'rxjs/add/observable/of';
export declare class YTApiProvideService {
    private config;
    constructor(config: initConfigs);
    handleClientLoad(): void;
    initClient(): void;
    handleAuthClick(event: any): any;
    setSigninStatus(): void;
    updateSigninStatus(isSignedIn: any): void;
    private createResource(properties);
    private removeEmptyParams(params);
    buildApiRequest(requestMethod: any, path: any, params: any, properties?: boolean): any;
}
