import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { DarkModeContext } from "../contexts/theme.context";
import { APIContext } from "../context/api-provider";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Tooltip,
  Button,
  Menu,
  MenuItem,
} from "@mui/material/";
import {
  Brightness4,
  Brightness7,
  AccountCircle,
  Menu as MenuIcon,
} from "@mui/icons-material";

function NavBar() {
  //   const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { isLoggedIn, logout } = useContext(APIContext);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const settings = [{ text: "Logout", action: logout }];
  let pages;
  if (isLoggedIn()) {
    pages = ["Matches", "Profile"];
  } else {
    pages = ["Sign Up", "Login"];
  }

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
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box sx={{ flexGrow: 0 }}>
          {/* <Tooltip title="Toggle Theme">
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip> */}
          {isLoggedIn() && (
            <Tooltip title="User Settings">
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
          )}
          <Menu
            sx={{ mt: "45px" }}
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
            {settings.map((setting) => (
              <MenuItem key={setting.text} onClick={setting.action}>
                <Typography textAlign="center">{setting.text}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <Link to={`/${page}`} className="nav-links">
                {" "}
                {page}{" "}
              </Link>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
