import React, { Component } from "react";
import "./Details.css";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import { getRestaurantById } from "../../common/api/restaurant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faRupeeSign } from "@fortawesome/free-solid-svg-icons";

const styles = (theme) => ({});

class Details extends Component {
  onRestaurantByIdRequestComplete = (code, response) => {
    if (code === 200) {
      let categoriesStr = "";
      response.categories.forEach((rstCat) => {
        categoriesStr += rstCat.category_name + ", ";
      });

      categoriesStr = categoriesStr
        .trim()
        .substring(0, categoriesStr.length - 2);

      let restaurantdtls = {
        photo: response.photo_URL,
        name: response.restaurant_name,
        location: response.address.locality,
        categories: categoriesStr,
        rating: response.customer_rating,
        numratedcustomers: response.number_customers_rated,
      };
      this.setState({
        restaurantDetails: restaurantdtls,
      });
    } else {
      console.log("response: " + JSON.stringify(response));
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      restaurantDetails: {},
    };
    getRestaurantById(
      this.props.match.params.restaurantid,
      this.onRestaurantByIdRequestComplete
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          userInfo={this.props.userInfo}
          updateUserInfoState={this.props.updateUserInfoState}
          screen="details"
        />

        <Grid container spacing={2} className="rst-top-section">
          <Grid item xs={3} class="rst-details-left">
            <img
              src={this.state.restaurantDetails.photo}
              id="rst-photo"
              alt={this.state.restaurantDetails.name}
            />
          </Grid>
          <Grid item xs={4} className="rst-details-mid">
            <Typography
              gutterBottom
              variant="h4"
              component="h4"
              className="rst-name"
            >
              {this.state.restaurantDetails.name}
            </Typography>

            <Typography
              gutterBottom
              variant="button"
              component="h5"
              className="rst-location"
            >
              {this.state.restaurantDetails.location}
            </Typography>

            <Typography
              gutterBottom
              variant="caption"
              component="h5"
              className="rst-categories"
            >
              {this.state.restaurantDetails.categories}
            </Typography>

            <div>
              <div>
                <FontAwesomeIcon
                  className="starIcon"
                  icon={faStar}
                  style={{ marginRight: 2 }}
                />
                {this.state.restaurantDetails.rating}
              </div>
              <div class="rst-rating-text">
                Average Rating by <br />
                <strong>
                  {this.state.restaurantDetails.numratedcustomers}
                </strong>
                Customers
              </div>
            </div>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>xs=5</Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Details);
