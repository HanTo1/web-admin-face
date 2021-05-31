import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./Common";

// handle the public routes
function PrivateRoute({ component: Component, layout: Layout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
