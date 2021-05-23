import React, { Component } from "react";
import "./Checkout.css";
import PropTypes from 'prop-types';
import Header from "../../common/header/Header";
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from '@material-ui/core/FormHelperText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getAllSavedAddress } from "../../common/api/address";
import { getAllStates } from "../../common/api/address";
import { saveAddress } from "../../common/api/address";


const styles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
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
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }

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
      {value === index && <Box p={3}>{children}</Box>}  
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
class Checkout extends Component {
  
    getSteps = () => {
        return ['Delivery', 'Payment'];
    }
    getStepContent = (step) => {
        switch (step) {
            case 0:
               
                    return (
                        <div>
                          <AppBar position="static">
                            <Tabs value={this.state.value} onChange={this.handleChange}>
                              <Tab label="Existing Address" {...testProps(0)} />
                              <Tab label="New Address" {...testProps(1)} />
                            </Tabs>
                          </AppBar>
                          <TabPanel value={this.state.value} index={0}>
                            {this.state.noDataNoteNumeric === 0 &&
                              <Typography
                                gutterBottom
                                variant="body1"
                                //className={this.state.noDataNote}
                                style={{ marginTop: 20 }}
                                component={'span'} 
                              >  There are no saved addresses! You can save an address using the 'New Address' tab or using your ‘Profile’ menu option.
                            </Typography>
                            }
                            {this.state.noDataNoteNumeric === 1 &&
                              <TabPanel value={this.state.value} index={1}>
                                place a grid
                        </TabPanel>
                            }
                          </TabPanel>
                          <TabPanel value={this.state.value} index={1}>
                          <FormControl >
                              <InputLabel htmlFor="Flat / Building No.">Flat / Building No.</InputLabel>
                              <Input id="username" type="text" flatno={this.state.flatno} onChange={this.inputflatnoChangeHandler} />
                              <FormHelperText className={this.state.flatnoRequired}>
                                <span className="red">required</span>
                              </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl >
                              <InputLabel htmlFor="Locality">Locality</InputLabel>
                              <Input id="username" type="text" locality={this.state.locality} onChange={this.inputlocalityChangeHandler} />
                              <FormHelperText className={this.state.localityRequired}>
                                <span className="red">required</span>
                              </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl >
                              <InputLabel htmlFor="City">City</InputLabel>
                              <Input id="username" type="text" city={this.state.city} onChange={this.inputcityChangeHandler} />
                              <FormHelperText className={this.state.cityRequired}>
                                <span className="red">required</span>
                              </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl >
                            <InputLabel htmlFor="age-native-required">State</InputLabel>
                            <Select
                            native
                            value={<Input id="age-native-required" />}
                           
                            onChange={this.inputstateChangeHandler}
                            // inputProps={{
                            //   id: 'age-native-required',
                            //   name:'state'
                            // }}
                          >
                            <option aria-label="None"  />
                            {this.state.stateList.map((name) =>
                                    <option id={name.id} value={name.id}>
                                    {name.state_name}
                                  </option>)}
                              </Select> 
                               <FormHelperText className={this.state.stateRequired}>
                                <span className="red">required</span>
                              </FormHelperText>
                            </FormControl>
                            <br /><br />
                  
                            <FormControl >
                              <InputLabel htmlFor="pincode">pincode</InputLabel>
                              <Input id="username" type="text" pincode={this.state.pincode} onChange={this.inputpincodeChangeHandler} />
                              <FormHelperText className={this.state.pincodeRequired}>
                                <span className="red">{this.state.pincodeRequiredMessage}</span>
                              </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="secondary" onClick={this.saveAddressHandler}>SAVE ADDRESS</Button>
                  
                          </TabPanel>
                        </div>
                      );  
             
            case 1:
                    return (
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={this.state.selectedRadioVal} onChange={this.handleChange}>
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="other" control={<Radio />} label="Other" />
                          <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                        </RadioGroup>
                      </FormControl>
                    );
                
            default:
                return 'Unknown step';
        }
    
    }
    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
      };
      onGetAllCustomerAddressComplete = (code, response) => {
        if (code === 200) {
          let addressList = response.addressList;
          if (!addressList || addressList.length === 0)
            this.setState({ noDataNoteNumeric: 1 });
          this.setState({ addressList });
         // console.log("response: 200 " + JSON.stringify(response));
        } else {
        //  console.log("code:" + code);
         // console.log("response: else " + JSON.stringify(response));
        }
      };
      onGetAllStatesComplete = (code, response) => {
        if (code === 200) {
          let stateList = response.states;
          if (!stateList || stateList.length === 0)
            this.setState({ noDataNoteNumeric: 1 });
          this.setState({ stateList });
          console.log(stateList);
        } 
      
      };
      onAddAddressRequestComplete = (code, response) => {
        if (code === 201) {
        console.log("Address Added Successfully");
        }
        console.log("Address Update status code"+ code);
      };
    constructor(props) {
        super(props);
        this.state = {
            noDataNote: "dispNone",
            steps: this.getSteps(),
            activeStep: 0,
            selectedRadioVal : "female",
            addressList: {},
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
            regexp: /^[0-9\b]+$/
        };
        getAllStates(this.onGetAllStatesComplete);
    // getAllSavedAddress(this.onGetAllCustomerAddressComplete);
    }
    handleNext = event => {
        console.log(this.state.activeStep);
        if (this.state.activeStep === 0) {
            this.setState({ activeStep: 1 });
        }
        else if (this.state.activeStep === 1) {
            this.setState({ activeStep: 2 });
        }
    };
    handleBack = event => {
        if (this.state.activeStep === 1) {
            this.setState({ activeStep: 0 });
        }
        else if (this.state.activeStep === 2) {
            this.setState({ activeStep: 1 });
        }
    }
    handleReset = event => {
        this.setState({ activeStep: 0 });
    };
      
    handleChange = (event) => {
        this.setState({selectedRadioVal : event.target.value});
           };
           saveAddressHandler = () => {

            this.state.flatno === "" ? this.setState({ flatnoRequired: "dispBlock" }) : this.setState({ flatnoRequired: "dispNone" });
            this.state.locality === "" ? this.setState({ localityRequired: "dispBlock" }) : this.setState({ localityRequired: "dispNone" });
            this.state.statename === "" ? this.setState({ stateRequired: "dispBlock" }) : this.setState({ stateRequired: "dispNone" });
            this.state.city === "" ? this.setState({ cityRequired: "dispBlock" }) : this.setState({ cityRequired: "dispNone" });
            
            if (this.state.pincode !== "" && (this.state.pincode.length !== 6 || !(this.state.regexp.test(this.state.pinCode)))) {
              console.log("pin length" + this.state.pincode.length);
              this.setState({ pincodeRequiredMessage: "Pincode must contain only numbers and must be 6 digits long" });
              this.setState({ pincodeRequired: "dispBlock" });
              } else if( this.state.pincode === "") {
              console.log("pin " + this.state.pincode.length);
              this.setState({ pincodeRequired: "dispBlock" });
              this.setState({ pincodeRequiredMessage: "required" });
           
            }else{
              this.state.pincode === "" ? this.setState({ pincodeRequired: "dispBlock" }) : this.setState({ pincodeRequired: "dispNone" });
         
            }
          //  saveAddress(this.onGetAllStatesComplete);
            saveAddress(
              this.state.city,
              this.state.flatNo,
              this.state.locality,
              this.state.pincode,
              this.state.statename,
              this.onAddAddressRequestComplete
            );
           
          }
        
          inputflatnoChangeHandler = (e) => {
            this.setState({ flatno: e.target.value });
          }
          inputlocalityChangeHandler = (e) => {
            this.setState({ locality: e.target.value });
          }
          inputcityChangeHandler = (e) => {
            this.setState({ city: e.target.value });
          }
          inputstateChangeHandler = (e) => {
            this.setState({ statename: e.target.value });
          }
          inputpincodeChangeHandler = (e) => {
            this.setState({ pincode: e.target.value });
           
          }
    render() {
        const { classes } = this.props;
        return (

            <div >
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
                                                    {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {this.state.activeStep === this.state.steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography component={'span'} >View the summary & place your order now!</Typography>
                                <Button onClick={this.handleReset} className={classes.button}>
                                    CHANGE
                </Button>
                            </Paper>
                        )}</div>
                    <div className="right">

                        <Card>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <Typography component={'span'}  className={classes.title} color="textSecondary">
                                        Summary
                                        </Typography>
                               
                               
                               
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                    <Input id="movieName" />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>

                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>

                                </FormControl>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

}
export default withStyles(styles)(Checkout);