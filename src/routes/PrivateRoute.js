import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const [user, authorizenet] = useSelector(state => [state.user, state.authorizenet]);

  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          user.authorized ? (
            user.role > 0 ? (
              <Component {...props} />
            ) : (
              !authorizenet.customer_profile_id ? (
                <Redirect to={'/creditcard/save'} />
              ) : (
                !authorizenet.payment_profile_id ? (
                  <Redirect to={'/creditcard/update'} />
                ) : (
                  !authorizenet.subscription_id ? (
                    <Redirect to={'/subscription/create'} />
                  ) : (
                    <Component {...props} />
                  )
                )
              )
            )
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
