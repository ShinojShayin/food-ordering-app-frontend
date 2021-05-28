import {
  CHECKOUT_CUSTOMER_ADDRESS_URL,
  CHECKOUT_ALL_STATES_URL,
  CHECKOUT_ADD_ADDRESS_URL,
} from "../config/serverurl";
import utility from "./utility";

export function getAllAddresses(onComplete) {
  let userInfo = utility.getLoggedinUser();
  let responseCallback = (code, response) => {
    onComplete(code, response);
  };
  let header = {
    authorization: "Bearer " + userInfo.access_token,
  };
  utility.getData(
    { url: CHECKOUT_CUSTOMER_ADDRESS_URL, headers: header },
    null,
    responseCallback,
    null
  );
}
export function getAllStates(onComplete) {
 // let userInfo = utility.getLoggedinUser();
  let responseCallback = (code, response) => {
    onComplete(code, response);
  };
  // let header = {
  //   authorization: "Bearer " + userInfo.access_token,
  // };
  utility.getData(
    { url: CHECKOUT_ALL_STATES_URL },
    null,
    responseCallback,
    null
  );
}
export function saveAddress(
  city,
  flatno,
  locality,
  pincode,
  statename,
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
    city: city,
    flat_building_name: flatno,
    locality: locality,
    pincode: pincode,
    state_uuid: statename,
  };

  utility.postData(
    { url: CHECKOUT_ADD_ADDRESS_URL, headers: header },
    requestData,
    responseCallback,
    null
  );
}
