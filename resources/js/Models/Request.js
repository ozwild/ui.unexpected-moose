import RequestService from "../Services/ModelServices/RequestService";
import Model from "./Model";
import User from "./User";
import Asset from "./Asset";

export default class Request extends Model {

    asset_id = "";
    user_id = "";
    from = "";
    to = "";
    is_pending = false;

    types = {
        user: User,
        asset: Asset
    };

    user = new User();
    asset = new Asset();
    service = new RequestService();

    constructor(data = {}) {
        super(data);
        this._fillWithData(data);
    }

}