import React, { Component } from "react";
import "./Header.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fastfood from "@material-ui/icons/Fastfood";
import HeaderSearchComponent from "./HeaderSearchComponent";
import HeaderLoginComponent from "./HeaderLoginComponent";

class Header extends Component {
  render() {
    return (
      <AppBar
        position="static"
        style={{ backgroundColor: "#263238" }}
        className="fbar-header"
      >
        <Toolbar>
          <Fastfood className="logo-icon" />

          <div className="fbar-search-container">
            <HeaderSearchComponent />
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
