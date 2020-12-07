import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";

import Application from "./components/app/Application";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="api">
          <Redirect to="/" />
        </Route>
        <Route exact path="/">
          <Application />
        </Route>
      </Switch>
    </Router>
  );
}
