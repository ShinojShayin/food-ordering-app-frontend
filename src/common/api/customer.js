import { LOGIN_CUSTOMER_URL, REGISTER_CUSTOMER_URL } from "../config/serverurl";
import utility from "../utility";

/**
 * This function or method is used to signup user.
 * This method interact with server configured
 *  */
export function registerCustomer(
  contactno,
  email,
  firstname,
  lastname,
  password,
  onComplete
) {
  let responseCallback = (code, response) => {
    onComplete(code, response);
  };

  let requestData = {
    contact_number: contactno,
    email_address: email,
    first_name: firstname,
    last_name: lastname,
    password: password,
  };

  utility.postData(
    { url: REGISTER_CUSTOMER_URL },
    requestData,
    responseCallback,
    null
  );
}

/**
 * This function or method is used to signin user
 * This method interact with server configured
 *  */
export function loginCustomer(contactno, password, onComplete) {
  let responseCallback = (code, response, responseHeader) => {
    onComplete(code, response, responseHeader);
  };

  let header = {
    authorization: "Basic " + window.btoa(contactno + ":" + password),
  };

  utility.postData(
    { url: LOGIN_CUSTOMER_URL, headers: header },
    null,
    responseCallback,
    null
  );
}
