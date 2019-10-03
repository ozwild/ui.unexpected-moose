import React, {useState, useEffect, useContext} from 'react';
import AuthService from '../Services/AuthService';

const AuthContext = React.createContext({});

function AuthProvider(props) {

    const previousUser = AuthService.loggedInUser;
    const previousToken = AuthService.token;
    const previousExpiration = AuthService.expiration;
    const [user, setUser] = useState(previousUser);
    const [token, setToken] = useState(previousToken);
    const [expiration, setExpiration] = useState(previousExpiration);

    const login = async (email, password) => {
        const {user, token, expiration} = await AuthService.login(email, password);
        setUser(user);
        setToken(token);
        setExpiration(expiration);
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
        setToken(null);
    };

    const isLoggedIn = () => {
        return !!user;
    };

    /*useEffect(() => {
    }, [user]);*/

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, user, token, expiration}} {...props} />
    );

}

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};
