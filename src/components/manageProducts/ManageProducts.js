import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false);
  const [modifiedProductName, setModifiedProductName] = useState("");
  const [modifiedProductPrice, setModifiedProductPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductManufacturer, setNewProductManufacturer] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImageURL, setNewProductImageURL] = useState("");
  const [newProductAvailableItems, setNewProductAvailableItems] = useState("");

  // Define fetchProducts outside of useEffect
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [successMessage]); // Fetch products whenever successMessage changes

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/products/${selectedProductId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setSuccessMessage(
          `Product with ID ${selectedProductId} deleted successfully`
        );
        setSnackbarMessage(`Product deleted successfully`);
        setSnackbarOpen(true);
      } else {
        setErrorMessage(`Error deleting product with ID ${selectedProductId}`);
      }
    } catch (error) {
      setErrorMessage("Error deleting product:", error);
    } finally {
      setDeleteConfirmationDialogOpen(false);
    }
  };

  const handleModify = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/products/${selectedProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: modifiedProductName,
            price: modifiedProductPrice,
          }),
        }
      );
      if (response.ok) {
        setSuccessMessage(
          `Product with ID ${selectedProductId} modified successfully`
        );
        setSnackbarMessage(`Product modified successfully`);
        setSnackbarOpen(true);
        fetchProducts();
      } else {
        setErrorMessage(`Error modifying product with ID ${selectedProductId}`);
      }
    } catch (error) {
      setErrorMessage("Error modifying product:", error);
    } finally {
      setModifyDialogOpen(false);
    }
  };

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

      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

      const response = await fetch("http://localhost:3001/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token, // Include the token in the headers
        },
        body: JSON.stringify(newProductData),
      });

      if (response.ok) {
        setSuccessMessage("Product added successfully");
        setSnackbarMessage("Product added successfully");
        setSnackbarOpen(true);
        fetchProducts(); // Update the product list
      } else {
        setErrorMessage("Error adding product");
      }
    } catch (error) {
      setErrorMessage("Error adding product:", error);
    } finally {
      setAddProductDialogOpen(false); // Close the dialog
    }
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: "100%" }}>
              <CardContent
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <Typography variant="h5">{product.name}</Typography>
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />
                </div>
                <Typography variant="body2">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2">
                  Manufacturer: {product.manufacturer}
                </Typography>
                <Typography variant="body2">
                  Description: {product.description}
                </Typography>
                <Typography variant="body2">Price: ${product.price}</Typography>
                <Typography variant="body2">
                  Available Items: {product.availableItems}
                </Typography>

                <Button
                  variant="contained"
                  style={{ backgroundColor: "#f0f0f0", color: "blue" }}
                  onClick={() => {
                    setDeleteConfirmationDialogOpen(true);
                    setSelectedProductId(product._id);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#f0f0f0", color: "blue" }}
                  onClick={() => {
                    setModifyDialogOpen(true);
                    setSelectedProductId(product._id);
                    setModifiedProductName(product.name);
                    setModifiedProductPrice(product.price);
                  }}
                >
                  Modify
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#f0f0f0", color: "blue" }}
                  onClick={() => setAddProductDialogOpen(true)}
                >
                  Add Product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationDialogOpen}
        onClose={() => setDeleteConfirmationDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmationDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modify Product Dialog */}
      <Dialog
        open={modifyDialogOpen}
        onClose={() => setModifyDialogOpen(false)}
      >
        <DialogTitle>Modify Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            value={modifiedProductName}
            onChange={(e) => setModifiedProductName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Product Price"
            value={modifiedProductPrice}
            onChange={(e) => setModifiedProductPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModifyDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleModify} color="primary">
            Modify
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog
        open={addProductDialogOpen}
        onClose={() => setAddProductDialogOpen(false)}
      >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={newProductCategory}
            onChange={(e) => setNewProductCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Manufacturer"
            value={newProductManufacturer}
            onChange={(e) => setNewProductManufacturer(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newProductDescription}
            onChange={(e) => setNewProductDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={newProductImageURL}
            onChange={(e) => setNewProductImageURL(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Available Items"
            value={newProductAvailableItems}
            onChange={(e) => setNewProductAvailableItems(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAddProductDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success and Error Messages */}
      {successMessage && (
        <Typography variant="body1" color="success">
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Fragment>
  );
}

export default ManageProducts;
