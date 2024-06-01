// import React, { useState, useEffect, Fragment } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../navBar/Navbar";
// import "../../common/Common.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     let item = { email, password };

//     try {
//       const response = await fetch("http://localhost:3001/api/v1/auth", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(item),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem(
//           "user",
//           JSON.stringify({ ...data, isAuthenticated: true })
//         );
//         setError("");
//         navigate("/products");
//       } else {
//         const errorMessage = await response.text();
//         setError(errorMessage);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       setError("Network error occurred. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     return () => setError("");
//   }, [email, password]);

//   return (
//     <Fragment>
//       <div className="form-container">
//         <form className="form-controller" onSubmit={handleSubmit}>
//           <h2>Sign in</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit" className="submit-button">
//             Sign in
//           </button>
//           {error && <div className="error-message">{error}</div>}
//         </form>
//       </div>
//     </Fragment>
//   );
// }

// export default Login;
// Login.js
// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        const data = await response.json();
        login(data);
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
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
