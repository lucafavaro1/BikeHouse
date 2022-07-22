import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./reusable/Login";
import Register from "./pages/Register";
import Guide from "./pages/Guide";
import Contact from "./pages/Contact";
import Specialist from "./pages/Specialist";
import SellBike from "./pages/SellBike";
import PhotoGuide from "./pages/PhotoGuide";
import Listings from "./pages/Listings";
import Dashboard from "./pages/Dashboard";
import ListingPage from "./pages/ListingPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  AUTH_TOKENS,
  LOCAL_STORAGE_USER_DATA_KEY,
  logout,
} from "./../features/userSlice";
import Payment from "./pages/Payment";
import jwtDecode from "jwt-decode";
import Accessories from "./pages/Accessories";
import ShoppingCart from "./pages/Checkout/ShoppingCart";
import { removeAllElementsFromTheCart } from "../features/cartSlice";
import OrderSummary from "./pages/OrderSummary";

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    let currentDate = new Date();
    let authToken = localStorage.getItem(AUTH_TOKENS)
      ? JSON.parse(localStorage.getItem(AUTH_TOKENS))
      : null;
    if (authToken != null) {
      const decodedToken = jwtDecode(authToken.accessToken);
      const decodedTokenRefresh = jwtDecode(authToken.refreshToken);
      if (
        decodedToken.exp * 1000 < currentDate.getTime() &&
        decodedTokenRefresh.exp * 1000 < currentDate.getTime() // access and refresh expired
      ) {
        console.log("REFRESH AND ACCESS EXPIRED");
        localStorage.removeItem(AUTH_TOKENS);
        localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
        dispatch(logout());
        dispatch(removeAllElementsFromTheCart());
        alert("SESSION EXPIRED ! Please login again");
      } else {
        console.log("AUTHTOKENS NOT EXPIRED");
      }

      console.log("Use effect called in Main.js");
    } else {
      dispatch(logout());
      dispatch(removeAllElementsFromTheCart());
    }
  }, []);

  return (
    <Routes>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/buy" element={<Listings />}></Route>
      <Route exact path="/accessory" element={<Accessories />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/guide" element={<Guide />}></Route>
      <Route exact path="/photo_guide" element={<PhotoGuide />}></Route>
      <Route exact path="/contact" element={<Contact />}></Route>
      <Route exact path="/cart" element={<ShoppingCart />}></Route>
      <Route exact path="/dashboard" element={<Dashboard />}></Route>
      <Route
        exact
        path="/listing/:id"
        element={<ListingPage></ListingPage>}
      ></Route>
      <Route exact path="/specialist" element={<Specialist />}></Route>
      <Route exact path="/sellbike" element={<SellBike></SellBike>}>
        {" "}
      </Route>
      <Route exact path="/checkout" element={<Payment />}></Route>
      <Route
        exact
        path="/order/:id"
        element={<OrderSummary></OrderSummary>}
      ></Route>
      <Route
        exact
        path="/orderSuccess/:id"
        element={<OrderSummary showThankYou="true"></OrderSummary>}
      ></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Main;
