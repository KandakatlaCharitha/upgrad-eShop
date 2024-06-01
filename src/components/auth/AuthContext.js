// // import React, { createContext, useContext, useState, useEffect } from "react";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [authState, setAuthState] = useState(() => {
// //     const storedAuthState = localStorage.getItem("authState");
// //     return storedAuthState
// //       ? JSON.parse(storedAuthState)
// //       : { isAuthenticated: false, isAdmin: false };
// //   });

// //   useEffect(() => {
// //     localStorage.setItem("authState", JSON.stringify(authState));
// //   }, [authState]);

// //   const login = (userData) => {
// //     setAuthState({ isAuthenticated: true, isAdmin: userData.isAdmin || false });
// //   };

// //   const logout = () => {
// //     setAuthState({ isAuthenticated: false, isAdmin: false });
// //   };

// //   return (
// //     <AuthContext.Provider value={{ ...authState, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const login = (userData) => {
//     setIsAuthenticated(true);
//     if (userData.isAdmin) setIsAdmin(true);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setIsAdmin(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (userData) => {
    setIsAuthenticated(true);
    if (userData.isAdmin) setIsAdmin(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
