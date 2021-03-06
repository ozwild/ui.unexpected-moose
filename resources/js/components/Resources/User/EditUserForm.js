import React from 'react';
import PropTypes from 'prop-types';
import UserForm from "./UserForm";
import UserService from "../../../Services/ModelServices/UserService";
import useModelProvider from "../../../Hooks/useModelProvider";

const EditUserForm = (props) => {
    const {onSave, match} = props;
    const {userId} = match.params;
    const [user, isLoading] = useModelProvider(UserService, userId);

    return (
        <UserForm onSave={onSave} user={user} isLoading={isLoading}/>
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