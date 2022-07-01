import axios from "axios";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

import {
  AUTH_TOKENS,
  LOCAL_STORAGE_USER_DATA_KEY,
} from "../../features/userSlice";

const baseURL = "http://localhost:3001";

let authToken = localStorage.getItem(AUTH_TOKENS)
  ? JSON.parse(localStorage.getItem(AUTH_TOKENS))
  : null;

const AxiosJWT = axios.create({
  baseURL,
});

const refreshToken = async (refreshToken) => {
  try {
    console.log("REFRESH TOKEN CLALED with token" + refreshToken);
    const response = await axios.post(
      "http://localhost:3001/api/refreshtoken",
      {
        token: refreshToken,
      }
    );
    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
  } catch (error) {
    console.log(error);
  }
  return null;
};

AxiosJWT.interceptors.request.use(async (req) => {
  let currentDate = new Date();

  if (authToken == null) {
    authToken = localStorage.getItem(AUTH_TOKENS)
      ? JSON.parse(localStorage.getItem(AUTH_TOKENS))
      : null;
    if (authToken != null) {
      req.headers.authorization = "Bearer " + authToken.accessToken;
    } else {
      console.log("AUTH TOKENS FROM STORAGE IS NULL");
      return null;
    }
  }
  console.log("auth token is .. " + authToken);
  req.headers["authorization"] = "Bearer " + authToken.accessToken;
  const decodedToken = jwtDecode(authToken.accessToken);
  const decodedTokenRefresh = jwtDecode(authToken.refreshToken);
  if (
    decodedToken.exp * 1000 < currentDate.getTime() &&
    decodedTokenRefresh.exp * 1000 < currentDate.getTime() // access and refresh expired
  ) {
    console.log("REFRESH AND ACCESS EXPIRED");
    localStorage.removeItem(AUTH_TOKENS);
    localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
    alert("please login again");
    return req;
  } else if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("AUTH TOKEN EXPIRED");
    const response = await refreshToken(authToken.refreshToken);
    console.log("RESPONSE FORM REFRESH TOKEN IS " + response);
    if (response != null) {
      req.headers["authorization"] = "Bearer " + response.accessToken;
      localStorage.setItem(AUTH_TOKENS, JSON.stringify(response.data));
    }
  } else {
    console.log("no problem");
    return req;
  }
  return req;
});

export default AxiosJWT;
