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
  Button,
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

  removeItemFromCart = (cartItemId, price) => {
    let cartlist = this.state.cartItemlist;
    let quantity = 1;
    for (let i = 0, size = cartlist.length; i <= size - 1; i++) {
      if (cartlist[i].itemid === cartItemId) {
        quantity = cartlist[i].quantity;
        cartlist.splice(i, 1);
        break;
      }
    }

    let totalItems = this.state.totalCartItems - 1 * quantity;
    let totalPrice = this.state.totalBillPrice - price * quantity;

    this.setState({
      cartItemlist: cartlist,
      totalCartItems: totalItems,
      totalBillPrice: totalPrice,
    });
  };

  addItemToCart = (itemid, name, type, price) => {
    console.log("itemid : " + itemid);
    let cartlist = this.state.cartItemlist;

    let itemPresent = false;
    let itemFound = null;
    if (cartlist.length > 0) {
      for (let i = 0, size = cartlist.length; i < size; i++) {
        console.log(cartlist[i].itemid + " == " + itemid);
        if (cartlist[i].itemid === itemid) {
          itemFound = cartlist[i];
          itemPresent = true;
          break;
        }
      }
    }

    if (itemPresent) {
      itemFound.quantity += 1;
    } else {
      let newItem = {
        itemname: name,
        itemid: itemid,
        price: price,
        itemtype: type,
        quantity: 1,
      };

      cartlist.push(newItem);
    }

    let totalItems = this.state.totalCartItems + 1;
    let totalPrice = this.state.totalBillPrice + price;
    this.setState({
      cartItemlist: cartlist,
      totalCartItems: totalItems,
      totalBillPrice: totalPrice,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      restaurantDetails: {},
      categoryRestaurantlist: [],
      totalCartItems: 0,
      totalBillPrice: 0,
      cartItemlist: [
        // {
        //   itemname: "Hakka Noodles",
        //   itemid: 1,
        //   price: 204.0,
        //   itemtype: "VEG",
        //   quantity: 1,
        // },
      ],
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
          <Grid item xl={3} lg={2} className="rst-image">
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
              <div className="rst-details-bottom">
                <div className="rst-rating-content">
                  <div>
                    <i
                      aria-hidden="true"
                      className="fa fa-star star-icon"
                      style={{ marginRight: 3 }}
                    />
                    {this.state.restaurantDetails.rating}
                  </div>
                  <div className="rst-caption grey">
                    Average Rating by <br />
                    <strong>
                      {this.state.restaurantDetails.numratedcustomers + " "}
                    </strong>
                    Customers
                  </div>
                </div>

                <div className="rst-rating-content">
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
              <div
                key={"categoryitem-" + catIndex}
                className="food-item-container"
              >
                <div className="food-item-category rst-caption">
                  {category.category_name}
                </div>
                <Divider className="item-divide" />
                {category.item_list.map((item, itemIndex) => (
                  <div key={"fooditem-" + itemIndex} className="food-item-list">
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
                      <IconButton
                        onClick={() =>
                          this.addItemToCart(
                            item.id,
                            item.item_name,
                            item.item_type,
                            item.price
                          )
                        }
                      >
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
                  {this.state.cartItemlist.map((cartitem, itemindex) => (
                    <div
                      key={"cartitem-" + itemindex}
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
                      <div className="cart-item-action">
                        <IconButton
                          className="item-ops"
                          onClick={() =>
                            this.removeItemFromCart(
                              cartitem.itemid,
                              cartitem.price
                            )
                          }
                        >
                          <i className="fa fa-minus" aria-hidden="true" />
                        </IconButton>
                        {cartitem.quantity}
                        <IconButton
                          className="item-ops"
                          onClick={() =>
                            this.addItemToCart(
                              cartitem.itemid,
                              cartitem.itemname,
                              cartitem.itemtype,
                              cartitem.price
                            )
                          }
                        >
                          <i className="fa fa-plus" aria-hidden="true" />
                        </IconButton>
                      </div>
                      <div className="cart-item-price grey">
                        <i
                          aria-hidden="true"
                          className="fa fa-inr rupee-icon"
                        />
                        {" " + cartitem.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="total-price-summary">
                  <div className="total-amount-txt">
                    <strong>TOTAL AMOUNT</strong>
                  </div>
                  <div>
                    <i aria-hidden="true" className="fa fa-inr rupee-icon" />
                    <strong>
                      {" " + this.state.totalBillPrice.toFixed(2)}
                    </strong>
                  </div>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  className="checkout-btn"
                >
                  CHECKOUT
                </Button>
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
