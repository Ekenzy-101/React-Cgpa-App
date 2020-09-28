import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = ({ component: Component, AppProps, ...rest }) => {
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );

        return Component ? <Component {...props} {...AppProps} /> : null;
      }}
    />
  );
};

export default ProtectedRoute;
