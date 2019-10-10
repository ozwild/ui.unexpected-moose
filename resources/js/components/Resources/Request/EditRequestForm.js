import React from 'react';
import PropTypes from 'prop-types';
import RequestForm from "./RequestForm";
import RequestService from "../../../Services/ModelServices/RequestService";
import useModelProvider from "../../../Hooks/useModelProvider";
import useModelListProvider from "../../../Hooks/useModelListProvider";
import UserService from "../../../Services/ModelServices/UserService";
import AssetService from "../../../Services/ModelServices/AssetService";

const EditRequestForm = (props) => {
    const {onSave, match} = props;
    const {requestId} = match.params;
    const [{model}] = useModelProvider(RequestService, requestId);
    const [users, usersAreLoading] = useModelListProvider(UserService);
    const [assets, assetsAreLoading] = useModelListProvider(AssetService);

    return (
        <RequestForm onSave={onSave} request={model}
                     users={users}
                     assets={assets}
                     isLoading={usersAreLoading || assetsAreLoading}
        />
    );

};

EditRequestForm.defaultProps = {
    onSave: () => {
    }
};

EditRequestForm.propTypes = {
    onSave: PropTypes.func
};

export default EditRequestForm;