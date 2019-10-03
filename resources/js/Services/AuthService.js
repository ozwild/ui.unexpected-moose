import axios from 'axios';
import {Notyf} from "Notyf";
import 'notyf/notyf.min.css';

const authKey = 'auth';

const store = (data) => {
    window.localStorage.setItem(authKey, JSON.stringify(data));
};

const retrieve = () => {
    return JSON.parse(window.localStorage.getItem(authKey));
};

class AuthDataPack {
    user;
    expiration;
    token;

    constructor({user, token, expiration} = {}) {
        this.token = token;
        this.user = user;
        this.expiration = expiration;
    }

}

export default class AuthService {

    static get theresAUserLoggedIn() {
        return !!this.loggedInUser;
    }

    static get loggedInUser() {
        const authData = retrieve(authKey);
        return authData ? authData.user : null;
    }

    static get token() {
        const authData = retrieve(authKey);
        return authData ? authData.token : null;
    }

    static get authHTTPRequestHeader() {
        return {
            headers: {
                Authorization: `Bearer ${AuthService.token}`
            }
        };
    }

    static login(email, password) {
        return axios.post('/api/auth/login', {email, password})
            .then(({data}) => {
                store(new AuthDataPack(data));
                const notification = new Notyf();
                notification.success(`Welcome ${data.user.name}`);
                return data;
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

    static logout() {
        if (!AuthService.loggedInUser) return;
        store(new AuthDataPack());
        const notification = new Notyf();
        notification.error(`You have been logged-out`);
    }

    static register() {

    }

}