import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Logout from "./Logout";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <Nav collapseOnSelect expand="sm" className="sticky-top">
        <Bars />
        <NavMenu collapseOnSelect>
          <NavLink to="/" exact activeStyle>
            BikeHouse
          </NavLink>
          <NavLink to="/buy" exact activeStyle>
            Buy a Bike
          </NavLink>
          <NavLink to="/sellbike" exact activeStyle>
            Sell Your Bike
          </NavLink>
          <NavLink to="/guide" exact activeStyle>
            Guide
          </NavLink>
          <NavLink to="/contact" exact activeStyle>
            Contact Us
          </NavLink>

          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {user ? (
          <Logout />
        ) : (
          <NavBtn>
            <NavBtnLink to="/login">Sign In</NavBtnLink>
            <NavBtnLink to="/register">Sign Up</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
