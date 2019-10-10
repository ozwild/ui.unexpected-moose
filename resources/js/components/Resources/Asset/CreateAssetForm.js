import React from 'react';
import PropTypes from 'prop-types';
import AssetForm from "./AssetForm";
import Asset from "../../../Models/Asset";

const CreateAssetForm = (props) => {
    const asset = new Asset();
    const {onSave} = props;

    return (
        <AssetForm onSave={onSave} asset={asset}/>
    );

};

CreateAssetForm.defaultProps = {
    onSave: () => {
    }
};

CreateAssetForm.propTypes = {
    onSave: PropTypes.func
};

export default CreateAssetForm;