import Booking from '../../Models/Booking';
import ModelService from "./ModelService";

export default class BookingService extends ModelService {

    static get model() {
        return Booking;
    }

    static get prefix() {
        return 'bookings';
    }

    static get apiPath() {
        return '/api/bookings';
    }

}