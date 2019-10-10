import BookingService from "../Services/ModelServices/BookingService";

export default class Booking {

    id;
    asset_id = "";
    user_id = "";
    from = "";
    to = "";
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
     * @returns {Booking}
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
        return BookingService.save(this)
            .then(requestData => this.fill(requestData));
    }

}