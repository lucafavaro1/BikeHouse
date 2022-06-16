import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_USER_DATA_KEY = "BIKE_HOUSE_USER_DATA";

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

export const userSlice = createSlice({
  name: "user",
  initialState: getUserStatus(),
  reducers: {
    login: (state, action) => {
      window.localStorage.setItem(
        LOCAL_STORAGE_USER_DATA_KEY,
        JSON.stringify(action.payload)
      );
      state.loggedIn = action.payload !== undefined;
      state.user = action.payload;
    },
    logout: (state) => {
      window.localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
      state.loggedIn = false;
      state.user = undefined;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
