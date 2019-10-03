import React from 'react';
import PropTypes from 'prop-types';
import User from '../Models/User'
import UserForm from "./UserForm";

const CreateUserForm = (props) => {
    const contact = new User();
    const {onSave} = props;

    return (
        <UserForm onSave={onSave} contact={contact}/>
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