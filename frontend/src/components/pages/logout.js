import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { Button } from "react-bootstrap";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <>
      <div className="col-auto">
        <span className="m-4 text-light">Hello, {user.name} </span>

        <Button className="" variant="warning" size="sm" onClick={handleLogout}>
          {" "}
          Logout{" "}
        </Button>
      </div>
    </>
  );
};

export default Logout;