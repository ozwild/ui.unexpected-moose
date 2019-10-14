import Request from "../../Models/Request";
import ModelService from "./ModelService";

export default class RequestService extends ModelService{

    modelClass = Request;
    prefix = 'requests';
    apiPath = '/api/requests';

}