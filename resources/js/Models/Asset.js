import AssetService from "../Services/ModelServices/AssetService";
import Model from "./Model";

export default class Asset extends Model {

    name = "";
    description = "";
    picture = "";
    service = new AssetService();

    constructor(data = {}) {
        super(data);
        /*this._fillWithData = this._fillWithData.bind(this);*/
        this._fillWithData(data);
    }

}