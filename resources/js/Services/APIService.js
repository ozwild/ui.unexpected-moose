import axios from "axios";
import AuthService from "./AuthService";

class APIService {

    /**
     *
     * @param url
     * @returns {Promise<void>}
     */
    static async get(url) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(url, authHTTPRequestHeader);
        const {data} = await response;
        return data;
    }

    /**
     *
     * @param url
     * @param postData
     * @returns {Promise<void>}
     */
    static async post(url, postData) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.post(url, postData, authHTTPRequestHeader);
        const {data} = await response;
        return data;
    }

    static async put(url, postData) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.put(url, postData, authHTTPRequestHeader);
        const {data} = await response;
        return data;
    }

    static async delete(url){
        const {authHTTPRequestHeader} = AuthService;
        return axios.delete(url, authHTTPRequestHeader);
    }

}

export default APIService;