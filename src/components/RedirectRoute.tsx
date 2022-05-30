import * as React from "react";
import {useUserAuth} from "../context/UserAuthContext";
import {Navigate} from "react-router-dom";

type RedirectRouteProps = {
  children: JSX.Element | JSX.Element[];
};

const RedirectRoute = ({children}: RedirectRouteProps) => {
  const {user} = useUserAuth();
  if (Object.keys(user).length === 0) {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};

export default RedirectRoute;
