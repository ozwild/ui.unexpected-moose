import CacheService from "../CacheService";
import ModelService from './ModelService';
import Model from "../../Models/Model";
import APIService from "../APIService";

class RestorableModelService extends ModelService {

    /**
     *
     * @param model {Model}
     * @returns {Promise<AxiosResponse<T>>}
     */
    static restore(model) {
        return APIService.post(`${this.apiPath}/${model.id}`)
            .then(response => {
                /**
                 * @todo reinstate on cached data without extending cache expiration
                 */
            });
    }

}

export default RestorableModelService;