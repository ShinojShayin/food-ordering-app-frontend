import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../screens/home/Home";
import utility from "./utility";

class Controller extends Component {
  // All Server Url used in this application is added in a single file. Check /common/config/serverurl.js.

  updateUserInfoState = (userInfo) => {
    this.setState({
      userInfo: userInfo,
    });
  };

  updateRestaurantList = (restaurantList) => {
    this.setState({
      restaurantList: restaurantList,
    });
  };

  constructor(props) {
    super(props);
    let userInfoObj = utility.getLoggedinUser();
    this.state = {
      userInfo: userInfoObj,
      restaurantList: [],
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
              restaurantList={this.state.restaurantList}
              updateRestaurantList={this.updateRestaurantList}
            />
          )}
        />
      </Router>
    );
  }
}

export default Controller;
