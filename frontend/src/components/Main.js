import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Guide from "./pages/Guide";
import Contact from "./pages/Contact";
import Specialist from "./pages/Specialist";
import SellBike from "./pages/SellBike";
import PhotoGuide from "./pages/PhotoGuide";
import Listings from "./pages/Listings";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./../features/userSlice";
import Payment from "./pages/Payment";

function Main() {
  const user = useSelector(selectUser);
  const [loggedIn, SetLoggedIn] = useState(false);

  useEffect(() => {
    if (user == undefined) SetLoggedIn(false);
    else SetLoggedIn(true);
  });

  return (
    <Routes>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/buy" element={<Listings />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/guide" element={<Guide />}></Route>
      <Route exact path="/photo_guide" element={<PhotoGuide />}></Route>
      <Route exact path="/contact" element={<Contact />}></Route>
      <Route
        exact
        path="/specialist"
        element={loggedIn ? <Specialist /> : <Navigate to="/login" />}
      ></Route>
      <Route
        exact
        path="/sellbike"
        element={loggedIn ? <SellBike /> : <Navigate to="/login" />}
      >
        {" "}
      </Route>
      <Route exact path="/checkout" element={<Payment />}></Route>
    </Routes>
  );
}

export default Main;
