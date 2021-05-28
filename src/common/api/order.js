import {
    CHECKOUT_SAVE_ORDER_URL
  } from "../config/serverurl";
  import utility from "./utility";
  
   export function saveOrder(
  addressid,
  bill,
  couponId,
  discount,
  cartItems,
  paymentId,
  restaurantId,
    onComplete
  ) {
    let responseCallback = (code, response) => {
      onComplete(code, response);
    };
    let userInfo = utility.getLoggedinUser();
    let header = {
      authorization: "Bearer " + userInfo.access_token,
    };
    let requestData = {
     address_id: addressid,
      bill: bill,
      coupon_id:couponId,
      discount:discount,
      item_quantities: cartItems,
      payment_id:paymentId,
      restaurant_id:restaurantId
    };
  
    utility.postData(
      { url: CHECKOUT_SAVE_ORDER_URL, headers: header },
      requestData,
      responseCallback,
      null
    );
  }
  