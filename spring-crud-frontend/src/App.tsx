import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import AccountsTypes from "./pages/AccountsTypes";
import Customers from "./pages/Customers";
import DashBoard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <SignIn />
        </Route>
        <Route path="/dashboard" exact>
          <DashBoard />
        </Route>
        <Route path="/customers" exact>
          <Customers />
        </Route>
        <Route path="/accounts" exact>
          <AccountsTypes />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
