import React, { Component } from "react";
import "./Home.css";
import "../../assets/font-awesome-4.7.0/css/font-awesome.min.css";
import Header from "../../common/header/Header";
import { getAllRestaurant } from "../../common/api/restaurant";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  media: {
    height: 160,
  },

  cardcontent: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    PaddingBotton: 15,
  },
  cardTitle: {
    minHeight: 62,
  },
});

class Home extends Component {
  onGetAllRestaurantRequestComplete = (code, response) => {
    if (code === 200) {
      let restaurantList = response.restaurants;
      restaurantList.forEach(function(obj) {
        obj.visible = true;
        obj.categories = obj.categories.replaceAll(",", ", ");
      });

      if (!restaurantList || restaurantList.length === 0)
        this.setState({ noDataNote: "dispBlock" });

      this.setState({ restaurantList });
    } else {
      this.setState({ noDataNote: "dispBlock" });
      console.log("response: " + JSON.stringify(response));
    }
  };

  searchRestaurantByTitle = (title) => {
    let restaurantList = this.state.restaurantList;
    let hiddenCount = 0;
    if (!title || title === "") {
      restaurantList.forEach((restaurant, index) => {
        restaurant.visible = true;
      });
    } else {
      restaurantList.forEach((restaurant, index) => {
        if (
          restaurant.restaurant_name &&
          restaurant.restaurant_name
            .toUpperCase()
            .indexOf(title.toUpperCase()) > -1
        ) {
          restaurant.visible = true;
        } else {
          restaurant.visible = false;
          hiddenCount++;
        }
      });
    }

    if (hiddenCount === restaurantList.length) {
      this.setState({ noDataNote: "dispBlock" });
    } else {
      this.setState({ noDataNote: "dispNone" });
    }

    this.setState({ restaurantList });
  };

  constructor(props) {
    super(props);
    this.state = {
      restaurantList: [],
      noDataNote: "dispNone",
    };
    getAllRestaurant(this.onGetAllRestaurantRequestComplete);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header
          userInfo={this.props.userInfo}
          updateUserInfoState={this.props.updateUserInfoState}
          searchRestaurantByTitle={this.searchRestaurantByTitle}
          screen="home"
        />

        <Grid container spacing={3} className="card-container">
          {this.state.restaurantList.map(
            (restaurant, index) =>
              restaurant.visible === true && (
                <Grid
                  item
                  md={4}
                  lg={3}
                  sm={5}
                  key={"grid_" + index}
                  className="card-grid-container"
                >
                  <Link to={"/restaurant/" + restaurant.id}>
                    <Card key={"card_" + index} className="main-card">
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={restaurant.photo_URL}
                          title={restaurant.restaurant_name}
                        />
                        <CardContent className={classes.cardcontent}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h5"
                            className={classes.cardTitle}
                          >
                            {restaurant.restaurant_name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                            component="div"
                            className="hashtag-text"
                          >
                            {restaurant.categories}
                          </Typography>

                          <div className="card-bottom">
                            <span className="rating-tag">
                              <i
                                aria-hidden="true"
                                className="fa fa-star starIcon"
                              />
                              &nbsp; {restaurant.customer_rating} (
                              {restaurant.number_customers_rated})
                            </span>

                            <span className="price-tag">
                              <i
                                aria-hidden="true"
                                className="fa fa-inr starIcon"
                              />
                              {restaurant.average_price} for two
                            </span>
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              )
          )}
          <Typography
            gutterBottom
            variant="body1"
            className={this.state.noDataNote}
            style={{ marginTop: 20 }}
          >
            No Restaurant with the given name
          </Typography>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
