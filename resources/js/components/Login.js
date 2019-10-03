import React, {useState} from 'react';
import {useAuth} from "../Contexts/AuthContext";
import {Container, Form, FormGroup, Input, Card, Image} from "semantic-ui-react";
import useForm from "./useForm";
import useBodyClass from "./useBodyClass";

const Login = (props) => {
    const {history} = props;
    const {login} = useAuth();
    const [status, setStatus] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const {values, handleChange, handleSubmit, setValues} = useForm({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit({values}) {
            setStatus("loading");
            setFormErrors({});
            login(values.email, values.password)
                .then(response => {
                    setStatus("success");
                    const newLocation = history.location.pathname === "/login" ? "/" : history.location.pathname;
                    history.push(newLocation);
                })
                .catch(error => {
                    setStatus("error");
                    setFormErrors(error.errors);
                });
        }
    });
    useBodyClass(`login`);
    return (
        <Container style={{paddingTop: "3em"}}>
            <Card style={{maxWidth: "430px"}}>

                <Image src='/images/gate.jpg' wrapped ui={false} style={{objectFit: "cover"}}/>

                <Card.Content>
                    <Form onSubmit={handleSubmit}
                          {...(status === "loading" && {loading: true})}
                          {...(status === "success" && {success: true})}
                          {...(status === "error" && {error: true})}>

                        <FormGroup widths={"equal"}>

                            <Form.Field control={Input}
                                        type={"email"}
                                        id={"email"}
                                        label={"Email Address"}
                                        name="email"
                                        placeholder={"Registered email address"}
                                        onChange={handleChange}
                                        value={values.email}
                                        required
                                        {...(formErrors['email'] && {
                                            error: {
                                                content: formErrors['email'][0],
                                                pointing: 'below'
                                            }
                                        })}
                            />
                        </FormGroup>

                        <FormGroup widths={"equal"}>
                            <Form.Field control={Input}
                                        type={"password"}
                                        id={"password"}
                                        label={"Password"}
                                        name="password"
                                        placeholder={"Password"}
                                        onChange={handleChange}
                                        value={values.password}
                                        required
                                        {...(formErrors['password'] && {
                                            error: {
                                                content: formErrors['password'][0],
                                                pointing: 'below'
                                            }
                                        })}
                            />
                        </FormGroup>
                        <Form.Button content={"Submit"}/>
                    </Form>
                </Card.Content>
            </Card>
        </Container>
    );
};

export default Login;