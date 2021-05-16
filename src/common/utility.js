// This is a utility method used for fetching url data and callback method is fired on successful request
let fetchDataMethod = (url, callback, httpmethod, data, extra) => {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      callback(this.status, JSON.parse(this.responseText), extra);
    }
  });
  console.log("url: " + url);
  console.log("httpmethod: " + httpmethod);
  console.log("data: " + JSON.stringify(data));
  xhr.open(httpmethod, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
};

// This method uses above mentioned fetchDataMethod to perform GET Request
let getDataMethod = (url, callback, data, extra) => {
  fetchDataMethod(url, callback, "GET", data, extra);
};

// This method uses above mentioned fetchDataMethod to perform POST Request
let postDataMethod = (url, callback, data, extra) => {
  fetchDataMethod(url, callback, "POST", data, extra);
};

// Utility method to check whether current user is loggedin or not. Return true if loggedin otherwise false
let loginCheckMethod = () => {
  let token = sessionStorage.getItem("access-token");
  return !(token === "" || token == null);
};

let utility = {
  getData: getDataMethod,
  postData: postDataMethod,
  loginCheck: loginCheckMethod,
};

export default utility;
