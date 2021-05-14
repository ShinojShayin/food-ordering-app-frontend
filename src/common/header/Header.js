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
        className={classes.grow}
      >
        <Toolbar>
          <Fastfood className="logo-icon" />

          <div className={classes.grow}>
            <HeaderSearchComponent />
          </div>

          <HeaderLoginComponent />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
