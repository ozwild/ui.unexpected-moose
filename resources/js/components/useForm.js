import React, {useState} from 'react';

const useForm = ({initialValues, onSubmit}) => {

    /**
     * Add `validate` to the list of parameters
     * when implementing Form Validation
     */

    const [values, setValues] = useState(initialValues || {});
    const [touchedValues, setTouchedValues] = useState({});
    /*const [errors, setErrors] = useState({});*/

    const updateValues = values => {
        setValues({
            ...values
        });
    };

    const handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleBlur = event => {
        const target = event.target;
        const name = target.name;
        setTouchedValues({
            ...touchedValues,
            [name]: true
        });
        /* Implementation of Form Validation
        if (validate) {
            const e = validate(values);
            setErrors({
                ...errors,
                ...e
            })
        }*/
    };

    const handleSubmit = event => {
        event.preventDefault();
        /* Implementation of Form Validation
        if (validate) {
            const e = validate(values);
            setErrors({
                ...errors,
                ...e
            });
        }
        onSubmit({values, e});*/
        onSubmit({values});
    };

    return {
        values,
        touchedValues,
        handleChange,
        handleSubmit,
        handleBlur,
        updateValues,
        setValues
    };
};

export default useForm;