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
import validator from "validator";
import Snackbar from "@material-ui/core/Snackbar";
import serverurl from "../config/serverurl";
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
      serverErrorMessageShow: "dispNone",
      serverErrorMessage: "",
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

  registerClickHandler = (e) => {
    let valid = true;

    this.setState({
      serverErrorMessageShow: false,
      serverErrorMessage: "",
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
      this.registerUser(contactno, email, firstname, lastname, password);
  };

  registerUser = (contactno, email, firstname, lastname, password) => {
    let responseCallback = (code, response, extra) => {
      if (code !== 201) {
        this.setState({
          serverErrorMessageShow: true,
          serverErrorMessage: response.message,
        });
      } else {
        this.setState({
          messageContent: "Registered successfully! Please login now!",
          messageBox: true,
          tabValue: 0,
        });
      }
    };

    let requestData = {
      contact_number: contactno,
      email_address: email,
      first_name: firstname,
      last_name: lastname,
      password: password,
    };

    utility.postData(
      serverurl.register_user,
      responseCallback,
      requestData,
      null
    );
  };

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

  loginClickHandler = (e) => {
    let valid = true;
    this.state.loginContactno.trim() === ""
      ? this.setState({ loginContactnoRequired: "dispBlock" })
      : this.setState({ loginContactnoRequired: "dispNone" });
    this.state.loginPassword.trim() === ""
      ? this.setState({ loginPasswordRequired: "dispBlock" })
      : this.setState({ loginPasswordRequired: "dispNone" });

    if (
      this.state.loginContactno.trim() === "" ||
      this.state.loginPassword.trim() === ""
    )
      valid = false;

    valid = this.loginContactnoCheck();

    if (valid) {
      this.setState({
        messageContent: "Logged in successfully!",
        messageBox: true,
      });
    }
  };

  handleMessageBoxClose = () => {
    this.setState({
      messageContent: "",
      messageBox: false,
    });

    this.setState({
      serverErrorMessageShow: true,
      serverErrorMessage:
        "This contact number is already registered! Try other contact number.",
    });
  };

  render() {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="default"
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
              <FormControl required className="login-form-control">
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  id="firstname"
                  type="text"
                  className="modal-l-input"
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
                <FormHelperText className={this.state.serverErrorMessageShow}>
                  <span className="red">{this.state.serverErrorMessage}</span>
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
          )}
        </Modal>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.messageBox}
          onClose={this.handleMessageBoxClose}
          autoHideDuration={10000}
          message={this.state.messageContent}
        />
      </React.Fragment>
    );
  }
}

export default HeaderLoginComponent;
