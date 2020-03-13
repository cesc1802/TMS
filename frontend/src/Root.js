/* This is the Root component mainly initializes Redux and React Router. */

import React from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import store from "./common/store";
import history from "./common/history";
import PrivateRoute from "./features/common/PrivateRoute";
import { PageNotFound } from "./features/common";
import { LoginPage } from "./features/login";
import { HomePage } from "./features/home";
import { Security } from "./features/security";

function renderRoutes() {
    return (
        <Switch>
            <Route path="/login" component={LoginPage} exact />
            <PrivateRoute path="/" component={HomePage} exact />
            <PrivateRoute path="/settings" component={Security} exact />
            <PrivateRoute path="*" component={PageNotFound} />
        </Switch>
    );
}

function Root() {
    const children = renderRoutes();
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>{children}</ConnectedRouter>
        </Provider>
    );
}

export default Root;
