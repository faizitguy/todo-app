import React from "react";

import { Route } from "react-router-dom";

import Login from "../components/Login";
import Home from "../components/Home";

const Routes = () => {
  return (
    <>
      <Route path="/" exact render={(props) => <Home {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
    </>
  );
};

export default Routes;
