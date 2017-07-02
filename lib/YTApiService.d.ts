import { initConfigs } from "./config/YTApiConfig";
import { YTApiProvideService } from "./YTApiProviderService";
export declare class YTApiService {
    private config;
    provider: YTApiProvideService;
    constructor(config: initConfigs);
    static factory(config: initConfigs): YTApiService;
    auth(ev: any): any;
    search(q: string, limit: number, type: string, part?: string): any;
    getChannelByID(ID: string, part?: string): any;
    getVideosByID(ID: string, part?: string): any;
    getMostPopular(regionCode: string, videoCategoryId?: string, part?: string): any;
    getAuthLiked(part?: string): any;
}
