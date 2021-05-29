import React, { Component } from "react";
import "./Checkout.css";
import PropTypes from "prop-types";
import Header from "../../common/header/Header";
import AppBar from "@material-ui/core/AppBar";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {
  getAllAddresses,
  getAllStates,
  saveAddress
} from "../../common/api/address";
import {
  getPaymentMethods
} from "../../common/api/payment";
import { 
  saveOrder
} from "../../common/api/order";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  Divider,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  Button,
  Snackbar,
  // CardActionArea,
} from "@material-ui/core";

// import {green,grey} from "@material-ui/core/colors";
// import shadows from "@material-ui/core/styles/shadows";
import Box from "@material-ui/core/Box";
// import { Autorenew, FormatAlignRightOutlined, ImportantDevices, Translate } from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import { createMuiTheme } from "@material-ui/core/styles";
const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    
    
    backgroundColor: theme.palette.background.paper,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  // gridtitleBar: {
  //   background:
  //     "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  // },
  // button: {
  //   marginTop: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  // },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },

  resetContainer: {
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing.index,
    minWidth: 240,
    maxWidth: 240,
  },

  title: {
    color: theme.palette.primary.light,
  },
  gridListMain: {
    transform: "translateZ(0)",
    cursor: "pointer",
  },
  gridListUpcomingMovies: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    overflow: "Auto",
    width: "100%",
    padding: 0,
    margin: 0,
    shadowColor: "#ff0000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
  selectedButton: {
    // color: theme.palette.success.main
    color: theme.palette.success.dark,
  },

  defaultButton: {
    color: theme.palette.primary,
  },
});

