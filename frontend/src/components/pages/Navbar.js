import * as React from "react";
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from "@mui/material";

const pages = {
  buy: "Buy a Bike",
  sellbike: "Sell your Bike",
  guide: "Guide",
  contact: "Contact Us",
};

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#000',
//       darker: '#053e85',
//     },
//     secondary: {
//       main
//     }
//   }
// });

const Navbar = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

          <>
            {/* 
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.entries(pages)
            .map(([page,value]) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}
          </>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Object.entries(pages).map(([link, label]) => (
              <Link to={"/" + link} style={{ textDecoration: "none" }}>
                {" "}
                <Button
                  className="navbarButtons"
                  key={label}
                  sx={{
                    my: 2,
                    mx: 5,
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
            variant='outlined'
            href='/cart'
            sx={{ my: 2, mx:1,  color: 'white', display: 'block', fontSize: 'medium', ':hover': {color: 'gold'}  }}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ShoppingCartIcon sx={{ my: 2, mx:1,  color: 'white', display: 'block', fontSize: 'medium', ':hover': {color: 'gold'}  }}/>
              </IconButton>
          </Button>
          </Link>
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
