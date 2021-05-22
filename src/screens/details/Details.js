import React, { Component } from "react";
import "./Details.css";
import "../../assets/font-awesome-4.7.0/css/font-awesome.min.css";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";
import {
  Divider,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  Badge,
} from "@material-ui/core";
import { getRestaurantById } from "../../common/api/restaurant";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

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
        averageprice: response.average_price,
      };
      this.setState({
        restaurantDetails: restaurantdtls,
        categoryRestaurantlist: response.categories,
      });
    } else {
      console.log("response: " + JSON.stringify(response));
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      restaurantDetails: {},
      categoryRestaurantlist: [],
      totalCartItems: 0,
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

        {/**  Restaurant Information Part Start Here **/}

        <Grid container spacing={2} className="rst-top-section">
          <Grid item xl={3} lg={2} class="rst-image">
            <img
              src={this.state.restaurantDetails.photo}
              id="rst-photo"
              alt={this.state.restaurantDetails.name}
            />
          </Grid>

          <Grid item xl={9} lg={8} className="rst-details-header">
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <div class="rst-details-bottom">
                <div class="rst-rating-content">
                  <div>
                    <i
                      aria-hidden="true"
                      className="fa fa-star star-icon"
                      style={{ marginRight: 3 }}
                    />
                    {this.state.restaurantDetails.rating}
                  </div>
                  <div class="rst-caption grey">
                    Average Rating by <br />
                    <strong>
                      {this.state.restaurantDetails.numratedcustomers + " "}
                    </strong>
                    Customers
                  </div>
                </div>

                <div class="rst-rating-content">
                  <div>
                    <i aria-hidden="true" className="fa fa-inr rupee-icon" />
                    {" " + this.state.restaurantDetails.averageprice}
                  </div>
                  <div className="rst-caption grey">
                    Average cost for
                    <br /> two people
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>

        {/**  Restaurant Information Part End Here **/}

        <Grid container>
          {/**  Restaurant Menu-items Part Start Here **/}

          <Grid item lg={6} xs={12} style={{ marginTop: "25px" }}>
            {this.state.categoryRestaurantlist.map((category, catIndex) => (
              <div className="food-item-container">
                <div className="food-item-category rst-caption">
                  {category.category_name}
                </div>
                <Divider className="item-divide" />
                {category.item_list.map((item, itemIndex) => (
                  <div class="food-item-list">
                    <div className="food-item-name">
                      {item.item_type === "VEG" ? (
                        <i
                          aria-hidden="true"
                          className="fa fa-circle food-type-icon veg"
                        />
                      ) : (
                        <i
                          aria-hidden="true"
                          className="fa fa-circle food-type-icon non-veg"
                        />
                      )}

                      {item.item_name}
                    </div>
                    <div className="food-cost">
                      <i aria-hidden="true" className="fa fa-inr rupee-icon" />
                      {" " + item.price.toFixed(2)}
                    </div>
                    <div className="food-item-action">
                      <IconButton>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </Grid>

          {/**  Restaurant Menu-items Part End Here **/}

          {/**  Restaurant Food-Cart Part Start Here **/}

          <Grid item lg={6} xs={12} className="cart-container">
            <Card className="food-card">
              <CardContent className="food-card-body">
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h6"
                  className={classes.cardTitle}
                >
                  <span className="cart-icon-span">
                    <ShoppingCartIcon />
                    <Badge
                      badgeContent={this.state.totalCartItems}
                      color="primary"
                      className="cart-badge"
                      showZero={true}
                    />
                  </span>

                  <strong> My Cart</strong>
                </Typography>
                <div className="cart-item-container">
                  <div className="food-item-list">
                    <div>
                      <i
                        className="fa fa-stop-circle-o"
                        style={{
                          color: "green",
                          width: "1",
                          height: "1",
                        }}
                        aria-hidden="true"
                      />
                      Hakka Noodles
                    </div>
                    <div> - 1 +</div>
                    <div>204.00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/**  Restaurant Food-Cart Part End Here **/}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Details);
