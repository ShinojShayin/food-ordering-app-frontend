import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

class HeaderLoginComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          className="loginBtn"
          startIcon={<AccountCircleIcon className="accountIcon" />}
        >
          Login
        </Button>
      </React.Fragment>
    );
  }
}

export default HeaderLoginComponent;
