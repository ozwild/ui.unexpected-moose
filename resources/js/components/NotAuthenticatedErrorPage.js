import React, {useState, useContext} from 'react';
import {Container, Header, Card, Image, Responsive, Segment, Menu, Icon, Divider} from "semantic-ui-react";
import useBodyClass from "./useBodyClass";

const NotAuthenticatedErrorPage = (props) => {
    useBodyClass(`not-authenticated`);
    return (
        <>
            <Responsive as={Segment} minWidth={Responsive.onlyMobile.maxWidth} basic>
                <Container>
                    <Card style={{maxWidth: "430px", width: "100%"}}>

                        <Image src='/images/not-authenticated.jpg' wrapped ui={false} style={{objectFit: "cover"}}/>

                        <Card.Content>
                            <Card.Header>401 - Authentication Required</Card.Header>
                            <Card.Description>
                                <p>Sorry pal, this page requires authentication</p>
                            </Card.Description>
                        </Card.Content>

                        <Card.Content extra>
                            <Menu secondary>
                                <Menu.Item
                                    name={'Home'}
                                    onClick={() => location.href = "/"}
                                >
                                    <Icon name={'home'}/>
                                    Home
                                </Menu.Item>
                                <Menu.Item
                                    name={'Login'}
                                    onClick={() => location.href = "/login"}
                                >
                                    <Icon name={'sign in'}/>
                                    Login
                                </Menu.Item>
                            </Menu>
                        </Card.Content>

                    </Card>
                </Container>
            </Responsive>
            <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                <Segment inverted padded compact basic
                         style={{
                             opacity: "0.94",
                             position: "absolute",
                             bottom: '0',
                             right: '0',
                             margin: '4px'
                         }}>
                    <Header as='h2'>
                        <Icon name='sign in'/>
                        401 - Authentication Required
                        <Divider/>
                        <Header.Subheader style={{color: 'white'}}>
                            Sorry pal, this page requires authentication
                        </Header.Subheader>
                    </Header>
                    <Menu inverted pointing secondary>
                        <Menu.Item
                            name={'Home'}
                            color={'blue'}
                            onClick={() => location.href = "/"}
                        >
                            <Icon name={'home'}/>
                            Home
                        </Menu.Item>
                        <Menu.Item
                            name={'Login'}
                            onClick={() => location.href = "/login"}
                        >
                            <Icon name={'sign in'}/>
                            Login
                        </Menu.Item>
                    </Menu>
                </Segment>
            </Responsive>
        </>
    );
};

export default NotAuthenticatedErrorPage;