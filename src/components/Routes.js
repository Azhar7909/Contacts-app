import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import Header from "./Header";
import HomePage from "./HomePage";

export default function Routes() {
  return (
    <Router>
        <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/add-contact">
          <AddContact />
        </Route>
        <Route path="/edit-contact/:id">
          <EditContact />
        </Route>
      </Switch>
    </Router>
  );
}
