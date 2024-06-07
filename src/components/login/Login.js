import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "../auth/AuthContext";
import { Fragment } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let item = { email, password };

    try {
      const response = await fetch("http://localhost:3001/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const token = response.headers.get("x-auth-token"); // Extract token from header
        const data = await response.json();
        login(data);
        console.log(data);
        localStorage.setItem("token", token); // Store token in localStorage
        navigate("/products");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Network error occurred. Please try again later.");
    }
  };

  return (
    <Fragment>
      <div className="form-container">
        <form className="form-controller" onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-button">
            Sign in
          </button>
          <p>
            Not a member? <Link to="/signup">Sign Up</Link>
          </p>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
