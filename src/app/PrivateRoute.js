import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProctectedRoute = ({ authorised, component: Component, ...rest }) => {
  console.log(authorised, "auth");
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
                pathname: `/tokenexpired`,
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProctectedRoute;
