import BookingService from "../Services/ModelServices/BookingService";
import Model from './Model';
import User from "./User";
import Asset from "./Asset";

export default class Booking extends Model {

    asset_id = "";
    user_id = "";
    from = "";
    to = "";
    processed_at = "";

    types = {
        user: User,
        asset: Asset
    };

    user = new User();
    asset = new Asset();
    service = new BookingService();

    constructor(data = {}) {
        super(data);
        this._fillWithData(data);
    }

}