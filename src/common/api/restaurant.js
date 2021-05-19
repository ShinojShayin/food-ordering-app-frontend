import { GET_ALL_RESTAURANT_URL } from "../config/serverurl";
import utility from "../utility";

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
