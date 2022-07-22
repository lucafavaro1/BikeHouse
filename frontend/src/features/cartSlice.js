//functions to use redux for cart

import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_CART_DATA_KEY = "BIKE_HOUSE_CART_DATA";
export const AUTH_TOKENS = "AUTH_TOKENS";

//function to store cart into local storage
const getCartStatus = () => {
  const storedData = window.localStorage.getItem(LOCAL_STORAGE_CART_DATA_KEY);
  const cart =
    storedData !== null &&
    storedData !== undefined &&
    storedData !== "undefined"
      ? JSON.parse(storedData)
      : [];
  return { cart: cart };
};

//function to do cart operations
export const cartSlice = createSlice({
  name: "cart",
  initialState: getCartStatus(
    localStorage.getItem(LOCAL_STORAGE_CART_DATA_KEY)
  ),
  reducers: {

    // add to cart reducer
    addToCart: (state, action) => {
      const inCart = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_CART_DATA_KEY)
      );
      // if it is a bike avoid duplicates
      // if its an accessory add to quantity. also check if the quantity exceeds 4
      if (action.payload.category === "bike") {
        let count = 0;
        if (inCart != null) {
          inCart.map((item) => {
            if (item.listingId === action.payload.listingId) {
              count = count + 1;
            }
          });
        }

        if (count === 0) {
          const additionalParamsWithPayload = {
            ...action.payload,
            insurance: 0, // insurance price is defined here
            insuranceName: "No Insurance",
            deliveryType: "Free",
            insuranceKey: 0,
            shipping: 0,
          };
          state.cart = [...state.cart, additionalParamsWithPayload];
          localStorage.setItem(
            LOCAL_STORAGE_CART_DATA_KEY,
            JSON.stringify(state.cart)
          );
        }
      } else {
        if (state.cart != null) {
          let sameElementFound = false;
          state.cart.forEach((element, index) => {
            if (element.listingId === action.payload.listingId) {
              let sameElement = { ...state.cart[index] };
              if (sameElement.quantity < 4) {
                sameElement.quantity += 1;
              }
              state.cart[index] = sameElement;
              sameElementFound = true;
            }
          });
          if (sameElementFound) {
            localStorage.setItem(
              LOCAL_STORAGE_CART_DATA_KEY,
              JSON.stringify(state.cart)
            );
          } else {
            const additionalParamsWithPayload = {
              ...action.payload,
              insurance: 0, // insurance price is defined here
              insuranceName: "No Insurance",
              deliveryType: "Free",
              insuranceKey: 0,
              shipping: 0,
            };
            state.cart = [...state.cart, additionalParamsWithPayload];
            localStorage.setItem(
              LOCAL_STORAGE_CART_DATA_KEY,
              JSON.stringify(state.cart)
            );
          }
        }
      }
    },

    // reducer to remove from cart
    removeFromCart: (state, action) => {
      state.cart = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_CART_DATA_KEY)
      );
      state.cart = state.cart.filter(
        (item) => item.listingId !== action.payload
      );
      localStorage.setItem(
        LOCAL_STORAGE_CART_DATA_KEY,
        JSON.stringify(state.cart)
      );
    },

    //reducer to update cart
    updateCart: (state, action) => {
      if (state.cart != null) {
        state.cart.forEach((element, index) => {
          if (element.listingId === action.payload.listingId) {
            let sameElement = { ...state.cart[index] };
            sameElement = action.payload;
            state.cart[index] = sameElement;
            localStorage.setItem(
              LOCAL_STORAGE_CART_DATA_KEY,
              JSON.stringify(state.cart)
            );
            return;
          }
        });
      }
    },

    //reducer to remove all items from cart
    removeAllElementsFromTheCart: (state, action) => {
      window.localStorage.removeItem(LOCAL_STORAGE_CART_DATA_KEY);
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCart,
  removeAllElementsFromTheCart,
} = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
