import React from 'react';
import PropTypes from 'prop-types';
import UserService from "../../../Services/ModelServices/UserService";
import useModelListProvider from "../../../Hooks/useModelListProvider";
import AssetService from "../../../Services/ModelServices/AssetService";
import Booking from "../../../Models/Booking";
import BookingForm from "./BookingForm";

const CreateBookingForm = (props) => {

    const {onSave} = props;
    const booking = new Booking();
    const [users, usersAreLoading] = useModelListProvider(UserService);
    const [assets, assetsAreLoading] = useModelListProvider(AssetService);

    return (
        <BookingForm onSave={onSave} request={booking}
                     users={users}
                     assets={assets}
                     isLoading={usersAreLoading || assetsAreLoading}
        />
    );

};

CreateBookingForm.defaultProps = {
    onSave: () => {
    }
};

CreateBookingForm.propTypes = {
    onSave: PropTypes.func
};

export default CreateBookingForm;