import React from 'react';
import {Container, Segment, Responsive, Card, Image, Menu, Header, Icon, Divider} from "semantic-ui-react";
import useBodyClass from '../../Hooks/useBodyClass';
import {useAuth} from "../../Contexts/AuthContext";

const NotFoundErrorPage = (props) => {
    useBodyClass(`not-found`);
    const {isLoggedIn} = useAuth();
    return (
        <>
            <Responsive as={Segment} minWidth={Responsive.onlyMobile.maxWidth} basic>
                <Container>
                    <Card style={{maxWidth: "430px", width: "100%"}}>

                        <Image src='/images/lost-found-search.jpg' wrapped ui={false} style={{objectFit: "cover"}}/>

                        <Card.Content>
                            <Card.Header>404 - Page Not Found</Card.Header>
                            <Card.Description>
                                <p>We swear we tried, but we couldn't find the page requested. Are you sure you got
                                    it
                                    right?</p>
                                {!isLoggedIn() &&
                                <p>Either you are trying to access a page that requires authentication or the page
                                    actually
                                    doesn't
                                    exist</p>}
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
                                {!isLoggedIn() && <Menu.Item
                                    name={'Login'}
                                    onClick={() => location.href = "/login"}
                                >
                                    <Icon name={'sign in'}/>
                                    Login
                                </Menu.Item>}
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
                    <Header as='h2' icon >
                        <Icon name='compass outline'/>
                        404 - Not Found
                        <Divider/>
                        <Header.Subheader style={{color: 'white'}}>
                            We swear we tried, but we couldn't find the page requested. Are you sure you got it
                            right?
                            {!isLoggedIn() &&
                            <>Either you are trying to access a page that requires authentication or the page
                                actually
                                doesn't exist</>}
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
                        {!isLoggedIn() && <Menu.Item
                            name={'Login'}
                            onClick={() => location.href = "/login"}
                        >
                            <Icon name={'sign in'}/>
                            Login
                        </Menu.Item>}
                    </Menu>
                </Segment>
            </Responsive>
        </>
    );
};

export default NotFoundErrorPage;