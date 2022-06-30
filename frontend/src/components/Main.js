import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Guide from "./pages/Guide";
import Contact from "./pages/Contact";
import Specialist from "./pages/Specialist";
import SellBike from "./pages/SellBike";
import PhotoGuide from "./pages/PhotoGuide";
import Listings from "./pages/Listings";
import Dashboard from "./pages/Dashboard";

function Main() {
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
      <Route exact path='/specialist' element={<Specialist />}></Route>
      <Route exact path="/sellbike" element={<SellBike />}></Route>
      <Route exact path="/dashboard" element={<Dashboard />}></Route>

    </Routes>
  );
}

export default Main;
