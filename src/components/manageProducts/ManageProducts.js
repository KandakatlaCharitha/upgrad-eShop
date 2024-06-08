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
  const [modifiedProductCategory, setModifiedProductCategory] = useState("");
  const [modifiedProductManufacturer, setModifiedProductManufacturer] =
    useState("");
  const [modifiedProductDescription, setModifiedProductDescription] =
    useState("");
  const [modifiedProductImageURL, setModifiedProductImageURL] = useState("");
  const [modifiedProductAvailableItems, setModifiedProductAvailableItems] =
    useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
        const deletedProduct = products.find(
          (product) => product._id === selectedProductId
        );
        setSuccessMessage(
          `Product with ID ${selectedProductId} deleted successfully`
        );
        setSnackbarMessage(
          `Product  ${deletedProduct.name} deleted successfully`
        );
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
            category: modifiedProductCategory,
            manufacturer: modifiedProductManufacturer,
            description: modifiedProductDescription,
            imageURL: modifiedProductImageURL,
            availableItems: modifiedProductAvailableItems,
          }),
        }
      );
      if (response.ok) {
        setSuccessMessage(
          `Product with ID ${selectedProductId} modified successfully`
        );
        setSnackbarMessage(
          `Product ${modifiedProductName} modified successfully`
        );
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
                    setModifiedProductCategory(product.category);
                    setModifiedProductManufacturer(product.manufacturer);
                    setModifiedProductDescription(product.description);
                    setModifiedProductImageURL(product.imageURL);
                    setModifiedProductAvailableItems(product.availableItems);
                  }}
                >
                  Modify
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
          <TextField
            label="Category"
            value={modifiedProductCategory}
            onChange={(e) => setModifiedProductCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Manufacturer"
            value={modifiedProductManufacturer}
            onChange={(e) => setModifiedProductManufacturer(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={modifiedProductDescription}
            onChange={(e) => setModifiedProductDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={modifiedProductImageURL}
            onChange={(e) => setModifiedProductImageURL(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Available Items"
            value={modifiedProductAvailableItems}
            onChange={(e) => setModifiedProductAvailableItems(e.target.value)}
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
