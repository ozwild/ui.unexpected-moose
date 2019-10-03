import React from 'react';
import PropTypes from 'prop-types';
import useDataProvider from './useDataProvider';
import UserForm from "./UserForm";
import UserService from "../Services/UserService";
import User from "../Models/User";

const EditUserForm = (props) => {
    const {onSave, match} = props;
    const {userId} = match.params;
    const [{model, isLoading, isError}] = useDataProvider(UserService, userId, new User());

    return (
        <UserForm onSave={onSave} user={model} isLoading={isLoading} isError={isError}/>
    );

};

EditUserForm.defaultProps = {
    onSave: () => {
    }
};

EditUserForm.propTypes = {
    onSave: PropTypes.func
};

export default EditUserForm;