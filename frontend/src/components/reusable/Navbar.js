// resuable component function to define and style Navbar with changes on Login 

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCart } from "../../features/cartSlice";
import { selectUser } from "../../features/userSlice";
import Logout from "./Logout";

const pages = {
  buy: "Buy a Bike",
  sellbike: "Sell your Bike",
  guide: "Guide",
  contact: "Contact Us",
};

const Navbar = () => {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  //function to search bikes
  const submitSearch = (e) => {
    e.preventDefault();
    navigate("/buy", { state: { searchString } });
    window.location.reload(false);
  };

  return (
    <AppBar className="appbar" position="sticky" sx={{ bgcolor: "#3d3d3d" }}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              ":hover": { color: "gold", textDecoration: "none" },
            }}
          >
            BIKEHOUSE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Object.entries(pages).map(([link, label]) => (
              <Link to={"/" + link} style={{ textDecoration: "none" }}>
                {" "}
                <Button
                  key={label}
                  sx={{
                    my: 2,
                    mx: 2,
                    color: "white",
                    display: "block",
                    fontSize: "medium",
                    ":hover": { color: "gold" },
                  }}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </Box>

          <div className="navbar">
            <div className="navbar searchBar">
              <form className="form-inline" onSubmit={submitSearch}>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search for a bike"
                  style={{
                    height: 2 + "rem",
                    border: "none",
                    backgroundColor: "#f0f0f0",
                    borderRadius: 6 + "px",
                  }}
                  onChange={(e) => {
                    setSearchString(e.target.value);
                  }}
                />
              </form>
            </div>
          </div>

          {/* <Link to={"/cart"} style={{ textDecoration: "none" }}> */}
          <Button
            variant="outlined"
            href="/cart"
            sx={{
              my: 2,
              mx: 1,
              color: "white",
              display: "block",
              fontSize: "medium",
              borderColor: "#2e6076",
              ":hover": { color: "gold" },
            }}
          >
            <IconButton sx={{ p: 0 }}>
              <span
                style={{
                  color: "black",
                  backgroundColor: "gold",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  padding: "0.3rem",
                  marginRight: "0.2rem",
                  lineHeight: "60%",
                }}
              >
                {cart.length}
              </span>
              <ShoppingCartIcon
                sx={{
                  my: 1,
                  mx: 0.5,
                  color: "white",
                  display: "block",
                  fontSize: "big",
                  ":hover": { color: "gold" },
                }}
              />
            </IconButton>
          </Button>
          {/* </Link> */}

          {user ? (
            <Logout />
          ) : (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Button
                variant="outlined"
                href="/login"
                sx={{
                  my: 2,
                  mx: 1,
                  color: "white",
                  borderColor: "#2e6076",
                  display: "block",
                  fontSize: "medium",
                  ":hover": { color: "gold", borderColor: "gold" },
                }}
              >
                Sign in
              </Button>
              <Button
                variant="outlined"
                href="/register"
                sx={{
                  my: 2,
                  mx: 1,
                  color: "white",
                  borderColor: "#2e6076",
                  display: "block",
                  fontSize: "medium",
                  ":hover": { color: "gold", borderColor: "gold" },
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
