import React from 'react';
import {Switch} from 'react-router-dom';
import Home from "./Home";
import Login from "./Login";
import AssetIndex from "./AssetIndex";
import RequestIndex from "./RequestIndex";
import BookingsIndex from "./BookingsIndex";
import UserIndex from "./UserIndex";
import AppLayout from './AppLayout';
import LoginLayout from './LoginLayout';
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";
import ErrorLayout from "./ErrorLayout";
import NotFoundErrorPage from "./NotFoundErrorPage";

const AuthenticatedApp = () => {
    return (
            <Switch>
                <AppLayout exact path={'/'} component={Home}/>
                {/*<LoginLayout exact path={'/login'} component={Login}/>*/}
                <AppLayout exact path='/assets' component={AssetIndex}/>
                <AppLayout exact path='/requests' component={RequestIndex}/>
                <AppLayout exact path='/bookings' component={BookingsIndex}/>
                <AppLayout exact path='/users' component={UserIndex}/>
                <AppLayout exact path='/users/create' component={CreateUserForm}/>
                <AppLayout exact path='/users/:userId?/edit' component={EditUserForm} />
                <ErrorLayout component={NotFoundErrorPage}/>
            </Switch>
    );
};

export default AuthenticatedApp;


