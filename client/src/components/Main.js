import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UpdateFirst from "./pages/UpdateFirst";
import UpdateSecond from "./pages/UpdateSecond";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Main() {
  return (
    <Routes>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/update" element={<UpdateFirst />}></Route>
      <Route exact path="/updatesecond" element={<UpdateSecond />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default Main;
