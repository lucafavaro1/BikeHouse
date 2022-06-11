import React from "react";
import "../css/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <a href="/">Home</a> {/*here change # to the link */}
      <a href="#">About</a>
      <a href="#">Shop</a>
      <a href="/guide">Guide</a>
      <a href="#">Contact us</a>
    </div>
  );
}

export default Navbar;
