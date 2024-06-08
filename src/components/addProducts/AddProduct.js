import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Snackbar,
} from "@mui/material";
import "../../common/Common.css";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductManufacturer, setNewProductManufacturer] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImageURL, setNewProductImageURL] = useState("");
  const [newProductAvailableItems, setNewProductAvailableItems] = useState("");
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    try {
      const newProductData = {
        name: newProductName,
        category: newProductCategory,
        manufacturer: newProductManufacturer,
        description: newProductDescription,
        price: newProductPrice,
        imageURL: newProductImageURL,
        availableItems: newProductAvailableItems,
      };

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(newProductData),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setSuccessMessage(`Product ${addedProduct.name} added successfully`);
        setSuccessMessageOpen(true);
      } else {
        console.error("Error adding product:", response.statusText);
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Unauthorised Access!. Please login as Admin");
    }
  };

  const handleNavigateToManageProducts = () => {
    navigate("/manage-products");
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Add New Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Product Name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Category"
            value={newProductCategory}
            onChange={(e) => setNewProductCategory(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Manufacturer"
            value={newProductManufacturer}
            onChange={(e) => setNewProductManufacturer(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={newProductDescription}
            onChange={(e) => setNewProductDescription(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Price"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Image URL"
            value={newProductImageURL}
            onChange={(e) => setNewProductImageURL(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Available Items"
            value={newProductAvailableItems}
            onChange={(e) => setNewProductAvailableItems(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleAddProduct}
      >
        Add Product
      </Button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessMessageOpen(false)}
        message={successMessage}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={handleNavigateToManageProducts}
          >
            Manage Products
          </Button>
        }
      />
    </Container>
  );
}

export default AddProduct;
