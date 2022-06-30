import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import '../css/Appbar.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "./logo.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import Logout from "./newLogout";

const pages = {
  buy: 'Buy a Bike',
  sellbike: 'Sell your Bike',
  guide: 'Guide',
  contact: 'Contact Us',
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

const ResponsiveAppBar = () => {

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
    <AppBar className="appbar" position="sticky" sx={{bgcolor : '#2e6076'}} >
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
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              ':hover': {color: 'gold', textDecoration: 'none'} 
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

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.entries(pages)
            .map(([link,label]) => (
              <Button className='navbarButtons'
                key={label}
                href={link}
                sx={{ my: 2, mx: 5, color: 'white', display: 'block', fontSize: 'medium', ':hover': {color: 'gold'} }}
              >
                {label}
              </Button>
            ))}
          </Box>
          
          
          {user ? (
          <Logout />
          ) : (
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                variant='outlined'
                href='/login'
                sx={{ my: 2, mx:1,  color: 'white', display: 'block', fontSize: 'medium', ':hover': {color: 'gold'}  }}
                >
                  Sign in
              </Button>
              <Button
                variant='outlined'
                href='/register'
                sx={{ my: 2, mx:1, color: 'white', display: 'block', fontSize: 'medium', ':hover': {color: 'gold'}  }}
              >
                Sign Up
              </Button>
            </Box>
          )
          }

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;