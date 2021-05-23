import React, { Component } from "react";
import "./Profile.css";
import Header from "../../common/header/Header";
import { Typography } from "@material-ui/core";

class Profile extends Component {
  constructor(props) {
    super(props);
    if (!Boolean(this.props.userInfo)) this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <Header
          userInfo={this.props.userInfo}
          updateUserInfoState={this.props.updateUserInfoState}
          screen="profile"
        />
        <div>
          <Typography
            gutterBottom
            variant="body1"
            style={{ marginTop: 20, marginLeft: 60 }}
          >
            Profile Page
          </Typography>
        </div>
      </div>
    );
  }
}

export default Profile;
