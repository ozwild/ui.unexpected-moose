import React from 'react';
import {Route} from 'react-router-dom';

const LayoutRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <>
                <main className={"login-layout"}>
                    <Component {...matchProps} />
                </main>
            </>
        )}/>
    );
};

export default LayoutRoute;
