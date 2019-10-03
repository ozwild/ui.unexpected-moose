import React from 'react';
import {Route, Link} from 'react-router-dom';

const ErrorLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <>
                <main>
                    <Component {...matchProps} />
                </main>
            </>
        )}/>
    );
};

export default ErrorLayout;
