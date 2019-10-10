import React from 'react';
import {useAuth} from '../Contexts/AuthContext';
import AuthenticatedApp from './Auth/AuthenticatedApp';
import UnauthenticatedApp from './Errors/UnauthenticatedApp';

const App = () => {
    const {user} = useAuth();
    return user ? <AuthenticatedApp/> : <UnauthenticatedApp/>;
};

export default App;

