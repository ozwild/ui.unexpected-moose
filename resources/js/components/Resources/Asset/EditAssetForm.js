import React from 'react';
import PropTypes from 'prop-types';
import AssetService from "../../../Services/ModelServices/AssetService";
import AssetForm from "./AssetForm";
import useModelProvider from "../../../Hooks/useModelProvider";

const EditAssetForm = (props) => {
    const {onSave, match} = props;
    const {assetId} = match.params;
    const [asset] = useModelProvider(AssetService, assetId);

    return (
        <AssetForm onSave={onSave} asset={asset}/>
    );

};

EditAssetForm.defaultProps = {
    onSave: () => {
    }
};

EditAssetForm.propTypes = {
    onSave: PropTypes.func
};

export default EditAssetForm;