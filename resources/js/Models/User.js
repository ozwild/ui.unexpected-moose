import UserService from "../Services/ModelServices/UserService";
import Model from "./Model";

export default class User extends Model {

    name = "";
    email = "";
    phone = "";
    avatar = "";
    service = new UserService();

    constructor(data = {}) {
        super(data);
        this._fillWithData(data);
    }

    get data() {
        let {service, phone, ...rest} = this;
        phone = phone.replace(/([()])*/g, "");
        return {phone, ...rest};
    }

}