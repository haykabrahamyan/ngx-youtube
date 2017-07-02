export declare class YTApiConfig {
    protected CLIENT_ID: string;
    protected DISCOVERY_DOCS: string[];
    protected SCOPE: string;
    constructor(config: initConfigs);
    getConfigs(): initConfigs;
}
export interface initConfigs {
    clientId: string;
    discoveryDocs: string[];
    scope: string;
}
