import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../screens/home/Home";
import Checkout from "../screens/checkout/Checkout";

class Controller extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" render={(props) => <Checkout {...props} />} />
      </Router>
    );
  }
}

export default Controller;
