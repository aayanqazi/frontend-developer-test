import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/login';
import Manager from './containers/Manager';
import Biker from './containers/Biker';
import PrivateRoute from './private';

export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/manager" component={Manager} role="manager" />
        <PrivateRoute exact path="/biker" component={Biker} role="biker" />
    </Switch>
);
