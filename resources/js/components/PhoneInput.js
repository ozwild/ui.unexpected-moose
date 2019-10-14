import React from 'react';
import OriginalPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css';

const PhoneInput = (props) => {
    const onChange = (value, data) => {
        const inputData = Object.assign({}, props, {
            value: value,
            PhoneAreaData: data
        });
        props.onChange(null, inputData);
    };
    return (
        <OriginalPhoneInput {...props} onChange={onChange}/>
    );
};

export default PhoneInput;