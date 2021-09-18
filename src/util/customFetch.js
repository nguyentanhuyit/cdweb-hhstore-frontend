const baseURL = "http://localhost:8080";
const origin = "http://localhost:3000";

// const baseURL = "https://plh-bookshop-backend.herokuapp.com";
// const origin = "https://plh-bookshop.herokuapp.com";

export const customFetch = (url, methodType, bodyContent) => {
  const apiURL = baseURL + url;
  let header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Accept", "application/json");
  header.append("Access-Control-Allow-Origin", origin);
  const requestOptions = {
    method: methodType,
    headers: header,
    body: bodyContent,
  };
  return fetch(apiURL, requestOptions);
};

export const customFetchAuth = (url, methodType, bodyContent, authAccount) => {
  const apiURL = baseURL + url;
  const basicAuthHeader =
    "Basic " + btoa(authAccount.username + ":" + authAccount.password);
  //
  let header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Accept", "application/json");
  header.append("Access-Control-Allow-Origin", origin);
  header.append("Authorization", basicAuthHeader);
  //
  const requestOptions = {
    method: methodType,
    headers: header,
    body: bodyContent,
  };
  return fetch(apiURL, requestOptions);
};
