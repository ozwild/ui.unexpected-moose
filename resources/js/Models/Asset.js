import AssetService from "../Services/AssetService";

export default class Asset {

    id;
    name = "";
    description = "";
    picture = "";
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
     * @returns {Asset}
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
        return AssetService.save(this)
            .then(assetData => this.fill(assetData));
    }

}