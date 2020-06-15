import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserOverview from "./components/UserOverview";
import User from "./components/UserDetail";
import logo from "./assets/images/logo.svg";

// set up body and routing
export default function App() {
  //@TODO: Add not found page
  //@TODO: Add login to be able to view user email
  return (
    <>
      <Router>
        <header className="">
          <div className="container">
            <Link to="/" className="header-logo">
              <img src={logo} width="60" alt="logo" />
              <span className="logo-title">Kristelvdakker github user search</span>
            </Link>
          </div>
        </header>

        <div className="container">
          <Switch>
            <Route exact path='/' component={UserOverview} />
            <Route exact path='/user/:login' component={User} />
          </Switch>
        </div>
      </Router>
    </>
  );
};
