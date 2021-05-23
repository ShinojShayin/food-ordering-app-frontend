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
  Snackbar,
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

  removeItemFromCartHandler = (cartItemId, price) => {
    let cartlist = this.state.cartItemlist;
    let cartItem = null;
    let itemIndex = null;
    for (let i = 0, size = cartlist.length; i <= size - 1; i++) {
      if (cartlist[i].itemid === cartItemId) {
        cartItem = cartlist[i];
        itemIndex = i;
        break;
      }
    }

    cartItem.quantity -= 1;

    if (cartItem.quantity === 0) {
      cartlist.splice(itemIndex, 1);
      this.showMessage("Item removed from cart!");
    } else {
      this.showMessage("Item quantity decreased by 1!");
    }

    let totalItems = this.state.totalCartItems - 1;
    let totalPrice = this.state.totalBillPrice - price;

    this.setState({
      cartItemlist: cartlist,
      totalCartItems: totalItems,
      totalBillPrice: totalPrice,
    });
  };

  addItemToCartHandler = (itemid, name, type, price, isCart) => {
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

    this.setState({
      messageBox: false,
    });

    if (isCart) {
      this.showMessage("Item quantity increased by 1!");
    } else {
      this.showMessage("Item added to cart!");
    }
  };

  checkOutHandler = () => {
    if (this.state.cartItemlist.length > 0) {
      if (Boolean(this.props.userInfo)) {
        this.props.history.push({
          pathname: "/checkout",
          state: { testvalue: "tesvalhai" },
        });
      } else {
        this.showMessage("Please login first!");
      }
    } else {
      this.showMessage("Please add an item to your cart!");
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

    /**  Object structure inside cartItemlist array 
      *   {
            itemname: "Hakka Noodles",
            itemid: 1,
            price: 204.0,
            itemtype: "VEG",
            quantity: 1,
          }
      */

    this.state = {
      restaurantDetails: {
        categories: "",
        averageprice: 0,
        numratedcustomers: 0,
      },
      categoryRestaurantlist: [],
      totalCartItems: 0,
      totalBillPrice: 0,
      cartItemlist: [],
      messageBox: false,
      messageContent: "",
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

        <div className="rst-head-section">
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
        </div>

        {/**  Restaurant Information Part End Here **/}

        <div className="rst-body-section">
          {/**  Restaurant Menu-items Part Start Here **/}

          <Grid
            item
            style={{ marginTop: "25px" }}
            className="food-menu-container"
          >
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
                          this.addItemToCartHandler(
                            item.id,
                            item.item_name,
                            item.item_type,
                            item.price,
                            false
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

          <Grid item className="cart-container">
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
                            this.removeItemFromCartHandler(
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
                            this.addItemToCartHandler(
                              cartitem.itemid,
                              cartitem.itemname,
                              cartitem.itemtype,
                              cartitem.price,
                              true
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
                  onClick={() => this.checkOutHandler()}
                >
                  CHECKOUT
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/**  Restaurant Food-Cart Part End Here **/}
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

export default withStyles(styles)(Details);
