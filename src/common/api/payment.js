import {
  CHECKOUT_PAYMENT_URL
} from "../config/serverurl";
import utility from "./utility";

export function getPaymentMethods(onComplete) {
 
  let responseCallback = (code, response) => {
    onComplete(code, response);
  };
  utility.getData(
    { url: CHECKOUT_PAYMENT_URL },
    null,
    responseCallback,
    null
  );
}