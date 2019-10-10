import React from 'react';
import {Switch} from 'react-router-dom';
import Home from "../Home";
import Login from "../Auth/Login";
import AppLayout from '../Layouts/AppLayout';
import LoginLayout from '../Layouts/LoginLayout';
import ErrorLayout from "../Layouts/ErrorLayout";
import NotFoundErrorPage from "./NotFoundErrorPage";
import NotAuthenticatedErrorPage from "../Auth/NotAuthenticatedErrorPage";

const UnauthenticatedApp = () => {
    return (
        <Switch>
            <AppLayout exact path={'/'} component={Home}/>
            <LoginLayout exact path={'/login'} component={Login}/>
            <ErrorLayout exact path='/assets' component={NotAuthenticatedErrorPage}/>
            <ErrorLayout exact path='/requests' component={NotAuthenticatedErrorPage}/>
            <ErrorLayout exact path='/bookings' component={NotAuthenticatedErrorPage}/>
            <ErrorLayout exact path='/users' component={NotAuthenticatedErrorPage}/>
            <ErrorLayout exact path='/users/create' component={NotAuthenticatedErrorPage}/>
            <ErrorLayout exact path='/users/:userId?/edit' component={NotAuthenticatedErrorPage}/>
            <ErrorLayout component={NotFoundErrorPage}/>
        </Switch>
    );
};

export default UnauthenticatedApp;

