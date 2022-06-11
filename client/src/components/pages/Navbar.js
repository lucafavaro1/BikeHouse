import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <a href="/">Home</a> {/*here change # to the link */}
        <a href="#">About</a>
        <a href="#">Shop</a>
        <a href="#">Guide</a>
        <a href="#">Contact us</a>
      </div>
    );
  }
}

export default Navbar;
