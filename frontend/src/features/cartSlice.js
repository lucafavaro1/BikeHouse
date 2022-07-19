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
      // if it is a bike avoid duplicates
      // if its an accessory add to quantity. also check if the quantity exceeds 4
      if (action.payload.category === "bike") {
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
          const additionalParamsWithPayload = {
            ...action.payload,
            insurance: 0, // insurance price is defined here
            insuranceName: "No Insurance",
            deliveryType: "Free",
            insuranceKey: 0,
            shipping: 0,
          };
          state.cart = [...state.cart, additionalParamsWithPayload];
          console.log("after cart state", state.cart);
          localStorage.setItem(
            LOCAL_STORAGE_CART_DATA_KEY,
            JSON.stringify(state.cart)
          );
          // state.cart.map((item, index) => {
          //     console.log(index, item)
          //   });
        }
      } else {
        if (state.cart != null) {
          let sameElementFound = false;
          state.cart.forEach((element, index) => {
            if (element.listingId === action.payload.listingId) {
              let sameElement = { ...state.cart[index] };
              console.log("Same element", sameElement);
              if (sameElement.quantity < 4) {
                sameElement.quantity += 1;
                console.log("Quantity added");
              }
              state.cart[index] = sameElement;
              sameElementFound = true;
            }
          });
          if (sameElementFound) {
            console.log("same element found");
            localStorage.setItem(
              LOCAL_STORAGE_CART_DATA_KEY,
              JSON.stringify(state.cart)
            );
          } else {
            console.log("same element not  found");
            const additionalParamsWithPayload = {
              ...action.payload,
              insurance: 0, // insurance price is defined here
              insuranceName: "No Insurance",
              deliveryType: "Free",
              insuranceKey: 0,
              shipping: 0,
            };
            state.cart = [...state.cart, additionalParamsWithPayload];
            console.log("after cart state", state.cart);
            localStorage.setItem(
              LOCAL_STORAGE_CART_DATA_KEY,
              JSON.stringify(state.cart)
            );
          }
        }
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
