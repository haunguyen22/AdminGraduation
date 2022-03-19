import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch } from 'react-router-dom'
function authRoute(props) {
    return (
        <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/auth/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
}

export default authRoute;