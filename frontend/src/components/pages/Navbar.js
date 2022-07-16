import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import "../css/Navbar.css";

const pages = {
  buy: "Buy a Bike",
  sellbike: "Sell your Bike",
  guide: "Guide",
  contact: "Contact Us",
};

const Navbar = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchString, setSearchString] = useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    navigate("/buy", { state: { searchString } });
    window.location.reload(false);
  };

  return (
    <AppBar className="appbar" position="sticky" sx={{ bgcolor: "#3d3d3d" }}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          {/* <img src={logo} alt="BikeHouse logo" height={25} width={25} style={{'padding':'1px'}}/> */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
                  className="navbarButtons"
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

          <Link to={"/cart"} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              href="/cart"
              sx={{
                my: 2,
                mx: 1,
                color: "white",
                display: "block",
                fontSize: "medium",
                ":hover": { color: "gold" },
              }}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ShoppingCartIcon
                  sx={{
                    my: 2,
                    mx: 1,
                    color: "white",
                    display: "block",
                    fontSize: "medium",
                    ":hover": { color: "gold" },
                  }}
                />
              </IconButton>
            </Button>
          </Link>
          <div className="navbar">
            <div className="navbar searchBar">
              <form className="form-inline" onSubmit={submitSearch}>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search for a bike"
                  onChange={(e) => {
                    setSearchString(e.target.value);
                  }}
                />
              </form>
            </div>
          </div>

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
