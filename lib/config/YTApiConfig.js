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
export { YTApiConfig };
//# sourceMappingURL=YTApiConfig.js.map