import React from "react";
import { useLogin } from "../login/redux/hooks";
import { Route, Redirect } from "react-router-dom";
import { App } from "../app";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useLogin();
    return (
        <Route
            {...rest}
            render={props => {
                return isAuthenticated ? (
                    <App>
                        <Component {...props} />
                    </App>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                );
            }}
        />
    );
};

export default PrivateRoute;
