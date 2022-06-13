import React from "react";
import "../css/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <a href="/">Home</a> {/*here change # to the link */}
      <a href="/">Buy a bike</a>
      <a href="/login">Sell your bike</a>
      {/* <a href="#">About us</a> maybe we can put this section in the homepage*/}
      <a href="/guide">Guide</a>
      <a href="#">Contact</a>
    </div>
  );
}

export default Navbar;
