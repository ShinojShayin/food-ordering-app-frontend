import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../screens/home/Home";

class Controller extends Component {
  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} fetchData={this.fetchData} />}
        />
      </Router>
    );
  }
}

export default Controller;
