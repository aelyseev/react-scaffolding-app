import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Routes from 'constants/routes';
import {DeferredComponent} from 'modules/deferred-component';

import Login from 'pages/login';
import Logout from 'pages/logout';
import Index from 'pages/index';

function nonMatch() {
    return (
        <Redirect to={{pathname: Routes.root}} />
    );
}

export default () => (
    <div>
        <Switch>
            <Route exact path={Routes.root} component={Index} />
            <Route exact path={Routes.login} component={Login} />
            <Route exact path={Routes.logout} component={Logout} />
            <Route
                exact
                path={Routes.samplePlaceholderWithPopup}
                render={() => <DeferredComponent loader={() => import(/* webpackChunkName: 'sample-placeholder-with-popup' */ 'pages/sample-placeholder-with-popup')} />}
            />

            <Route
                exact
                path={Routes.samplePlaceholder}
                render={() => <DeferredComponent loader={() => import(/* webpackChunkName: 'sample-placeholder' */ 'pages/sample-placeholder')} />}
            />

            <Route component={nonMatch} />
        </Switch>
    </div>
);
