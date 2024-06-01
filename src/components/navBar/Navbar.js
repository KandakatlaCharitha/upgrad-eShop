import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../auth/AuthContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  InputBase,
} from "@mui/material";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, logout } = useAuth(); // Use the useAuth hook
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(""); // State to store search input

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value); // Update search input state
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-SHOP
        </Typography>
        <Stack direction="row" spacing={2}>
          {isAuthenticated ? (
            <>
              <InputBase
                placeholder="Search…"
                value={searchInput} // Set input value from state
                onChange={handleSearchInputChange} // Handle input change
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  padding: "0 10px",
                  borderRadius: "5px",
                }}
              />
              <Button color="inherit" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
