import CacheService from "../CacheService";
import Model from "../../Models/Model";
import APIService from "../APIService";

export default class ModelService {

    prefix = 'test';
    modelClass = Model;
    apiPath = '/api/test';

    /**
     * @param query {string}
     * @returns {Promise<string|SpeechRecognitionResultList>|null}
     */
    async search(query) {
        if (!query) {
            return;
        }
        const response = await APIService.get(`${this.apiPath}/search?query=${encodeURIComponent(query)}`);
        return response.results.map(result => this.build(result));
    }

    /**
     *
     * @param id
     * @returns {Promise<Model>}
     */
    async get(id) {
        const response = await APIService.get(`${this.apiPath}/${id}`);
        return this.build(response);
    }

    /**
     *
     * @returns {Promise<void|undefined>}
     */
    async list() {

        const cacheKey = `${this.prefix}_list`;

        /**
         * Attempt to retrieve from cache
         */
        const cached = CacheService.retrieve(cacheKey);

        if (cached) {
            return cached;
        }

        /**
         * Retrieve from server
         */

        const response = await APIService.get(`${this.apiPath}/list`);

        /**
         * Store to cache
         */
        CacheService.store(cacheKey, response);

        return response;

    }

    /**
     *
     * @param page
     * @returns {Promise<void>}
     */
    async all(page = 1) {
        return await APIService.get(`${this.apiPath}?page=${page}`);
    }

    /**
     *
     * @param data
     * @returns {Model}
     */
    build(data) {
        return this.modelClass.new(data);
    }

    /**
     * @param model {Model}
     * @returns {Promise<AxiosResponse<any>|never>}
     */
    save(model) {
        return model.isANewRecord ?
            this.#store(model.data) :
            this.#update(model.data);
    }

    /**
     *
     * @param serverResponse
     */
    _processResponseErrors(serverResponse) {
        const response = serverResponse.response.data;
        response.messages = Object.values(response.errors)
            .reduce((reduction, errorMessages) => {
                return reduction.concat(errorMessages);
            }, []);
        throw response;
    }


    #store(model) {
        return APIService.post(`${this.apiPath}`, model)
            .catch(error => {
                this._processResponseErrors(error);
            });
    }

    /**
     *
     * @param model
     * @returns {Promise<* | never>}
     */
    #update(model) {
        return APIService.put(`${this.apiPath}/${model.id}`, model)
            .catch(error => {
                this._processResponseErrors(error);
            });
    }

    delete(model) {
        return APIService.delete(`${this.apiPath}/${model.id}`)
            .then(response => {
                /**
                 * @todo remove from cached data without extending cache expiration
                 */
            });
    }

    restore(model) {
        return APIService.post(`'${this.apiPath}/${model.id}`, model)
            .then(response => {
                /**
                 * @todo reinstate on cached data without extending cache expiration
                 */
            });
    }

}