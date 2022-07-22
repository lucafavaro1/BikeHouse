import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import "../css/Header.css";
import logo from "../pictures/logo.png";

function Header() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo">
        <img
          src={logo}
          alt="BikeHouse logo"
          height={100}
          width={100}
          onClick={() => navigate("/")}
        />
      </div>

      <div className="text">
        <h1>BikeHouse</h1>
      </div>

      <div className="onright"></div>
    </div>
  );
}

export default Header;
