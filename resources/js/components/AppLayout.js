import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from "./NavBar";
import Footer from "./Footer";

const LayoutRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <>
                <NavBar/>
                <main>
                    <Component {...matchProps} />
                </main>
                <Footer/>
            </>
        )}/>
    );
};

export default LayoutRoute;
