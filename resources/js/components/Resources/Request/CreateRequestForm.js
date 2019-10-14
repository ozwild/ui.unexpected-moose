import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Request from "../../../Models/Request";
import RequestForm from "./RequestForm";
import UserService from "../../../Services/ModelServices/UserService";
import useModelListProvider from "../../../Hooks/useModelListProvider";
import AssetService from "../../../Services/ModelServices/AssetService";

const CreateRequestForm = (props) => {

    const {onSave} = props;
    const request = new Request();
    const [users, usersAreLoading] = useModelListProvider(new UserService());
    const [assets, assetsAreLoading] = useModelListProvider(new AssetService());

    return (
        <RequestForm onSave={onSave} request={request}
                     users={users}
                     assets={assets}
                     isLoading={usersAreLoading || assetsAreLoading}
        />
    );

};

CreateRequestForm.defaultProps = {
    onSave: () => {
    }
};

CreateRequestForm.propTypes = {
    onSave: PropTypes.func
};

export default CreateRequestForm;