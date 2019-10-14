import Booking from '../../Models/Booking';
import ModelService from "./ModelService";

export default class BookingService extends ModelService{

    modelClass = Booking;
    prefix = 'bookings';
    apiPath = '/api/bookings';

}