import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import AppBar from './AppBar';
import Home from "./Home";
import AssetsIndex from "./AssetsIndex";
import RequestsIndex from "./RequestsIndex";
import BookingsIndex from "./BookingsIndex";
import UsersIndex from "./UsersIndex";
import Footer from "./Footer";
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
} from 'semantic-ui-react'


class App extends Component {
    render() {
        return (
            <div>
                <Container text style={{marginTop: '2em'}}>
                    <Header as='h1'>Unexpected-Moose</Header>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed justo et augue pulvinar
                        vehicula eu eu ex. Vivamus vulputate justo ac placerat imperdiet. Nam in tortor vehicula leo
                        sollicitudin elementum quis ac ipsum.
                    </p>
                </Container>

                <AppBar/>

                <Switch>

                    <Route exact path={'/'} component={Home}/>
                    <Route exact path='/assets' component={AssetsIndex}/>
                    <Route exact path='/requests' component={RequestsIndex}/>
                    <Route exact path='/bookings' component={BookingsIndex}/>
                    <Route exact path='/users' component={UsersIndex}/>

                </Switch>

                <Footer/>

            </div>
        );
    }
}

export default App;

