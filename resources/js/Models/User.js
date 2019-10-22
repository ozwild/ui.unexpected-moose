import UserService from "../Services/ModelServices/UserService";
import Model from "./Model";
import RequestService from "../Services/ModelServices/RequestService";
import BookingService from "../Services/ModelServices/BookingService";

export default class User extends Model {

    name = "";
    email = "";
    phone = "";
    avatar = "";

    service = UserService;

    requests_count;
    requests = [];

    bookings_count;
    bookings = [];

    constructor(data = {}) {
        super(data);
        this._fillWithData(data);
    }

    get data() {
        let {service, phone, ...rest} = this;
        phone = phone.replace(/([()])*/g, "");
        return {phone, ...rest};
    }

    /**
     *
     * @param page
     * @returns {Promise<*>}
     */
    async getRequests(page = 1) {
        const user = this.id;
        const pendingOnly = true;
        return await RequestService.all(page, {user, pendingOnly});
    }

    /**
     *
     * @param page
     * @returns {Promise<*>}
     */
    async getBookings(page = 1) {
        const user = this.id;
        return await BookingService.all(page, {user});
    }

}