import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import "./ProductDetails.css"; // Import CSS for styling

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from URL params
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleBuyNow = () => {
    // Redirect to create order page with product details
    navigate(`/create-order/${id}/${quantity}`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="product-details-container">
      <Box className="product-content">
        <Box className="product-img-container">
          <img
            src={product.imageURL}
            alt={product.name}
            className="product-img"
          />
        </Box>
        <Box className="product-info">
          <Typography variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Price: ${product.price}
          </Typography>
          <Typography variant="body1">
            {product.manufacturer} - {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available Quantity: {product.availableItems}
          </Typography>
          <TextField
            type="number"
            label="Quantity"
            variant="outlined"
            InputProps={{ inputProps: { min: 1, max: product.availableItems } }}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="quantity-input"
          />
          <br></br>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBuyNow}
            className="buy-now-button"
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetails;
