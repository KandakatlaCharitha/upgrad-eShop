import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";
import HomePage from "../home/HomePage";
import Login from "../login/Login";
import SignUp from "../signup/Signup";
import Products from "../products/Products";
import Navbar from "../navBar/Navbar";
import ProductDetails from "../productDetails/ProductDetails";
import CreateOrder from "../orders/CreateOrder";
import { SearchProvider } from "../context/SearchContext";
import ManageProducts from "../manageProducts/ManageProducts";
function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route
              path="/create-order/:id/:quantity"
              element={<CreateOrder />}
            />
            <Route path="/manage-products" element={<ManageProducts />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
