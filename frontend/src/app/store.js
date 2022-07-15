import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import { combineReducers } from "redux";

export default configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer
    }
})

// const rootReducer = combineReducers({
//   user: userReducer,
//   cart: cartReducer
// });

// export default rootReducer;