import React from 'react';
import {Switch} from 'react-router-dom';
import Home from "../Home";
import Login from "./Login";
import AssetIndex from "../Resources/Asset/AssetIndex";
import RequestIndex from "../Resources/Request/RequestIndex";
import BookingsIndex from "../Resources/Booking/BookingsIndex";
import UserIndex from "../Resources/User/UserIndex";
import AppLayout from '../Layouts/AppLayout';
import LoginLayout from '../Layouts/LoginLayout';
import CreateUserForm from "../Resources/User/CreateUserForm";
import EditUserForm from "../Resources/User/EditUserForm";
import ErrorLayout from "../Layouts/ErrorLayout";
import NotFoundErrorPage from "../Errors/NotFoundErrorPage";
import CreateAssetForm from "../Resources/Asset/CreateAssetForm";
import EditAssetForm from "../Resources/Asset/EditAssetForm";
import CreateRequestForm from "../Resources/Request/CreateRequestForm";
import EditRequestForm from "../Resources/Request/EditRequestForm";
import CreateBookingForm from "../Resources/Booking/CreateBookingForm";
import EditBookingForm from "../Resources/Booking/EditBookingForm";

const AuthenticatedApp = () => {
    return (
        <Switch>
            <AppLayout exact path={'/'} component={Home}/>
            {/*<LoginLayout exact path={'/login'} component={Login}/>*/}

            /**
            * Asset Routes
            */
            <AppLayout exact path='/assets' component={AssetIndex}/>
            <AppLayout exact path='/assets/create' component={CreateAssetForm}/>
            <AppLayout exact path='/assets/:assetId?/edit' component={EditAssetForm}/>

            /**
            * Booking Routes
            */
            <AppLayout exact path='/bookings' component={BookingsIndex}/>
            <AppLayout exact path='/bookings/create' component={CreateBookingForm}/>
            <AppLayout exact path='/bookings/:bookingId?/edit' component={EditBookingForm}/>

            /**
            * Request Routes
            */
            <AppLayout exact path='/requests' component={RequestIndex}/>
            <AppLayout exact path='/requests/create' component={CreateRequestForm}/>
            <AppLayout exact path='/requests/:requestId?/edit' component={EditRequestForm}/>


            /**
            * User Routes
            */
            <AppLayout exact path='/users' component={UserIndex}/>
            <AppLayout exact path='/users/create' component={CreateUserForm}/>
            <AppLayout exact path='/users/:userId?/edit' component={EditUserForm}/>

            <ErrorLayout component={NotFoundErrorPage}/>
        </Switch>
    );
};

export default AuthenticatedApp;


