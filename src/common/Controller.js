import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../screens/home/Home";

class Controller extends Component {
  /**
   * All Server Url used in this application is added in a single file
   * available in /common/config/serverurl.js.
   *
   */

  render() {
    return (
      <Router>
        <Route exact path="/" render={(props) => <Home {...props} />} />
      </Router>
    );
  }
}

export default Controller;
