import React, { Component } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";

const loginModalStyle = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const TabContainer = function(props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class HeaderLoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      loginModalIsOpen: false,
      tabValue: 0,
      loginContactnoRequired: "dispNone",
      loginContactno: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastname: "",
      emailRequired: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      registerPassword: "",
      contactRequired: "dispNone",
      contact: "",
    };
  }

  closeLoginModalHandler = () => {
    this.setState({ loginModalIsOpen: false });
  };

  openLoginModal = () => {
    this.setState({ loginModalIsOpen: true });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ tabValue: value });
  };

  inputContactnoChangeHandler = (e) => {
    this.setState({ loginContactno: e.target.value });
  };

  inputPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          className="loginBtn"
          startIcon={<AccountCircleIcon className="accountIcon" />}
          onClick={this.openLoginModal}
        >
          Login
        </Button>

        <Modal
          ariaHideApp={false}
          isOpen={this.state.loginModalIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeLoginModalHandler}
          style={loginModalStyle}
        >
          <Tabs
            className="tabs"
            value={this.state.tabValue}
            onChange={this.tabChangeHandler}
          >
            <Tab label="login" />
            <Tab label="Signup" />
          </Tabs>
          {this.state.tabValue === 0 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="contactno">Contact No.</InputLabel>
                <Input
                  id="contactno"
                  type="text"
                  className="modal-l-input"
                  onChange={this.inputContactnoChangeHandler}
                />
                <FormHelperText className={this.state.loginContactnoRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="text"
                  className="modal-l-input"
                  onChange={this.inputPasswordChangeHandler}
                />
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </TabContainer>
          )}

          {this.state.tabValue === 1 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  id="firstname"
                  type="text"
                  className="modal-l-input"
                  firstname={this.state.firstname}
                  onChange={this.inputFirstNameChangeHandler}
                />
                <FormHelperText className={this.state.firstnameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  id="lastname"
                  type="text"
                  className="modal-l-input"
                  lastname={this.state.lastname}
                  onChange={this.inputLastNameChangeHandler}
                />
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  type="text"
                  className="modal-l-input"
                  email={this.state.email}
                  onChange={this.inputEmailChangeHandler}
                />
                <FormHelperText className={this.state.emailRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                <Input
                  id="registerPassword"
                  type="password"
                  className="modal-l-input"
                  registerpassword={this.state.registerPassword}
                  onChange={this.inputRegisterPasswordChangeHandler}
                />
                <FormHelperText className={this.state.registerPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                <Input
                  id="contact"
                  type="text"
                  className="modal-l-input"
                  contact={this.state.contact}
                  onChange={this.inputContactChangeHandler}
                />
                <FormHelperText className={this.state.contactRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.registerClickHandler}
              >
                SIGNUP
              </Button>
            </TabContainer>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

export default HeaderLoginComponent;
