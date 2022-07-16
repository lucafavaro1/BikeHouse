import React from "react";
import logo from "../pictures/logo.png";
import "../css/Header.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom"

function Header() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  
  return (
    <div className="header">

      <div className="logo">
        <img src={logo} alt="BikeHouse logo" height={100} width={100} onClick={() => navigate("/")} />
      </div>

      <div className="text">
        <h1>BikeHouse</h1>
      </div>

      <div className="onright"></div>
    </div>
  );
}



export default Header;