const theme = createMuiTheme({
  overrides: {
 
    MuiMenu: {
      paper: {
        maxHeight: "calc(100% - 450px)",
        transform: "TranslateY(48px) !important",
        minWidth: "200px !important",
      },
    },
  
    MuiListItem: {
      gutters: {
        paddingRight: "0px",
      },
    },
  },
  // MuiGridListTile: {
  //   tile: {
  //     maxHeight: "400px !important",
    
  //   },
  // },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function testProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class Checkout extends Component {
  getSteps = () => {
    return ["Delivery", "Payment"];
  };
  getStepContent = (step) => {
    const { classes } = this.props;

    switch (step) {
      case 0:
        return (
          <div>
            <AppBar position="static">
              <Tabs value={this.state.value} onChange={this.tabhandleChange}>
                <Tab
                  label="Existing Address"
                  {...testProps(0)}
                  onClick={this.tabClickHandler}
                />
                <Tab label="New Address" {...testProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel component="div" value={this.state.value} index={0}>
              {this.state.noDataNoteNumeric === 1 && (
                <Typography
                  component="div"
                  gutterBottom
                  variant="body1"
                  //className={this.state.noDataNote}
                  style={{ marginTop: 20 }}
                >
                  {" "}
                  There are no saved addresses! You can save an address using
                  the 'New Address' tab or using your ‘Profile’ menu option.
                </Typography>
              )}
              {this.state.noDataNoteNumeric === 0 && (
                <TabPanel value={this.state.value} index={0}>
                  <GridList cols={3} className={classes.gridListUpcomingMovies}
                  id="ExistingAddressList">
                    {this.state.addressList.map((address, index) => (
                        // <ThemeProvider theme={mytheme} key={"theme_"+index}>
                     <GridListTile id="AddressGridTile"
                        key={address.id}
                        className={
                          this.state.currentButton === index ? "box two" : "box"
                        }
                      >
                        <Typography color="textSecondary" id={"address_"+index }>
                          {address.flat_building_name}
                          <br />
                          {address.locality}
                          <br />
                          {address.city}
                          <br />
                          {address.state.state_name}
                          <br />
                          {address.pincode}
                          <br />
                        </Typography>
                        <br />

                        <IconButton
                           style={{ padding: 0, float: "right" }}
                          className={
                            this.state.currentButton === index
                              ? classes.selectedButton
                              : classes.defaultButton
                          }
                          onClick={(e) => this.onButtonClicked(index,address.id, e)}
                        >
                          <CheckCircleIcon aria-label={`star`} />
                        </IconButton>
                      </GridListTile>
                        // </ThemeProvider> 

                    ))}
                  </GridList>
                </TabPanel>
              )}
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <FormControl>
                <InputLabel htmlFor="Flat / Building No.">
                  Flat / Building No.
                </InputLabel>
                <Input
                  id="flatno"
                  type="text"
                  flatno={this.state.flatno}
                  onChange={this.inputflatnoChangeHandler}
                />
                <FormHelperText className={this.state.flatnoRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl>
                <InputLabel htmlFor="Locality">Locality</InputLabel>
                <Input
                  id="locality"
                  type="text"
                  locality={this.state.locality}
                  onChange={this.inputlocalityChangeHandler}
                />
                <FormHelperText className={this.state.localityRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl>
                <InputLabel htmlFor="City">City</InputLabel>
                <Input
                  id="city"
                  type="text"
                  city={this.state.city}
                  onChange={this.inputcityChangeHandler}
                />
                <FormHelperText className={this.state.cityRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              {/* <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="age-native-required">State</InputLabel>
                <Select maxMenuHeight={50}
                  native value={<Input />}
                  value={this.state.state_name} 
                  onChange={this.inputstateChangeHandler}
                 
                  inputProps={{
                    id: 'age-native-required',
                    style:{paddingLeft:20},
                   
                  }}
                >
                  <option />
                  {this.state.stateList.map((name,index) => (
                    <option id={name.id} value={name.id} key={index} >
                      {name.state_name}
                    </option>
                  ))}
                </Select>
                <FormHelperText className={this.state.stateRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl> */}
              <ThemeProvider theme={theme}>
                <FormControl
                  id="form-control-select"
                  required
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-required-label">
                    State
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={this.state.statename}
                    onChange={this.inputstateChangeHandler}
                    className={classes.selectEmpty}
                  >
                    {this.state.stateList.map((name, index) => (
                      <MenuItem id={name.id} value={name.id} key={index}>
                        {name.state_name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </ThemeProvider>
              <br />
              <br />

              <FormControl>
                <InputLabel htmlFor="pincode">pincode</InputLabel>
                <Input
                  id="pincode"
                  type="text"
                  pincode={this.state.pincode}
                  onChange={this.inputpincodeChangeHandler}
                />
                <FormHelperText className={this.state.pincodeRequired}>
                  <span className="red">
                    {this.state.pincodeRequiredMessage}
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={this.saveAddressHandler}
              >
                SAVE ADDRESS
              </Button>
            </TabPanel>
          </div>
        );

      case 1:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Mode Of Payment</FormLabel>
            <RadioGroup
              aria-label="payment"
              name="payment"
              onChange={this.radiohandleChange}
            >
              {this.state.paymentList.map((payment) => (
                <FormControlLabel
                  key={payment.id}
                  value={payment.id}
                  control={<Radio />}
                  label={payment.payment_name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      default:
        return "Unknown step";
    }
  };
  tabhandleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  onGetAllCustomerAddressComplete = (code, response) => {
    if (code === 200) {
      let addressList = response.addresses;
      if (!addressList || addressList.length === 0) {
        this.setState({ noDataNoteNumeric: 1 });
      }
      this.setState({ addressList });
        console.log("response: 200 " + JSON.stringify(response));
    } else {
      console.log("response:" + JSON.stringify(response));
     // this.setState({ addressList:null });
    }
  };
  onGetAllStatesComplete = (code, response) => {
    if (code === 200) {
      let stateList = response.states;
      if (!stateList || stateList.length === 0) {
      } else {
        this.setState({ stateList });
      }

      //  console.log(stateList);
    }
  };
  onGetAllPaymentMethodComplete = (code, response) => {
    if (code === 200) {
      let paymentList = response.paymentMethods;
      if (paymentList.length !== 0) {
        this.setState({ paymentList });
       
      }
    } else {
      console.log("Payment    " + code);
    }
  };
  onAddAddressRequestComplete = (code, response) => {
    if (code === 200) {
      console.log("Address Added Successfully");
    }
    console.log("Address Update status code" + code);
  };
  onSaveOrderRequestComplete = (code, response) => {
    if (code === 200) {
      let orderID= response.id;
      console.log("Order Placed sucessfully");
      this.showMessage("Order placed successfully! Your order ID is "+ {orderID});
    }else{ 
      console.log("order Update status code" + code);
      this.showMessage("Unable to place your order! Please try again!");
    }
   
  };
  showMessage = (message) => {
    if (this.state.messageBox) {
      setTimeout(() => {
        this.setState({
          messageContent: message,
          messageBox: true,
        });
      }, 300);
    } else {
      this.setState({
        messageContent: message,
        messageBox: true,
      });
    }
  };

  handleMessageBoxClose = () => {
    this.setState({
      messageContent: "",
      messageBox: false,
    });
  };


  constructor(props) {
    super(props);
    if (!Boolean(this.props.userInfo)) this.props.history.push("/");
    this.state = {
      noDataNote: "dispNone",
      steps: this.getSteps(),
      activeStep: 0,
      selectedRadioVal: "Cash on Delivery",
      paymentList: [],
      addressList: [],
      stateList: [],
      noDataNoteNumeric: 0,
      value: 0,
      modalIsOpen: false,
      flatnoRequired: "dispNone",
      flatno: "",
      locality: "",
      localityRequired: "dispNone",
      city: "",
      cityRequired: "dispNone",
      statename: "",
      stateRequired: "dispNone",
      pincode: "",
      pincodeRequired: "dispNone",
      pincodeRequiredMessage: "required",
      regexp: /^[0-9\b]+$/,
      data: props.location.state,
      currentButton: null,
      tileshadow: "60 px -16px green",
      selectedAddress:"",
      messageBox: false,
      messageContent: "",
    };
    console.log(this.state.data);
    getAllStates(this.onGetAllStatesComplete);
    getAllAddresses(this.onGetAllCustomerAddressComplete);
    getPaymentMethods(this.onGetAllPaymentMethodComplete);
  }

  tabClickHandler = (e) => {
    getAllAddresses(this.onGetAllCustomerAddressComplete);
  };
  onButtonClicked = (index, id, event) => {
    this.setState({
      currentButton: this.state.currentButton === index ? null : index,
    });
    this.setState({selectedAddress: id});

    // console.log(id);
  };
  handleNext = (event) => {
    if (this.state.value === 0) {
      console.log("active step " + this.state.activeStep);
      console.log("this.state.selectedAddress"+ this.state.selectedAddress+ "what?");
      if (this.state.activeStep === 0 && this.state.selectedAddress!=="") {
        this.setState({ activeStep: 1 });
      } else if (this.state.activeStep === 1) {
        this.setState({ activeStep: 2 });
      }
    }
  };
  handleBack = (event) => {
    if (this.state.activeStep === 1) {
      this.setState({ activeStep: 0 });
    } else if (this.state.activeStep === 2) {
      this.setState({ activeStep: 1 });
    }
  };
  handleReset = (event) => {
    this.setState({ activeStep: 0 });
  };

  radiohandleChange = (event) => {
    console.log(" selectedRadioVal " + event.target.value);
    this.setState({ selectedRadioVal: event.target.value });
  };

  saveAddressHandler = () => {
    this.state.flatno === ""
      ? this.setState({ flatnoRequired: "dispBlock" })
      : this.setState({ flatnoRequired: "dispNone" });
    this.state.locality === ""
      ? this.setState({ localityRequired: "dispBlock" })
      : this.setState({ localityRequired: "dispNone" });
    this.state.statename === ""
      ? this.setState({ stateRequired: "dispBlock" })
      : this.setState({ stateRequired: "dispNone" });
    this.state.city === ""
      ? this.setState({ cityRequired: "dispBlock" })
      : this.setState({ cityRequired: "dispNone" });

    if (
      this.state.pincode !== "" &&
      (this.state.pincode.length !== 6 ||
        !this.state.regexp.test(this.state.pincode))
    ) {
      console.log("pin length" + this.state.pincode.length);
      this.setState({
        pincodeRequiredMessage:
          "Pincode must contain only numbers and must be 6 digits long",
      });
      this.setState({ pincodeRequired: "dispBlock" });
    } else if (this.state.pincode === "") {
      console.log("pin " + this.state.pincode.length);
      this.setState({ pincodeRequired: "dispBlock" });
      this.setState({ pincodeRequiredMessage: "required" });
    } else {
      this.state.pincode === ""
        ? this.setState({ pincodeRequired: "dispBlock" })
        : this.setState({ pincodeRequired: "dispNone" });
    }
    console.log(
      this.state.city +
        " " +
        this.state.flatNo +
        " " +
        this.state.locality +
        "  " +
        this.state.pincode +
        " " +
        this.state.statename
    );
    saveAddress(
      this.state.city,
      this.state.flatno,
      this.state.locality,
      this.state.pincode,
      this.state.statename,
      this.onAddAddressRequestComplete
    );
  };
  placeOrderHandler = () => {
    let itemList = [];
    console.log("Cart Items"+ this.state.data.cartitems.item_quantities);
    this.state.data.cartitems.item_quantities.forEach(function(object) {
  
      var itemObj = {
        item_id: object.itemid,
        price: object.price,
        quantity: object.quantity
      };
  
      itemList.push(itemObj);
  
  });
  // let paymentID= (Math.floor(100000 + Math.random() * 900000));
  // console.log(Math.floor(100000 + Math.random() * 900000));
  saveOrder(
    this.state.selectedAddress,
    this.state.data.cartitems.bill,
    null,
    0,
    itemList,
    this.state.selectedRadioVal,
    this.state.data.cartitems.restaurantid,
    this.onSaveOrderRequestComplete)

  };
  inputflatnoChangeHandler = (e) => {
    this.setState({ flatno: e.target.value });
  };
  inputlocalityChangeHandler = (e) => {
    this.setState({ locality: e.target.value });
  };
  inputcityChangeHandler = (e) => {
    this.setState({ city: e.target.value });
  };
  inputstateChangeHandler = (e) => {
    console.log("statename log" + this.state.statename);
    this.setState({ statename: e.target.value });

    console.log("statename log" + this.state.statename);
  };
  inputpincodeChangeHandler = (e) => {
    this.setState({ pincode: e.target.value });
  };
  addressSelectHandler = (e) => {
    e.style.color = "green";
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header
          userInfo={this.props.userInfo}
          updateUserInfoState={this.props.updateUserInfoState}
          screen="checkout"
        />
        <div className="flex-container">
          <div className="left">
            <Stepper activeStep={this.state.activeStep} orientation="vertical"
            style={{padding:'0px !important'}}>
              {this.state.steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography component="div">
                      {this.getStepContent(index)}
                    </Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={this.state.activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {this.state.activeStep === this.state.steps.length - 1
                            ? "Finish"
                            : "Next"}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {this.state.activeStep === this.state.steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography component={"div"}>
                  View the summary & place your order now!
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  CHANGE
                </Button>
              </Paper>
            )}
          </div>
          <div className="right">
            <Grid item>
              <Card className="food-card">
                <CardContent className="food-card-body">
                  <FormControl className={classes.formControl}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h6"
                      className={classes.cardTitle}
                    >
                      <strong>Summary</strong>
                    </Typography>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h6"
                      className={classes.cardTitle}
                    >
                      {this.state.data.cartitems.restaurantname}
                    </Typography>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <div>
                      {this.state.data.cartitems.item_quantities.map(
                        (cartitem) => (
                          <div
                            key={"cartitem-" + cartitem.item_id}
                            className="cart-item-list"
                          >
                            <div className="cart-item-name grey">
                              {cartitem.itemtype === "VEG" ? (
                                <i
                                  className="fa fa-stop-circle-o item-icon veg"
                                  aria-hidden="true"
                                />
                              ) : (
                                <i
                                  className="fa fa-stop-circle-o item-icon non-veg"
                                  aria-hidden="true"
                                />
                              )}
                              <p style={{ textAlign: "left" }}>
                                {cartitem.itemname}
                              </p>
                            </div>
                            {cartitem.quantity}

                            <div className="cart-item-price grey">
                              <i
                                aria-hidden="true"
                                className="fa fa-inr rupee-icon"
                              >
                                {" " + cartitem.price}
                              </i>
                            </div>
                            <br />
                            <b />
                            <br />
                          </div>
                        )
                      )}
                    </div>
                  </FormControl>
                  <br />
                  <br />
                  <Divider variant="fullWidth" />
                  <FormControl className={classes.formControl}>
                    <div className="total-price-summary">
                      <div className="total-amount-txt">
                        <strong>Net Amount </strong>
                      </div>
                      <div>
                        <i
                          aria-hidden="true"
                          className="fa fa-inr rupee-icon"
                        />
                        <strong>{" " + this.state.data.cartitems.bill}</strong>
                      </div>
                    </div>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    className="checkout-btn"
                    onClick={() => this.placeOrderHandler()}
                  >
                    PLACE ORDER
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={this.state.messageBox}
            onClose={this.handleMessageBoxClose}
            autoHideDuration={3000}
            message={this.state.messageContent}
          /> */}
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={this.state.messageBox}
            onClose={this.handleMessageBoxClose}
            autoHideDuration={3000}
            message={this.state.messageContent}
          />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Checkout);
