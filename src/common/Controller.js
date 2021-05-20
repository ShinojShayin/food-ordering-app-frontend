import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";
import Details from "../screens/details/Details";
import utility from "./utility";

class Controller extends Component {
  // All Server Url used in this application is added in a single file. Check /common/config/serverurl.js.

  updateUserInfoState = (userInfo) => {
    this.setState({
      userInfo: userInfo,
    });
  };

  constructor(props) {
    super(props);
    let userInfoObj = utility.getLoggedinUser();
    this.state = {
      userInfo: userInfoObj,
    };
  }

  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={(props) => (
            <Home
              {...props}
              userInfo={this.state.userInfo}
              updateUserInfoState={this.updateUserInfoState}
            />
          )}
        />
        <Route
          exact
          path="/profile"
          render={(props) => (
            <Profile
              {...props}
              userInfo={this.state.userInfo}
              updateUserInfoState={this.updateUserInfoState}
            />
          )}
        />
        <Route
          exact
          path="/restaurant/:restaurantid"
          render={(props) => (
            <Details
              {...props}
              userInfo={this.state.userInfo}
              updateUserInfoState={this.updateUserInfoState}
            />
          )}
        />
        <Route
          exact
          path="/checkout"
          render={(props) => (
            <Checkout
              {...props}
              userInfo={this.state.userInfo}
              updateUserInfoState={this.updateUserInfoState}
            />
          )}
        />
      </Router>
    );
  }
}

export default Controller;
