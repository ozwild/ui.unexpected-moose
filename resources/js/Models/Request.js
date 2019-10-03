import RequestService from "../Services/RequestService";

export default class Request {

    id;
    asset_id = "";
    user_id = "";
    from = "";
    to = "";
    is_pending = false;
    created_at = "";
    updated_at = "";

    /**
     * @param data {Object}
     */
    constructor(data = {}) {
        Object.keys(data)
            .forEach(key => {
                const value = data[key];
                if (this.hasOwnProperty(key) && value) {
                    this[key] = value;
                }
            });
    }

    /**
     * @param data {Object}
     * @returns {Request}
     */
    fill(data) {
        Object.keys(data)
            .forEach(key => {
                const value = data[key];
                if (this.hasOwnProperty(key) && value) {
                    this[key] = value;
                }
            });
        return this;
    }

    /**
     * @returns {boolean}
     */
    get isANewRecord() {
        return !this.id;
    }

    /**
     * @returns {Promise<AxiosResponse<any>|never>}
     */
    save() {
        return RequestService.save(this)
            .then(requestData => this.fill(requestData));
    }

}