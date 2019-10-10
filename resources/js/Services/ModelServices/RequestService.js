import axios from 'axios';
import AuthService from "../AuthService";
import Request from "../../Models/Request";


export default class RequestService {

    static prefix() {
        return 'requests';
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
        const response = await axios.get(`/api/requests/search?query=${encodeURIComponent(query)}`, authHTTPRequestHeader);
        const {data} = await response;
        return data.results.map(requestData => new Request(requestData));
    }

    /**
     * @param id {int}
     * @returns {Promise<Request | Promise<Asset | never>>}
     */
    static async get(id) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(`/api/requests/${id}`, authHTTPRequestHeader);
        const {data} = await response;
        return RequestService.build(data);
    }

    /**
     *
     * @param page {int}
     * @returns {Promise<void>}
     */
    static async all(page = 1) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(`api/requests?page=${page}`, authHTTPRequestHeader);
        return await response.data;
    }

    /**
     *
     * @param data {Object}
     * @returns {Request}
     */
    static build(data) {
        return new Request(data);
    }

    /**
     * @param request {Request}
     * @returns {Promise<AxiosResponse<any>|never>}
     */
    static save(request) {
        return request.isANewRecord ?
            this.#store(request) :
            this.#update(request);
    }

    /**
     * @param request {Request}
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #store(request) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.post('/api/requests', request, authHTTPRequestHeader)
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
     * @param request {Request}
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #update(request) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.put('/api/requests/' + request.id, request, authHTTPRequestHeader)
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
     * @param request {Request}
     * @returns {Promise<AxiosResponse<T>>}
     */
    static delete(request) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.delete(`/api/requests/${request.id}`, authHTTPRequestHeader);
    }

}