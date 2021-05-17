import React, { Component } from "react";
import "./Header.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Modal from "react-modal";
import {
  Button,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Input,
  Typography,
  FormHelperText,
  Snackbar,
  Menu,
  MenuItem,
  Paper,
} from "@material-ui/core";
import PropTypes from "prop-types";
import validator from "validator";
import {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
} from "../api/customer";
import utility from "../utility";

const loginModalStyle = {
  content: {
    top: "50%",
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
      loginContactnoInvalid: "dispNone",
      loginContactno: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      loginServerErrorMsgShow: "dispNone",
      loginServerErrorMsg: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastname: "",
      emailRequired: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      invalidEmailRequired: "dispNone",
      invalidPasswordRequired: "dispNone",
      invalidContactNoRequired: "dispNone",
      registerPassword: "",
      contactRequired: "dispNone",
      contact: "",
      messageBox: false,
      messageContent: "",
      regServerErrorMsgShow: "dispNone",
      regServerErrorMsg: "",
      anchorEl: false,
    };
  }

  /// Field Binding/onOpenHandle/onCloseHandle Code starts here ///

  closeLoginModalHandler = () => {
    this.setState({ loginModalIsOpen: false });
    this.clearLoginForm();
    this.clearRegisterForm();
  };

  openLoginModal = () => {
    this.setState({ loginModalIsOpen: true, tabValue: 0 });
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

  inputFirstNameChangeHandler = (e) => {
    this.setState({ firstname: e.target.value });
  };

  inputLastNameChangeHandler = (e) => {
    this.setState({ lastname: e.target.value });
  };

  inputEmailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  inputRegisterPasswordChangeHandler = (e) => {
    this.setState({ registerPassword: e.target.value });
  };

  inputContactChangeHandler = (e) => {
    this.setState({ contact: e.target.value });
  };

  handleMessageBoxClose = () => {
    this.setState({
      messageContent: "",
      messageBox: false,
    });
  };

  handleProfileMenuClose = (e) => {
    this.setState({ anchorEl: null });
  };

  handleProfileMenuOpen = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  //** Field Binding/onOpenHandle/onCloseHandle Code ends here **//

  /// Utility Method for Validation and etc Start Here ///

  contactnoCheck = () => {
    let contactno = this.state.contact.trim();
    let onlynumberExprs = /^[0-9\b]+$/;
    if (contactno.length > 0) {
      if (!onlynumberExprs.test(contactno) || !(contactno.length === 10)) {
        this.setState({ invalidContactNoRequired: "dispBlock" });
        return false;
      } else {
        this.setState({ invalidContactNoRequired: "dispNone" });
        return true;
      }
    } else {
      this.setState({ invalidContactNoRequired: "dispNone" });
      return true;
    }
  };

  loginContactnoCheck = () => {
    let contactno = this.state.loginContactno.trim();
    let onlynumberExprs = /^[0-9\b]+$/;
    if (contactno.length > 0) {
      if (!onlynumberExprs.test(contactno) || !(contactno.length === 10)) {
        this.setState({ loginContactnoInvalid: "dispBlock" });
        return false;
      } else {
        this.setState({ loginContactnoInvalid: "dispNone" });
        return true;
      }
    } else {
      this.setState({ loginContactnoInvalid: "dispNone" });
      return true;
    }
  };

  passwordCheck = () => {
    let pwd = this.state.registerPassword;

    if (pwd.length > 0) {
      if (!this.validatePassword(pwd)) {
        this.setState({ invalidPasswordRequired: "dispBlock" });
        return false;
      } else {
        this.setState({ invalidPasswordRequired: "dispNone" });
        return true;
      }
    } else {
      this.setState({ invalidPasswordRequired: "dispNone" });
      return true;
    }
  };

  emailCheck = () => {
    let email = this.state.email.trim();
    if (email.length > 0) {
      let isValidEmail = validator.isEmail(email);

      isValidEmail
        ? this.setState({ invalidEmailRequired: "dispNone" })
        : this.setState({ invalidEmailRequired: "dispBlock" });

      return isValidEmail;
    } else {
      this.setState({ invalidEmailRequired: "dispNone" });
      return true;
    }
  };

  validatePassword = (password) => {
    const exprs = {
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /[0-9]/,
      specialChar: /[#@$%&*!^]/,
    };

    return (
      exprs.uppercase.test(password) &&
      exprs.lowercase.test(password) &&
      exprs.number.test(password) &&
      exprs.specialChar.test(password)
    );
  };

  clearRegisterForm = () => {
    this.setState({
      firstnameRequired: "dispNone",
      firstname: "",
      lastname: "",
      emailRequired: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      invalidEmailRequired: "dispNone",
      invalidPasswordRequired: "dispNone",
      invalidContactNoRequired: "dispNone",
      registerPassword: "",
      contactRequired: "dispNone",
      contact: "",
      regServerErrorMsgShow: "dispNone",
      regServerErrorMsg: "",
    });
  };

  clearLoginForm = () => {
    this.setState({
      loginContactnoRequired: "dispNone",
      loginContactnoInvalid: "dispNone",
      loginContactno: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      loginServerErrorMsgShow: "dispNone",
      loginServerErrorMsg: "",
    });
  };

  //** Utility Method for Validation and etc End Here **//

  /// Button onClick Method Start Here ///

  onRegisterRequestComplete = (code, response) => {
    if (code !== 201) {
      this.setState({
        regServerErrorMsgShow: true,
        regServerErrorMsg: response.message,
      });
    } else {
      this.setState({
        messageContent: "Registered successfully! Please login now!",
        messageBox: true,
        tabValue: 0,
      });
      this.clearRegisterForm();
    }
  };

  registerClickHandler = (e) => {
    let valid = true;

    this.setState({
      regServerErrorMsgShow: false,
      regServerErrorMsg: "",
    });

    let firstname = this.state.firstname.trim();
    let lastname = this.state.lastname.trim();
    let email = this.state.email.trim();
    let password = this.state.registerPassword.trim();
    let contactno = this.state.contact.trim();

    firstname === ""
      ? this.setState({ firstnameRequired: "dispBlock" })
      : this.setState({ firstnameRequired: "dispNone" });
    email === ""
      ? this.setState({ emailRequired: "dispBlock" })
      : this.setState({ emailRequired: "dispNone" });
    password === ""
      ? this.setState({ registerPasswordRequired: "dispBlock" })
      : this.setState({ registerPasswordRequired: "dispNone" });
    contactno === ""
      ? this.setState({ contactRequired: "dispBlock" })
      : this.setState({ contactRequired: "dispNone" });

    if (
      firstname === "" ||
      email === "" ||
      contactno === "" ||
      contactno === "" ||
      password === ""
    )
      valid = false;

    valid = this.emailCheck();
    valid = this.passwordCheck();
    valid = this.contactnoCheck();

    if (valid)
      registerCustomer(
        contactno,
        email,
        firstname,
        lastname,
        password,
        this.onRegisterRequestComplete
      );
  };

  onLoginRequestComplete = (code, response, responseHeader) => {
    if (code === 200) {
      let user = utility.setUserSession(
        response,
        responseHeader["access-token"],
        this
      );

      this.props.updateUserInfoState(user);

      this.setState({
        messageContent: "Logged in successfully!",
        messageBox: true,
      });

      this.closeLoginModalHandler();
    } else {
      this.setState({
        loginServerErrorMsgShow: "dispBlock",
        loginServerErrorMsg: response.message,
      });
    }
  };

  loginClickHandler = (e) => {
    let valid = true;
    this.setState({
      loginServerErrorMsgShow: "dispNone",
      loginServerErrorMsg: "",
    });

    let contactno = this.state.loginContactno.trim();
    let password = this.state.loginPassword.trim();

    contactno === ""
      ? this.setState({ loginContactnoRequired: "dispBlock" })
      : this.setState({ loginContactnoRequired: "dispNone" });
    password === ""
      ? this.setState({ loginPasswordRequired: "dispBlock" })
      : this.setState({ loginPasswordRequired: "dispNone" });

    if (contactno === "" || password === "") valid = false;

    valid = this.loginContactnoCheck();

    if (valid) loginCustomer(contactno, password, this.onLoginRequestComplete);
  };

  logoutUser = () => {
    logoutCustomer((code, response) => {
      this.props.updateUserInfoState(null);
    });
  };

  //** Button onClick Method End Here **//

  render() {
    return (
      <React.Fragment>
        {!Boolean(this.props.userInfo) ? (
          <Button
            variant="contained"
            color="default"
            className="loginBtn"
            startIcon={<AccountCircleIcon className="accountIcon" />}
            onClick={this.openLoginModal}
          >
            Login
          </Button>
        ) : (
          <React.Fragment>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              className="login-profile-menu"
              onClick={this.handleProfileMenuOpen}
            >
              <AccountCircleIcon className="profile-icon" />{" "}
              {this.props.userInfo.firstname}
            </Button>
            <Menu
              id="simple-menu"
              elevation={0}
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleProfileMenuClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Paper>
                <MenuItem>My Profile</MenuItem>
                <MenuItem onClick={this.logoutUser}>Logout</MenuItem>
              </Paper>
            </Menu>
          </React.Fragment>
        )}

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

          <div className={this.state.tabValue === 0 ? "dispBlock" : "dispNone"}>
            <TabContainer
              className={this.state.tabValue === 0 ? "dispBlock" : "dispNone"}
            >
              <FormControl required className="login-form-control">
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
                <FormHelperText className={this.state.loginContactnoInvalid}>
                  <span className="red">Invalid Contact</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required className="login-form-control">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  className="modal-l-input"
                  onChange={this.inputPasswordChangeHandler}
                />
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl required className="login-form-control mg-top-10">
                <FormHelperText className={this.state.loginServerErrorMsgShow}>
                  <span className="red">{this.state.loginServerErrorMsg}</span>
                </FormHelperText>
              </FormControl>
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
          </div>

          <div className={this.state.tabValue === 1 ? "dispBlock" : "dispNone"}>
            <TabContainer>
              <FormControl required className="login-form-control">
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  id="firstname"
                  type="text"
                  className="modal-l-input"
                  value={this.state.firstname ? this.state.firstname : ""}
                  onChange={this.inputFirstNameChangeHandler}
                />
                <FormHelperText className={this.state.firstnameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl className="login-form-control">
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  id="lastname"
                  type="text"
                  className="modal-l-input"
                  value={this.state.lastname ? this.state.lastname : ""}
                  onChange={this.inputLastNameChangeHandler}
                />
              </FormControl>
              <br />
              <br />
              <FormControl required className="login-form-control">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  type="text"
                  className="modal-l-input"
                  value={this.state.email ? this.state.email : ""}
                  onChange={this.inputEmailChangeHandler}
                />
                <FormHelperText className={this.state.emailRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.invalidEmailRequired}>
                  <span className="red">Invalid Email</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required className="login-form-control">
                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                <Input
                  id="registerPassword"
                  type="password"
                  className="modal-l-input"
                  value={
                    this.state.registerPassword
                      ? this.state.registerPassword
                      : ""
                  }
                  onChange={this.inputRegisterPasswordChangeHandler}
                />
                <FormHelperText className={this.state.registerPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.invalidPasswordRequired}>
                  <span className="red">
                    Password must contain at least one capital letter, one small
                    letter, one number, and one special character
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required className="login-form-control">
                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                <Input
                  id="contact"
                  type="text"
                  className="modal-l-input"
                  value={this.state.contact ? this.state.contact : ""}
                  onChange={this.inputContactChangeHandler}
                />
                <FormHelperText className={this.state.contactRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.invalidContactNoRequired}>
                  <span className="red">
                    Contact No. must contain only numbers and must be 10 digits
                    long
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl required className="login-form-control mg-top-10">
                <FormHelperText className={this.state.regServerErrorMsgShow}>
                  <span className="red">{this.state.regServerErrorMsg}</span>
                </FormHelperText>
              </FormControl>
              <br />
              <Button
                variant="contained"
                color="primary"
                className="mg-top-10"
                onClick={this.registerClickHandler}
              >
                SIGNUP
              </Button>
            </TabContainer>
          </div>
        </Modal>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.messageBox}
          onClose={this.handleMessageBoxClose}
          autoHideDuration={6000}
          message={this.state.messageContent}
        />
      </React.Fragment>
    );
  }
}

export default HeaderLoginComponent;
