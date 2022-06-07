import React from "react";
import {Navigate} from "react-router-dom";
import {useUserAuth} from "../context/UserAuthContext";

interface IProtectedRouteProps {
  children: JSX.Element | JSX.Element[];
}

const ProtectedAuthRoute = ({children}: IProtectedRouteProps) => {
  console.log("hello ada p auth route");
  const {user} = useUserAuth();
  if (user.id) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedAuthRoute;
