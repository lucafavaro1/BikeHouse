//functions to use redux for user

import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_USER_DATA_KEY = "BIKE_HOUSE_USER_DATA";
export const AUTH_TOKENS = "AUTH_TOKENS";

//function to store user into local storage
const getUserStatus = () => {
  const storedData = window.localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
  const user =
    storedData !== null &&
    storedData !== undefined &&
    storedData !== "undefined"
      ? JSON.parse(storedData)
      : undefined;
  return { loggedIn: user !== undefined, user: user };
};

//function to do user operations
export const userSlice = createSlice({
  name: "user",
  initialState: getUserStatus(),
  reducers: {
    //reducer for login
    login: (state, action) => {
      localStorage.setItem(
        LOCAL_STORAGE_USER_DATA_KEY,
        JSON.stringify(action.payload)
      );
      localStorage.setItem(
        AUTH_TOKENS,
        JSON.stringify({
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        })
      );
      state.loggedIn = action.payload !== undefined;
      state.user = action.payload;
    },
    
    //reducer for logout
    logout: (state) => {
      window.localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
      window.localStorage.removeItem(AUTH_TOKENS);
      state.loggedIn = false;
      state.user = undefined;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
