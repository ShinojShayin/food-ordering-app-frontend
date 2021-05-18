import React, { Component } from "react";
import "./Header.css";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  inputRoot: {
    color: "inherit",
    "&:after": {
      borderBottom: "2px solid white !important",
    },
  },
});

class HeaderSearchComponent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="searchContainer">
        <Input
          id="search-item"
          onChange={(e) => this.props.searchRestaurantByTitle(e.target.value)}
          type="text"
          classes={{
            root: classes.inputRoot,
          }}
          placeholder="Search by Restaurant Name"
          startAdornment={<SearchIcon className="headerSearchIcon" />}
        />
      </div>
    );
  }
}

export default withStyles(styles)(HeaderSearchComponent);
