import React, { Component } from "react";
import "./Header.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fastfood from "@material-ui/icons/Fastfood";
import HeaderSearchComponent from "./HeaderSearchComponent";
import HeaderLoginComponent from "./HeaderLoginComponent";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <AppBar
        position="static"
        style={{ backgroundColor: "#263238", boxShadow: "none" }}
        className="fbar-header"
      >
        <Toolbar>
          <Link to="/">
            <Fastfood className="logo-icon" />
          </Link>

          <div className="fbar-search-container">
            {this.props.screen === "home" && (
              <HeaderSearchComponent
                searchRestaurantByTitle={this.props.searchRestaurantByTitle}
              />
            )}
          </div>

          <HeaderLoginComponent
            userInfo={this.props.userInfo}
            updateUserInfoState={this.props.updateUserInfoState}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
