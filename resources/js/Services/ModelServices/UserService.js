import User from "../../Models/User";
import ModelService from "./ModelService";
import APIService from "../APIService";

export default class UserService extends ModelService {

    modelClass = User;
    prefix = 'users';
    apiPath = '/api/users';

    restore(user) {
        APIService.post(`${this.apiPath}/${user.id}`)
            .then(response => {
                /**
                 * @todo reinstate on cached data without extending cache expiration
                 */
            });
    }

}