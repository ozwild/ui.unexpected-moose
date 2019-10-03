import axios from 'axios';
import AuthService from './AuthService';
import Asset from '../Models/Asset';

export default class AssetService {

    static prefix() {
        return 'assets';
    }

    /**
     * @param query {string}
     * @returns {Promise<string|SpeechRecognitionResultList>|null}
     */
    static async search(query) {

        if (!query) {
            return;
        }
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(`/api/assets/search?query=${encodeURIComponent(query)}`, authHTTPRequestHeader);
        const {data} = await response;
        return data.results.map(assetData => new Asset(assetData));
    }

    /**
     * @param id {int}
     * @returns {Promise<Asset | Promise<Asset | never>>}
     */
    static async get(id) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(`/api/assets/${id}`, authHTTPRequestHeader);
        const {data} = await response;
        return AssetService.build(data);
    }

    static async all(page = 1) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(`api/assets?page=${page}`, authHTTPRequestHeader);
        return await response.data;
    }

    /**
     *
     * @param data {Object}
     * @returns {Asset}
     */
    static build(data) {
        return new Asset(data);
    }

    /**
     * @param asset {Asset}
     * @returns {Promise<AxiosResponse<any>|never>}
     */
    static save(asset) {
        return asset.isANewRecord ?
            this.#store(asset) :
            this.#update(asset);
    }

    /**
     * @param asset {Asset}
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #store(asset) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.post('/api/assets', asset, authHTTPRequestHeader)
            .then(response => response.data)
            .catch(error => {
                const response = error.response.data;
                response.messages = Object.values(response.errors)
                    .reduce((reduction, errorMessages) => {
                        return reduction.concat(errorMessages);
                    }, []);
                throw response;
            });
    }

    /**
     * @param asset {Asset}
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #update(asset) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.put('/api/assets/' + asset.id, asset, authHTTPRequestHeader)
            .then(response => response.data)
            .catch(error => {
                const response = error.response.data;
                response.messages = Object.values(response.errors)
                    .reduce((reduction, errorMessages) => {
                        return reduction.concat(errorMessages);
                    }, []);
                throw response;
            });
    }

    /**
     *
     * @param asset {Asset}
     * @returns {Promise<AxiosResponse<T>>}
     */
    static delete(asset) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.delete(`/api/assets/${asset.id}`, authHTTPRequestHeader);
    }

    /**
     *
     * @param asset {Asset}
     * @returns {Promise<AxiosResponse<T>>}
     */
    static restore(asset) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.post(`/api/assets/${asset.id}`, authHTTPRequestHeader);
    }

}