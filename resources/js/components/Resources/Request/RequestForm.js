import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input, Header, Message, Container, TextArea, Select} from "semantic-ui-react";
import useForm from '../../../Hooks/useForm';
import Request from "../../../Models/Request";

const RequestForm = (props) => {
    const {request, onSave} = props;
    const users = props.users.map(user => {
        return {
            key: user.id,
            text: user.name,
            value: user.id,
            image: {avatar: true, src: user.avatar}
        }
    });
    const assets = props.assets.map(asset => {
        return {
            key: asset.id,
            text: asset.name,
            value: asset.id
        }
    });
    const submitHandler = ({values, setValues, setStatus, setFormErrors}) => {
        setStatus("loading");
        request.fill(values).save()
            .then(response => {
                setStatus("success");
                setValues(response);
                if (onSave) {
                    onSave(request);
                }
            }).catch(response => {
            setStatus("error");
            setFormErrors(response.errors);
        });
    };
    const {
        values, status, formErrors, setValues,
        handleChange, handleSubmit
    } = useForm({
        initialValues: request,
        onSubmit: submitHandler
    });

    useEffect(() => setValues(request), [request.id]);

    return (
        <Container text>
            <Header as={"h2"}>{!values.id ? "New Request" : values.name}</Header>
            <Form onSubmit={handleSubmit}
                  {...(status === "loading" || props.isLoading && {loading: true})}
                  {...(status === "success" && {success: true})}
                  {...(status === "error" && {error: true})}>

                <FormGroup widths={"equal"}>

                    <Form.Field control={Select}
                                id={"asset_id"}
                                label={"Asset"}
                                name="asset_id"
                                placeholder={"Select an Asset"}
                                onChange={handleChange}
                                value={values.asset_id}
                                options={assets}
                                required
                                selection
                                search
                                {...(formErrors['asset_id'] && {
                                    error: {
                                        content: formErrors['asset_id'][0],
                                        pointing: 'below'
                                    }
                                })}
                    />

                    <Form.Field control={Select}
                                id={"user_id"}
                                label={"User"}
                                name="user_id"
                                placeholder={"Select a User"}
                                onChange={handleChange}
                                value={values.user_id}
                                options={users}
                                required
                                selection
                                search
                                {...(formErrors['user_id'] && {
                                    error: {
                                        content: formErrors['user_id'][0],
                                        pointing: 'below'
                                    }
                                })}
                    />

                </FormGroup>

                <FormGroup widths={"equal"}>

                    <Form.Field control={Input}
                                type={"datetime-local"}
                                id={"from"}
                                label={"From"}
                                name="from"
                                placeholder={"From"}
                                onChange={handleChange}
                                value={values.from}
                                required
                                {...(formErrors['from'] && {
                                    error: {
                                        content: formErrors['from'][0],
                                        pointing: 'below'
                                    }
                                })}/>

                    <Form.Field control={Input}
                                type={"datetime-local"}
                                id={"to"}
                                label={"To"}
                                name="to"
                                placeholder={"To"}
                                onChange={handleChange}
                                value={values.to}
                                required
                                {...(formErrors['to'] && {
                                    error: {
                                        content: formErrors['to'][0],
                                        pointing: 'below'
                                    }
                                })}/>

                </FormGroup>

                <FormGroup>
                    <Form.Checkbox
                        id={"is_pending"}
                        name={"is_pending"}
                        label={"Pending for review?"}
                        onChange={handleChange}
                        checked={values.is_pending === 1}
                        readOnly
                    />
                </FormGroup>

                <Message
                    success
                    header="Success!"
                    content={`The request has been saved`}
                />
                <Form.Button content={"Save!"}/>
            </Form>
        </Container>
    )
};

RequestForm.defaultProps = {
    isLoading: false,
    request: new Request(),
    users: [],
    assets: [],
    onSave: () => {
    }
};

RequestForm.propTypes = {
    isLoading: PropTypes.bool,
    request: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    assets: PropTypes.array.isRequired,
    onSave: PropTypes.func
};

export default RequestForm;