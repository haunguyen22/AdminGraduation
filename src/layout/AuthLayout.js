import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

const Login = React.lazy(() => import("../views/pages/login/Login"));
const Register = React.lazy(() => import("../views/pages/register/Register"));
const AuthLayout = (props) => {
  return (
    <Switch>
      <Route
        path="/login"
        name="Login Page"
        render={(props) => <Login {...props} />}
      />
      <Route
        path="/register"
        name="Register Page"
        render={(props) => <Register {...props} />}
      />
      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default AuthLayout;
