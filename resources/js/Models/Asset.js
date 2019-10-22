import AssetService from "../Services/ModelServices/AssetService";
import RequestService from "../Services/ModelServices/RequestService";
import BookingService from "../Services/ModelServices/BookingService";
import CommentableModel from "./CommentableModel";

class Asset extends CommentableModel {

    name = "";
    description = "";
    picture = "";

    service = AssetService;

    comments_count;
    requests_count;
    requests = [];

    bookings_count;
    bookings = [];

    constructor(data = {}) {
        super(data);
        this._fillWithData(data);
    }

    /**
     *
     * @param page
     * @returns {Promise<*>}
     */
    async getRequests(page = 1) {
        const asset = this.id;
        const pending_only = true;
        return await RequestService.all(page, {asset, pending_only});
    }

    /**
     *
     * @param page
     * @returns {Promise<*>}
     */
    async getBookings(page = 1) {
        const asset = this.id;
        return await BookingService.all(page, {asset});
    }

}

export default Asset;