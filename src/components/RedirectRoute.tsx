import * as React from "react";
import {useUserAuth} from "../context/UserAuthContext";
import HomePage from "../pages/HomePage";

type RedirectRouteProps = {
  children: JSX.Element | JSX.Element[];
};

const RedirectRoute = ({children}: RedirectRouteProps) => {
  const {user} = useUserAuth();

  if (!user.id) {
    return <HomePage />;
  } else {
    return <>{children}</>;
  }
};

export default RedirectRoute;
