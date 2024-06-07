import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (userData) => {
    setIsAuthenticated(true);
    if (userData.isAdmin) setIsAdmin(true);
    localStorage.setItem("token", userData.token); // Store token in localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("isAdmin", userData.isAdmin ? "true" : "false");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("token"); // Remove token from localStorage upon logout
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []); // Check localStorage for token on component mount

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
