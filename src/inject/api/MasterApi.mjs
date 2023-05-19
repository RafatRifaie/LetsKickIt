export default class MasterApi {

    constructor() {
        this.apis = {};
    }

    register(api) {
        api.setMaster(this);
        this.apis[api.name] = api;
    }

    getApi(name) {
        return this.apis[name];
    }

}