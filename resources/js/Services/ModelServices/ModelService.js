import CacheService from "../CacheService";
import Model from "../../Models/Model";
import APIService from "../APIService";

const queryString = require('query-string');

class ModelService {

    static get model() {
        return Model;
    }

    static get prefix() {
        return 'test';
    }

    static get apiPath() {
        return '/api/test';
    }

    /**
     * @param query {string}
     * @returns {Promise<string|SpeechRecognitionResultList>|null}
     */
    static async search(query) {
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
    static async get(id) {
        const response = await APIService.get(`${this.apiPath}/${id}`);
        return this.build(response);
    }

    /**
     *
     * @returns {Promise<void|undefined>}
     */
    static async list() {

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
     * @param otherOptions
     * @returns {Promise<void>}
     */
    static async all(page = 1, otherOptions = {}) {
        const query = queryString.stringify(Object.assign({page}, otherOptions));
        return await APIService.get(`${this.apiPath}?${query}`);
    }

    /**
     *
     * @param data
     * @returns {Model}
     */
    static build(data) {
        return this.model.new(data);
    }

    /**
     *
     * @param model {Model}
     * @returns {*}
     */
    static save(model) {
        return model.isANewRecord ?
            this.#store(model) :
            this.#update(model);
    }

    /**
     *
     * @param serverResponse
     * @private
     */
    static _processResponseErrors(serverResponse) {
        const response = serverResponse.response.data;
        response.messages = Object.values(response.errors)
            .reduce((reduction, errorMessages) => {
                return reduction.concat(errorMessages);
            }, []);
        throw response;
    }


    /**
     *
     * @param model {Model}
     * @returns {Promise<void | never>}
     */
    static #store(model) {
        return APIService.post(`${this.apiPath}`, model.data)
            .catch(error => {
                this._processResponseErrors(error);
            });
    }

    /**
     *
     * @param model {Model}
     * @returns {Promise<* | never>}
     */
    static #update(model) {
        return APIService.put(`${this.apiPath}/${model.id}`, model.data)
            .catch(error => {
                this._processResponseErrors(error);
            });
    }

    /**
     *
     * @param model {Model}
     * @returns {Promise<Promise<AxiosResponse<T>> | never>}
     */
    static delete(model) {
        return APIService.delete(`${this.apiPath}/${model.id}`)
            .then(response => {
                /**
                 * @todo remove from cached data without extending cache expiration
                 */
            });
    }

}

export default ModelService;