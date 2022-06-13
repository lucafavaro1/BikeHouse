import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../css/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="BikeHouse logo" height={100} width={100} />
      </div>
      <div className="text">
        <h1>BikeHouse</h1>
        <p>Your verified marketplace for bikes</p>
      </div>
      <div className="buttons">
        <div className="row justify-content-end">
          <div className="col-auto">
            <Link to="/login">
              <Button variant="warning" size="lg">
                {" "}
                Sign in{" "}
              </Button>
            </Link>
          </div>

          <div className="col-auto">
            <Link to="/register">
              <Button variant="warning" size="lg">
                {" "}
                Sign up{" "}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
