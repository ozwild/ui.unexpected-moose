import React from 'react';
import PropTypes from 'prop-types';
import User from '../../../Models/User'
import UserForm from "./UserForm";

const CreateUserForm = (props) => {
    const user = new User();
    const {onSave} = props;

    return (
        <UserForm onSave={onSave} user={user}/>
    );

};

CreateUserForm.defaultProps = {
    onSave: () => {
    }
};

CreateUserForm.propTypes = {
    onSave: PropTypes.func
};

export default CreateUserForm;