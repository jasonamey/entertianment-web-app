import * as React from "react";
import * as ReactDOM from "react-dom";
import {UserAuthContextProvider} from "./context/UserAuthContext";

import App from "./App";

var mountNode = document.getElementById("root");
ReactDOM.render(
  <UserAuthContextProvider>
    <App />
  </UserAuthContextProvider>,
  mountNode
);
