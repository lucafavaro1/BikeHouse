import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_TOKENS, logout, selectUser } from "../../features/userSlice";
import { Button } from "react-bootstrap";
import { NavBtn, NavBtnLink } from "./NavbarElements";
import AxiosJWT from "../utils/AxiosJWT";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = async (e) => {
    e.preventDefault();
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      await dispatch(logout());
      window.location.reload();
      console.log("log out only  done in the client side!");
    }

    try {
      console.log("authTokens is " + authTokens.accessToken);
      const bearerToken = "Bearer " + authTokens.accessToken;
      console.log("bearer token is " + bearerToken);
      const lg = await AxiosJWT.post("/logout/", {
        headers: {
          authorization: bearerToken,
        },
      });
      console.log("lg IS " + lg);
      await dispatch(logout());
      console.log("LOGOUT DONE IN CLIENT AND SERVER SIDE");
    } catch (error) {
      await dispatch(logout());
      window.location.reload();
      console.log("log out only  done in the client side!");
      console.log(error);
    }
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
