import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKENS, logout, selectUser } from "../../features/userSlice";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Button } from "react-bootstrap";
import { NavBtn, NavBtnLink } from "./NavbarElements";
import AxiosJWT from "../utils/AxiosJWT";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
      navigate('/login')
    } catch (error) {
      await dispatch(logout());
      window.location.reload();
      console.log("log out only  done in the client side!");
      console.log(error);
    }
  };

  const handleProfile = () => {
    navigate('/dashboard')

  };

  return (
    <Box sx={{ flexGrow: 0, my: 2}}>
      <Typography
        variant="h6"
        sx={{
          mr: 1,
          my: 2,
          display: { xs: 'none', md: 'inline' },
          fontFamily: 'monospace',
          fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Hello, {user.name}!
      </Typography>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleRoundedIcon sx={{ display: { xs: 'none', md: 'inline' }, color: 'white', fontSize: '40px' }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key='Profile' onClick={handleProfile} >
          <Typography textAlign="center">My Dashboard</Typography>
        </MenuItem>
        <MenuItem key='Sign Out' onClick={handleLogout}>
          <Typography textAlign="center">Sign Out</Typography>
        </MenuItem>

      </Menu>
    </Box>
  );
};

export default Logout;
