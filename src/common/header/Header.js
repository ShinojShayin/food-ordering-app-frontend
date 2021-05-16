import React, { Component } from "react";
import "./Header.css";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fastfood from "@material-ui/icons/Fastfood";
import HeaderSearchComponent from "./HeaderSearchComponent";
import HeaderLoginComponent from "./HeaderLoginComponent";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
});

class Header extends Component {
  render() {
    const { classes } = this.props;

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

          <HeaderLoginComponent />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
