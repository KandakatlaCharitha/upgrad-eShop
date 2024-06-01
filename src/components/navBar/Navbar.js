import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  InputBase,
} from "@mui/material";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth(); // Use the useAuth hook
  const [searchInput, setSearchInput] = useState(""); // State to store search input

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value); // Update search input state
  };

  const handleSearch = () => {
    // Handle search functionality here
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
        {isAuthenticated && (
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
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button color="inherit" onClick={handleSearch}>
              Search
            </Button>
          </>
        )}
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {isAdmin && (
              <Button color="inherit" component={Link} to="/add-products">
                Add Products
              </Button>
            )}
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
