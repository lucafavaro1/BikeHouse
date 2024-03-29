// resuable component function to define logout process and changes in navbar 

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAllElementsFromTheCart } from "../../features/cartSlice";
import { logout, selectUser } from "../../features/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //open and close menu on clicking user image
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //handle logout duties
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(removeAllElementsFromTheCart());
    navigate("/");
  };

  //navigate to dashboard from menu
  const handleProfile = () => {
    navigate("/dashboard");
  };

  return (
    <Box sx={{ flexGrow: 0, my: 2 }}>
      <Typography
        variant="h6"
        sx={{
          mr: 2,
          my: 2,
          display: { xs: "none", md: "inline" },
          fontSize: "1.1rem",
          verticalAlign: "middle",
          fontWeight: 200,
          color: "inherit",
          textDecoration: "none",
          marginLeft: "0.5rem",
        }}
      >
        Hello, {user.name}!
      </Typography>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleRoundedIcon
            sx={{
              display: { xs: "none", md: "inline" },
              color: "white",
              fontSize: "40px",
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px", pr: "10px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          key="Profile"
          onClick={handleProfile}
          sx={{ mr: "10px", ml: "10px" }}
        >
          <ListItemText>My Dashboard</ListItemText>
        </MenuItem>
        <MenuItem
          key="Sign Out"
          onClick={handleLogout}
          sx={{ mr: "10px", ml: "10px" }}
        >
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Logout;
