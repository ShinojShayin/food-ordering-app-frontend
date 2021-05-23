import {
  GET_ALL_RESTAURANT_URL,
  RESTAURANT_BY_ID_URL,
} from "../config/serverurl";
import utility from "./utility";

export function getAllRestaurant(onComplete) {
  let responseCallback = (code, response) => {
    onComplete(code, response);
  };

  utility.getData(
    { url: GET_ALL_RESTAURANT_URL },
    null,
    responseCallback,
    null
  );
}

export function getRestaurantById(restaurantId, onComplete) {
  let responseCallback = (code, response) => {
    onComplete(code, response);
  };

  utility.getData(
    { url: RESTAURANT_BY_ID_URL + restaurantId },
    null,
    responseCallback,
    null
  );
}
