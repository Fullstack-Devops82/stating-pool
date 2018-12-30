import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PublicOnlyRoute({
  component: Component,
  token,
  logout,
  toggleMobileMenu,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        !token ? (
          <Component
            {...props}
            {...rest}
            token={token}
            logout={logout}
            toggleMobileMenu={toggleMobileMenu}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
