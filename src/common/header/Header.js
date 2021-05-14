import React, { Component } from "react";
import "./Header.css";
import { withStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Input from "@material-ui/core/Input";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {},

  inputRoot: {
    color: "inherit",
    "&:after": {
      borderBottom: "2px solid white !important",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    backgroundColor: "white",
    borderColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
        backgroundColor: "white",
        borderColor: "white",
      },
    },
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
          <MenuIcon />

          <div className={classes.grow}>
            <div className="searchContainer">
              <Input
                id="search-item"
                type="text"
                classes={{
                  root: classes.inputRoot,
                }}
                placeholder="Search by Restaurant Name"
                startAdornment={<SearchIcon className="headerSearchIcon" />}
              />
            </div>
          </div>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
