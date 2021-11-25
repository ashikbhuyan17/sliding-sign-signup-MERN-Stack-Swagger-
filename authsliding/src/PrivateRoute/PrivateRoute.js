import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { DataContext, UserContext } from '../../App';



const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;


import React from "react";
import jwt_decode from "jwt-decode";
import { Redirect, Route } from "react-router";


const PrivateRoute = ({ children, ...rest }) => {
 
  return (
    <Route
      {...rest}
      render={({ location }) =>
      localStorage.getItem("userInfo") && jwt_decode(JSON.parse(localStorage.getItem("userInfo")).data.token).scopes==="USER" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;