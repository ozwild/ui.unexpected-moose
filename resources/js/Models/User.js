import UserService from "../Services/ModelServices/UserService";

export default class User {

    id;
    name = "";
    email = "";
    phone = "";
    avatar = "";
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
     * @returns {User}
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
        return UserService.save(this)
            .then(userData => this.fill(userData));
    }

}