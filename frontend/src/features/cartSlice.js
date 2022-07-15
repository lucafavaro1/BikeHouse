import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_CART_DATA_KEY = "BIKE_HOUSE_CART_DATA";
export const AUTH_TOKENS = "AUTH_TOKENS";

const getCartStatus = () => {
  const storedData = window.localStorage.getItem(LOCAL_STORAGE_CART_DATA_KEY);
  const cart =
    storedData !== null &&
    storedData !== undefined &&
    storedData !== "undefined"
      ? JSON.parse(storedData)
      : undefined;
  return { cart: cart };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {cart: []},
  reducers: {
    addToCart: (state, action) => {
      localStorage.setItem(
        LOCAL_STORAGE_CART_DATA_KEY,
        JSON.stringify(action.payload)
      );
      console.log("payload", action.payload )
      console.log("cart state", state.cart)
      state.cart= [...state.cart, action.payload]
      console.log("after cart state", state.cart)
    },
    removeFromCart: (state,action) => {
      // state.loggedIn = false;
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
