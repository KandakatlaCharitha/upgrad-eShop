import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreateOrder.css";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useAuth } from "../auth/AuthContext";

function CreateOrder() {
  const { id, quantity } = useParams();
  const [activeStep, setActiveStep] = useState(0); // Stepper active step
  const [address, setAddress] = useState({
    name: "",
    contactNumber: "",
    city: "",
    zipCode: "",
    landmark: "",
    state: "",
    street: "",
  });
  const [errors, setErrors] = useState({}); // State for storing validation errors
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected address
  const navigate = useNavigate(); // Use the useNavigate hook for navigation
  const { isAuthenticated, user } = useAuth(); // Get the authentication state
  const [product, setProduct] = useState(null); // State for storing product details

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

  const handleNext = async (user) => {
    if (activeStep === 0) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login to proceed.");
          return;
        }

        const response = await fetch("http://localhost:3001/api/v1/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ ...address, user: user._id }),
        });
        // console.log(address);
        // console.log(selectedAddress);
        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          let errorData;
          if (contentType && contentType.includes("application/json")) {
            errorData = await response.json();
          } else {
            const errorText = await response.text();
            throw new Error(errorText);
          }
          alert(errorData.message || "Failed to save address");
          return;
        }

        const data = await response.json();
        console.log("Address saved successfully:", data);
        setErrors({});
        setSelectedAddress(data); // Update selectedAddress state with the newly created address
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error("Error saving address:", error);
        alert(error.message);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleOrderSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to proceed.");
        return;
      }

      const response = await fetch("http://localhost:3001/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product: id,
          quantity: parseInt(quantity),
          address: selectedAddress, // Use the selectedAddress state instead of address.id
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorData;
        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json();
        } else {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        setErrors(errorData.errors || { general: "Failed to place order" });
        return;
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);
      // Display order confirmation message
      alert("Your order is confirmed.");
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error("Error placing order:", error);
      setErrors({ general: "An error occurred while placing the order" });
    }
  };
  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Create Order
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Address Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Order Review</StepLabel>
        </Step>
        <Step>
          <StepLabel>Confirm Order</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && (
        <Box>
          {errors.general && (
            <Typography color="error">{errors.general}</Typography>
          )}
          <TextField
            name="name"
            label="Name"
            value={address.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            name="contactNumber"
            label="Contact Number"
            value={address.contactNumber}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.contactNumber}
            helperText={errors.contactNumber}
          />
          <TextField
            name="city"
            label="City"
            value={address.city}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.city}
            helperText={errors.city}
          />
          <TextField
            name="zipCode"
            label="Zip Code"
            value={address.zipCode}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.zipCode}
            helperText={errors.zipCode}
          />
          <TextField
            name="landmark"
            label="Landmark"
            value={address.landmark}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.landmark}
            helperText={errors.landmark}
          />
          <TextField
            name="state"
            label="State"
            value={address.state}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.state}
            helperText={errors.state}
          />
          <TextField
            name="street"
            label="Street"
            value={address.street}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.street}
            helperText={errors.street}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={handleNext}
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
      {activeStep === 1 && (
        <Box className="confirm">
          <Typography variant="h6" className="confirm-msg">
            Order Review
          </Typography>
          <Typography variant="body1">
            Product: {product ? product.name : "Loading..."}
          </Typography>
          <Typography variant="body1">
            Order Total: $
            {product ? (product.price * quantity).toFixed(2) : "Loading..."}{" "}
          </Typography>
          <Typography variant="body1">Quantity: {quantity}</Typography>
          <Typography variant="body1">
            Shipping Address: {address.street}, {address.city}, {address.state}{" "}
            {address.zipCode}, {address.landmark}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={handleBack}>Back</Button>
            <Button
              onClick={handleOrderSubmit}
              variant="contained"
              color="primary"
            >
              Confirm and Place Order
            </Button>
          </Box>
        </Box>
      )}
      {activeStep === 2 && (
        <Box>
          <Typography variant="h6" className="confirm-msg">
            Your order is confirmed!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              onClick={() => navigate("/products")}
              variant="contained"
              color="primary"
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CreateOrder;
