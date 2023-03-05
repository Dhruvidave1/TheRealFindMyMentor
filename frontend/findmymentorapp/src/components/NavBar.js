import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/theme.context";
import { APIContext } from "../context/api-provider";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Container,
  Tooltip,
  Button,
  Menu,
  MenuItem,
} from "@mui/material/";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";

function NavBar() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { isLoggedIn } = useContext(APIContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pages = isLoggedIn()
    ? [
        { label: "Matches", link: "/match" },
        { label: "Profile", link: "/viewprofile" },
      ]
    : [];

  const title = "FindMyMentor";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            {title}
          </Typography>

          {isLoggedIn() && (
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
                  <Link
                    key={page.label}
                    to={page.link}
                    onClick={handleCloseNavMenu}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem>
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          )}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page.label}
                to={page.link}
                onClick={handleCloseNavMenu}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
