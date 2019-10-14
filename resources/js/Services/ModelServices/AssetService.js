import Asset from '../../Models/Asset';
import ModelService from "./ModelService";
import APIService from "../APIService";

export default class AssetService extends ModelService {

    modelClass = Asset;
    prefix = 'assets';
    apiPath = '/api/assets';

    /**
     *
     * @param asset {Asset}
     * @returns {Promise<AxiosResponse<T>>}
     */
    restore(asset) {
        APIService.post(`${this.apiPath}/${asset.id}`)
            .then(response => {
                /**
                 * @todo reinstate on cached data without extending cache expiration
                 */
            });
    }

}