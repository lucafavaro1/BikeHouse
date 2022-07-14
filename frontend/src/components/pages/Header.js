import React, { useState } from "react";
import logo from "../pictures/logo.png";
import "../css/Header.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useNavigate, useHistory } from "react-router-dom"

function Header() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  const submitSearch = (e) => {
    e.preventDefault()
    navigate('/buy', { state: { searchString } });
    window.location.reload(false);
  }
  
  return (
    <div className="header">

      <div className="logo">
        <img src={logo} alt="BikeHouse logo" height={100} width={100} onClick={() => navigate("/")} />
      </div>

      <div className="searchBar">
        <form className="form-inline" onSubmit={submitSearch}>
          <input className="form-control"
            type="search"
            placeholder="Search for a bike"
            onChange={(e) => {
              setSearchString(e.target.value);
            }} />
        </form>
      </div>

      <div className="text">
        <h1>BikeHouse</h1>
      </div>

      <div className="onright"></div>
    </div>
  );
}



export default Header;
