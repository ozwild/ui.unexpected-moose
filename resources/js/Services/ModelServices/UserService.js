import User from "../../Models/User";
import RestorableModelService from "./RestorableModelService";

export default class UserService extends RestorableModelService {

    static get model() {
        return User;
    }

    static get prefix() {
        return 'users';
    }

    static get apiPath() {
        return '/api/users';
    }

}