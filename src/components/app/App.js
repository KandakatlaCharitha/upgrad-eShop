import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";
import HomePage from "../home/HomePage";
import Login from "../login/Login";
import SignUp from "../signup/Signup";
import Products from "../products/Products";
import Navbar from "../navBar/Navbar";
import ProductDetails from "../productDetails/ProductDetails";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
