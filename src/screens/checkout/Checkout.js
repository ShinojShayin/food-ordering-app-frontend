import React, { useEffect, Component } from "react";
import "./Checkout.css";
import Details from "../details/Details";
import "../details/Details.css";
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
import CardActions from "@material-ui/core/CardActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {
  getAllAddresses,
  getAllStates,
  saveAddress,
  getPaymentMethods,
} from "../../common/api/address";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  Divider,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  Badge,
  Button,
  Snackbar,
  CardActionArea,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  gridtitleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
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
    width: "100%",
  },
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
                <Tab label="Existing Address" {...testProps(0)} />
                <Tab label="New Address" {...testProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.value} index={0}>
              {this.state.noDataNoteNumeric === 1 && (
                <Typography
                  gutterBottom
                  variant="body1"
                  //className={this.state.noDataNote}
                  style={{ marginTop: 20 }}
                  component={"span"}
                >
                  {" "}
                  There are no saved addresses! You can save an address using
                  the 'New Address' tab or using your ‘Profile’ menu option.
                </Typography>
              )}
              {this.state.noDataNoteNumeric === 0 && (
                <TabPanel value={this.state.value} index={0}>
                  <GridList cols={3} className={classes.gridListUpcomingMovies}>
                    {this.state.addressList.map((address) => (
                      <GridListTile key={address.id}>
                        <CardActionArea>
                          <CardContent className={classes.cardcontent}>
                            <Typography
                              className={classes.title}
                              color="textSecondary"
                            >
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
                          </CardContent>

                          <CheckCircleIcon
                            aria-label={`star`}
                            onClick={this.addressSelectHandler}
                          />
                        </CardActionArea>
                      </GridListTile>
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
              <FormControl>
                <InputLabel htmlFor="age-native-required">State</InputLabel>
                <Select
                  native
                  value={<Input id="age-native-required" />}
                  value={this.state.state_name}
                  onChange={this.inputstateChangeHandler}
                  inputProps={{
                    id: "age-native-required",
                    name: "state",
                  }}
                >
                  <option aria-label="None" />
                  {this.state.stateList.map((name) => (
                    <option id={name.id} value={name.id}>
                      {name.state_name}
                    </option>
                  ))}
                </Select>
                <FormHelperText className={this.state.stateRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
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
              defaultValue={this.state.selectedRadioVal}
              onChange={this.radiohandleChange}
            >
              {this.state.paymentList.map((payment) => (
                <FormControlLabel
                  key={payment.id}
                  value={payment.payment_name}
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
      //  console.log("response: 200 " + JSON.stringify(response));
    } else {
      //    console.log("code:" + code);
      //   console.log("response: else " + JSON.stringify(response));
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
        // console.log(paymentList);
      }
    } else {
      console.log("Payment    " + code);
    }
  };
  onAddAddressRequestComplete = (code, response) => {
    if (code === 201) {
      console.log("Address Added Successfully");
    }
    console.log("Address Update status code" + code);
  };
  placeOrderHandler = () => {
    if (this.state.cartItemlist.length > 0) {
      if (Boolean(this.props.userInfo)) {
        let itemList = [];
        this.state.cartItemlist.forEach(function(object) {
          var itemObj = {
            item_id: object.itemid,
            price: object.price,
            quantity: object.quantity,
            itemtype: object.itemtype,
            itemname: object.itemname,
          };

          itemList.push(itemObj);
        });

        let cartObject = {
          restaurantid: this.props.match.params.restaurantid,
          restaurantname: this.state.restaurantDetails.name,
          bill: this.state.totalBillPrice,
          item_quantities: itemList,
        };
        this.props.history.push({
          pathname: "/checkout",
          state: { cartitems: cartObject },
        });
      } else {
        this.showMessage("Please login first!");
      }
    } else {
      this.showMessage("Please add an item to your cart!");
    }
  };
  constructor(props) {
    super(props);
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
    };
    console.log(this.state.data);
    getAllStates(this.onGetAllStatesComplete);
    getAllAddresses(this.onGetAllCustomerAddressComplete);
    getPaymentMethods(this.onGetAllPaymentMethodComplete);
  }
  handleNext = (event) => {
    if (this.state.value == 0) {
      console.log(this.state.activeStep);
      if (this.state.activeStep === 0) {
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
    console.log(" event.target.value " + event.target.value);
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
            <Stepper activeStep={this.state.activeStep} orientation="vertical">
              {this.state.steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{this.getStepContent(index)}</Typography>
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
                <Typography component={"span"}>
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
                      <span className="cart-item-price grey">
                        <Badge
                          badgeContent={this.state.totalCartItems}
                          color="primary"
                          className="cart-badge"
                          showZero={true}
                        />
                      </span>

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
                              {cartitem.itemname}
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
                          </div>
                        )
                      )}
                    </div>
                  </FormControl>
                  <Divider variant="middle" />
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
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Checkout);
