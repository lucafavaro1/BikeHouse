import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice"
import cartReducer from "../features/cartSlice"

export default configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer
    }
})