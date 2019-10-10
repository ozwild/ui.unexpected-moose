import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input, Header, Message, Container} from "semantic-ui-react";
import InputMask from 'react-input-mask';
import useForm from '../../../Hooks/useForm';
import User from '../../../Models/User'

const UserForm = (props) => {
    const {user, onSave} = props;
    const submitHandler = ({values, setValues, setStatus, setFormErrors}) => {
        setStatus("loading");
        user.fill(values).save()
            .then(response => {
                setStatus("success");
                setValues(response);
                if (onSave) {
                    onSave(user);
                }
            })
            .catch(response => {
                setStatus("error");
                setFormErrors(response.errors);
            });
    };
    const {
        values, status, formErrors, setValues,
        handleChange, handleSubmit
    } = useForm({
        initialValues: user,
        onSubmit: submitHandler
    });

    useEffect(() => setValues(user), [user.id]);

    return (
        <Container text>
            <Header as={"h2"}>{!values.id ? "New User" : values.name}</Header>
            <Form onSubmit={handleSubmit}
                  {...(status === "loading" && {loading: true})}
                  {...(status === "success" && {success: true})}
                  {...(status === "error" && {error: true})}>

                <FormGroup widths={"equal"}>

                    <Form.Field control={Input}
                                id={"name"}
                                label={"Name"}
                                name="name"
                                placeholder={"Name"}
                                onChange={handleChange}
                                value={values.name}
                                required
                                {...(formErrors['name'] && {
                                    error: {
                                        content: formErrors['name'][0],
                                        pointing: 'below'
                                    }
                                })}
                    />

                    <Form.Field control={Input}
                                type={"url"}
                                id={"avatar"}
                                label={"Avatar"}
                                name="avatar"
                                placeholder={"Avatar (URL)"}
                                onChange={handleChange}
                                value={values.avatar}
                                {...(formErrors['avatar'] && {
                                    error: {
                                        content: formErrors['avatar'][0],
                                        pointing: 'below'
                                    }
                                })}/>

                </FormGroup>

                <FormGroup widths={"equal"}>

                    <Form.Field control={Input}
                                type={"email"}
                                id={"email"}
                                label={"Email"}
                                name="email"
                                placeholder={"Email Address"}
                                onChange={handleChange}
                                value={values.email}
                                required
                                {...(formErrors['email'] && {
                                    error: {
                                        content: formErrors['email'][0],
                                        pointing: 'below'
                                    }
                                })}/>

                    <Form.Field control={Input}
                                type={"tel"}
                                id={"phone"}
                                label={"Phone"}
                                name={"phone"}
                                placeholder={"Phone Number"}
                                onChange={handleChange}
                                value={values.phone}
                                {...(formErrors['phone'] && {
                                    error: {
                                        content: formErrors['phone'][0],
                                        pointing: 'below'
                                    }
                                })}
                    />

                    {/*<Form.Field>
                        <label htmlFor={"phone"}>Phone</label>
                        <InputMask mask="9999-9999" maskChar=" " value={values.phone} onChange={handleChange}>
                            {
                                (inputProps) => <Form.Input
                                    {...inputProps}
                                    type={"tel"}
                                    id={"phone"}
                                    name="phone"
                                    placeholder={"Phone"}
                                    {...(formErrors['phone'] && {
                                        error: {
                                            content: formErrors['phone'][0],
                                            pointing: 'below'
                                        }
                                    })}
                                />
                            }
                        </InputMask>
                    </Form.Field>*/}

                </FormGroup>

                <Message
                    success
                    header="Success!"
                    content={`The user has been saved`}
                />
                <Form.Button content={"Save!"}/>
            </Form>
        </Container>
    )
};

UserForm.defaultProps = {
    user: new User(),
    onSave: () => {
    }
};

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    onSave: PropTypes.func
};

export default UserForm;