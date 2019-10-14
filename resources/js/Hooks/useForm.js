import React, {useState} from 'react';

const useForm = ({initialValues, onSubmit}) => {

    /**
     * Add `validate` to the list of parameters
     * when implementing Form Validation
     */

    const [values, setValues] = useState(initialValues || {});
    const [touchedValues, setTouchedValues] = useState({});
    const [status, setStatus] = useState("loading");
    const [formErrors, setFormErrors] = useState({});
    /*const [errors, setErrors] = useState({});*/

    const updateValues = values => {
        setValues({
            ...values
        });
    };

    const handleChange = (...args) => {
        const [event, input] = args;
        const {value, checked, name} = input;
        setValues({
            ...values,
            [name]: checked === undefined ? value : checked
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
        /* Implementation of local Form Validation
        if (validate) {
            const e = validate(values);
            setErrors({
                ...errors,
                ...e
            });
        }
        onSubmit({values, e});*/
        setFormErrors({});
        onSubmit({values, setValues, setFormErrors, setStatus});
    };

    return {
        values,
        status,
        formErrors,
        touchedValues,
        handleChange,
        handleSubmit,
        handleBlur,
        updateValues,
        setValues,
        setStatus,
        setFormErrors
    };
};

export default useForm;