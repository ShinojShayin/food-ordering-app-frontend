import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import { getAllRestaurant } from "../../common/api/restaurant";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Icon,
} from "@material-ui/core";
import { Star } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faRupeeSign } from "@fortawesome/free-solid-svg-icons";

const styles = (theme) => ({
  girdContainer: {
    width: "85%",
    margin: "auto",
  },
  media: {
    height: 160,
  },
  root: {
    maxWidth: 345,
    minHeight: 300,
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
      this.props.updateRestaurantList(restaurantList);
    } else {
      console.log("response: " + JSON.stringify(response));
    }
  };

  constructor(props) {
    super(props);
    getAllRestaurant(this.onGetAllRestaurantRequestComplete);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header
          userInfo={this.props.userInfo}
          updateUserInfoState={this.props.updateUserInfoState}
          restaurantList={this.props.restaurantList}
          updateRestaurantList={this.props.updateRestaurantList}
        />

        <Grid
          alignContent="center"
          container
          spacing="5"
          justify="flex-start"
          direction="row"
          className={classes.girdContainer}
        >
          {this.props.restaurantList.map(
            (restaurant, index) =>
              restaurant.visible === true && (
                <Grid item md="4" lg="3" sm="5" key={"grid_" + index}>
                  <Card key={"card_" + index} className={classes.root}>
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
                            <FontAwesomeIcon
                              className="starIcon"
                              icon={faStar}
                            />
                            &nbsp; {restaurant.customer_rating} (
                            {restaurant.number_customers_rated})
                          </span>

                          <span className="price-tag">
                            <FontAwesomeIcon
                              className="starIcon"
                              icon={faRupeeSign}
                            />
                            {restaurant.average_price} for two
                          </span>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
