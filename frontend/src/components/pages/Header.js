import React from "react";
import logo from "./logo.png";
import "../css/Header.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Header() {
  const user = useSelector(selectUser);

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="BikeHouse logo" height={100} width={100} />
      </div>
      <div className="text">
        <h1>BikeHouse</h1>
      </div>
      <div className="onright"></div>
    </div>
  );
}

export default Header;
