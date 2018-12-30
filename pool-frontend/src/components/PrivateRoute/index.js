import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  token,
  logout,
  toggleOverlay,
  toggleMobileMenu,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        typeof token === "string" ? (
          <Component
            {...props}
            token={token}
            logout={logout}
            toggleOverlay={toggleOverlay}
            toggleMobileMenu={toggleMobileMenu}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
