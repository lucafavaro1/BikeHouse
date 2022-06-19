import React from "react";
import "../css/Navbar.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Navibar() {
  const user = useSelector(selectUser);

  return (
    <Navbar
      id="Navbar"
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      sticky="top"
      className="row col-12"
    >
      <Navbar.Brand className="" href="/">
        BikeHouse
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="col-8 justify-content-start">
          <Nav.Link href="/">Buy a Bike</Nav.Link>
          {user ? (
            <Nav.Link href="/sellbike">Sell Your Bike</Nav.Link>
          ) : (
            <Nav.Link href="/login">Sell Your Bike</Nav.Link>
          )}
          <Nav.Link href="/guide">Guide</Nav.Link>
          <Nav.Link href="/contact">Contact Us</Nav.Link>
        </Nav>
        <Nav className="col-4 justify-content-end">
          <div className="">
            {user ? (
              <Logout />
            ) : (
              <>
                <Nav.Link href="/login">
                  <Button variant="warning" size="sm">
                    {" "}
                    Sign in{" "}
                  </Button>
                </Nav.Link>
                {/* </Link> */}

                <Nav.Link href="/register">
                  <Button variant="warning" size="sm">
                    {" "}
                    Sign up{" "}
                  </Button>
                </Nav.Link>
              </>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <div className="navbar">
    //   <a href="/">Home</a> {/*here change # to the link */}
    //   <a href="/">Buy a bike</a>
    //   <a href="/login">Sell your bike</a>
    //   {/* <a href="#">About us</a> maybe we can put this section in the homepage*/}
    //   <a href="/guide">Guide</a>
    //   <a href="/contact">Contact us</a>
    // </div>
  );
}

export default Navibar;
