import React from 'react';
import {useAuth} from '../Contexts/AuthContext';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

const App = () => {
    const {user} = useAuth();
    return user ? <AuthenticatedApp/> : <UnauthenticatedApp/>;
};

export default App;

