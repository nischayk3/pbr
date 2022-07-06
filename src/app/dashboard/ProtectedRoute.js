import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ authorised, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authorised) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: `/dashboard/unauthorised`,
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
