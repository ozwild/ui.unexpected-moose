import axios from 'axios';
import AuthService from './AuthService';
import Booking from '../Models/Booking';

export default class BookingService {

    static prefix() {
        return 'bookings';
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
        const response = await axios.get(`/api/bookings/search?query=${encodeURIComponent(query)}`, authHTTPRequestHeader);
        const {data} = await response;
        return data.results.map(bookingData => new Request(bookingData));
    }

    /**
     * @param id {int}
     * @returns {Promise<Booking | Promise<Asset | never>>}
     */
    static async get(id) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(`/api/bookings/${id}`, authHTTPRequestHeader);
        const {data} = await response;
        return BookingService.build(data);
    }

    /**
     *
     * @param page {int}
     * @returns {Promise<void>}
     */
    static async all(page = 1) {
        const {authHTTPRequestHeader} = AuthService;
        const response = await axios.get(`api/bookings?page=${page}`, authHTTPRequestHeader);
        return await response.data;
    }

    /**
     *
     * @param data {Object}
     * @returns {Booking}
     */
    static build(data) {
        return new Booking(data);
    }

    /**
     * @param booking {Booking}
     * @returns {Promise<AxiosResponse<any>|never>}
     */
    static save(booking) {
        return booking.isANewRecord ?
            this.#store(booking) :
            this.#update(booking);
    }

    /**
     * @param booking {Booking}
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #store(booking) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.post('/api/bookings', booking, authHTTPRequestHeader)
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
     * @param booking {Booking}
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #update(booking) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.put('/api/bookings/' + booking.id, booking, authHTTPRequestHeader)
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
     * @param booking {Booking}
     * @returns {Promise<AxiosResponse<T>>}
     */
    static delete(booking) {
        const {authHTTPRequestHeader} = AuthService;
        return axios.delete(`/api/bookings/${booking.id}`, authHTTPRequestHeader);
    }

}