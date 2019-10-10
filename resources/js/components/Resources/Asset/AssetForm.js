import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input, Header, Message, Container, TextArea} from "semantic-ui-react";
import useForm from '../../../Hooks/useForm';
import Asset from '../../../Models/Asset';

const AssetForm = (props) => {
    const {asset, onSave} = props;
    const submitHandler = ({values, setValues, setStatus, setFormErrors}) => {
        setStatus("loading");
        asset.fill(values).save()
            .then(response => {
                setStatus("success");
                setValues(response);
                if (onSave) {
                    onSave(asset);
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
        initialValues: asset,
        onSubmit: submitHandler
    });

    useEffect(() => setValues(asset), [asset.id]);

    return (
        <Container text>
            <Header as={"h2"}>{!values.id ? "New Asset" : values.name}</Header>
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
                                id={"picture"}
                                label={"Picture"}
                                name="picture"
                                placeholder={"Picture (URL)"}
                                onChange={handleChange}
                                value={values.picture}
                                {...(formErrors['picture'] && {
                                    error: {
                                        content: formErrors['picture'][0],
                                        pointing: 'below'
                                    }
                                })}/>

                </FormGroup>

                <FormGroup widths={"equal"}>

                    <Form.Field control={TextArea}
                                id={"description"}
                                label={"Description"}
                                name="description"
                                placeholder={"Description"}
                                onChange={handleChange}
                                value={values.description}
                                required
                                {...(formErrors['description'] && {
                                    error: {
                                        content: formErrors['description'][0],
                                        pointing: 'below'
                                    }
                                })}/>

                </FormGroup>

                <Message
                    success
                    header="Success!"
                    content={`The asset has been saved`}
                />
                <Form.Button content={"Save!"}/>
            </Form>
        </Container>
    )
};

AssetForm.defaultProps = {
    asset: new Asset(),
    onSave: () => {
    }
};

AssetForm.propTypes = {
    asset: PropTypes.object.isRequired,
    onSave: PropTypes.func
};

export default AssetForm;