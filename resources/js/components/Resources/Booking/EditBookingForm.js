import React from 'react';
import PropTypes from 'prop-types';
import useModelProvider from "../../../Hooks/useModelProvider";
import useModelListProvider from "../../../Hooks/useModelListProvider";
import UserService from "../../../Services/ModelServices/UserService";
import AssetService from "../../../Services/ModelServices/AssetService";
import BookingService from "../../../Services/ModelServices/BookingService";
import BookingForm from "./BookingForm";

const EditBookingForm = (props) => {
    const {onSave, match} = props;
    const {bookingId} = match.params;
    const [{model}] = useModelProvider(new BookingService(), bookingId);
    const [users, usersAreLoading] = useModelListProvider(new UserService());
    const [assets, assetsAreLoading] = useModelListProvider(new AssetService());

    return (
        <BookingForm onSave={onSave} booking={model}
                     users={users}
                     assets={assets}
                     isLoading={usersAreLoading || assetsAreLoading}
        />
    );

};

EditBookingForm.defaultProps = {
    onSave: () => {
    }
};

EditBookingForm.propTypes = {
    onSave: PropTypes.func
};

export default EditBookingForm;