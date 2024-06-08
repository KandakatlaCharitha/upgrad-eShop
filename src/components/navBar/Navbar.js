import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useSearch } from "../context/SearchContext";
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
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { setSearchTerm, setProducts } = useSearch();
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset search input and products when navigating to home page
    if (location.pathname === "/") {
      setSearchInput("");
      setProducts([]);
    }
  }, [location.pathname, setProducts]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // const handleSearch = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/api/v1/products?search=${searchInput}`
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setProducts(data); // Update products in the search context
  //       setSearchTerm(searchInput.trim()); // Update the search term in the context
  //     } else {
  //       console.error("Error searching for products:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error searching for products:", error);
  //   }
  // };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/products?search=${searchInput}`
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data); // Update products in the search context
        setSearchTerm(searchInput.trim()); // Update the search term in the context
        navigate("/products"); // Navigate to the products page
      } else {
        console.error("Error searching for products:", response.statusText);
      }
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          e-Shop
        </Typography>
        {isAuthenticated && (
          <>
            <InputBase
              placeholder="Search…"
              value={searchInput}
              onChange={handleSearchInputChange}
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
            {!isAdmin && (
              <Button color="inherit" onClick={handleSearch}>
                Search
              </Button>
            )}
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
            <Button color="inherit" component={Link} to="/" onClick={logout}>
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
