import axios from 'axios';
import CacheService from "../CacheService";
import AuthService from "../AuthService";
import User from "../../Models/User";

export default class UserService {

    static prefix() {
        return 'users';
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
        const response = await axios.get(`/api/users/search?query=${encodeURIComponent(query)}`, authHTTPRequestHeader);
        const {data} = await response;
        return data.results.map(userData => new User(userData));
    }

    /**
     * @param id {int}
     * @returns {Promise<User | Promise<User | never>>}
     */
    static async get(id) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(`/api/users/${id}`, authHTTPRequestHeader);
        const {data} = await response;
        return UserService.build(data);
    }

    static async list() {
        console.log('user list invoked');
        /**
         * Attempt to retrieve from cache
         */
        const cached = CacheService.retrieve('users');

        if (cached) {
            return cached;
        }

        /**
         * Retrieve from server
         */
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(`/api/users/list`, authHTTPRequestHeader);
        const data = await response.data;

        /**
         * Store to cache
         */
        CacheService.store('users', data);

        return data;

    }

    static async all(page = 1) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(`api/users?page=${page}`, authHTTPRequestHeader);
        return await response.data;
    }

    /**
     *
     * @param data {Object}
     * @returns {User}
     */
    static build(data) {
        return new User(data);
    }

    /**
     * @param user {User}
     * @returns {Promise<AxiosResponse<any>|never>}
     */
    static save(user) {
        return user.isANewRecord ?
            this.#store(user) :
            this.#update(user);
    }

    /**
     * @param user User
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #store(user) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.post('/api/users', user, authHTTPRequestHeader)
            .then(response => {
                /**
                 * @todo add new to cache without extending cache expiration
                 */
                return response.data;
            })
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
     * @param user User
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #update(user) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.put('/api/users/' + user.id, user, authHTTPRequestHeader)
            .then(response => {
                /**
                 * @todo modify on cache without extending cache expiration
                 */
                return response.data;
            }).catch(error => {
                const response = error.response.data;
                response.messages = Object.values(response.errors)
                    .reduce((reduction, errorMessages) => {
                        return reduction.concat(errorMessages);
                    }, []);
                throw response;
            });
    }

    static delete(user) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.delete(`/api/users/${user.id}`, authHTTPRequestHeader)
            .then(response => {
                /**
                 * @todo remove from cached data without extending cache expiration
                 */
            });
    }

    static restore(user) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.post(`/api/users/${user.id}`, authHTTPRequestHeader)
            .then(response => {
                /**
                 * @todo reinstate on cached data without extending cache expiration
                 */
            });
    }

}