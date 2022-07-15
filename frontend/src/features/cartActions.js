import * as actionTypes from "./cartActionTypes";

export const addToCart = (itemData) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      data: itemData,
    },
  };
};

export const removeFromCart = (itemData) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      data: itemData,
    },
  };
};

export const adjustItemQty = (itemData, qty) => {
  return {
    type: actionTypes.ADJUST_ITEM_QTY,
    payload: {
      data: itemData,
      qty,
    },
  };
};