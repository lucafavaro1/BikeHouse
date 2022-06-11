import React, { Component } from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1>BikeHouse</h1>
        <div className="App-logo">
          <img src={logo} alt="BikeHouse logo" height={100} width={100} />
        </div>
        <p>Your verified marketplace for bikes</p>

        <div className="row justify-content-end">
          <div className="col-auto">
            <Link to="/login">
              <button type="button" className="btn btn-warning btn-lg">
                {" "}
                Sign in{" "}
              </button>
            </Link>
          </div>

          <div className="col-auto">
            <Link to="/register">
              <button type="button" className="btn btn-warning btn-lg">
                {" "}
                Sign up{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
