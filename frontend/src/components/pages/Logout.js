import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { Button } from "react-bootstrap";
import { NavBtn, NavBtnLink } from "./NavbarElements";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <NavBtn>
      <span className="text-light">Hello, {user.name} !</span>
      <NavBtnLink onClick={handleLogout} to="/login">
        Sign Out
      </NavBtnLink>
      {/* <NavBtnLink to="/register">Sign Up</NavBtnLink> */}
    </NavBtn>
  );
};

export default Logout;
