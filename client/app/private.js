import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, role, ...rest }) {
    const getData = JSON.parse(localStorage.getItem('myData'));
    console.log(getData);
    return (
        <Route
            {...rest}
            render={props =>
                (getData && getData.data.role) === role ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}
