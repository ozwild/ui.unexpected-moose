import Request from "../../Models/Request";
import ModelService from "./ModelService";

export default class RequestService extends ModelService {

    static get model() {
        return Request;
    }

    static get prefix() {
        return 'requests';
    }

    static get apiPath() {
        return '/api/requests';
    }

}