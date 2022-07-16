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
      : [];
  return { cart: cart };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: getCartStatus(
    localStorage.getItem(LOCAL_STORAGE_CART_DATA_KEY)
  ),
  reducers: {
    addToCart: (state, action) => {
      const inCart = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_CART_DATA_KEY)
      );
      console.log("incart", inCart);
      console.log("payload", action.payload.listingId);
      let count = 0;
      if (inCart != null) {
        inCart.map((item) => {
          // console.log(item.listingId )
          if (item.listingId === action.payload.listingId) {
            count = count + 1;
            console.log("old");
          }
        });
      }

      if (count === 0) {
        state.cart = [...state.cart, action.payload];
        console.log("after cart state", state.cart);
        localStorage.setItem(
          LOCAL_STORAGE_CART_DATA_KEY,
          JSON.stringify(state.cart)
        );
        // state.cart.map((item, index) => {
        //     console.log(index, item)
        //   });
      }
    },
    removeFromCart: (state, action) => {
      // state.loggedIn = false;
      console.log("id in slice", action.payload);
      state.cart = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_CART_DATA_KEY)
      );
      console.log("remove cart print", state.cart);
      state.cart = state.cart.filter(
        (item) => item.listingId !== action.payload
      );
      console.log("filter", state.cart);
      localStorage.setItem(
        LOCAL_STORAGE_CART_DATA_KEY,
        JSON.stringify(state.cart)
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
