let baseurl = "http://localhost:8080/api";
let login_user_url = baseurl + "/customer/login";
let register_user_url = baseurl + "/customer/signup";

let serverurl = {
  login_user: login_user_url,
  register_user: register_user_url,
};

export default serverurl;
