import * as actionTypes from "./cartActionTypes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const INITIAL_STATE = {
  product: [],
  cart: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type)
  if(action.payload!==undefined){
    console.log(action.payload.data)
  }
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload.data
      console.log("id", item.id)
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
      console.log("item in reducer", inCart)
      return {
        ...state,
        cart: [...state.cart, { ...item, qty: 1 }]
        // ? state.cart.map((item) =>
        // item.id === action.payload.id
        // ? { ...item, qty: item.qty + 1 }
        // : item
        // )
        // : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
