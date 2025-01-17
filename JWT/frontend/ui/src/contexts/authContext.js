// import React, { createContext, useState, useEffect } from "react";

// // Create the AuthContext
// export const AuthContext = createContext();

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true);
//   const [authToken, setAuthToken] = useState(null);

//   // Check for token in local storage on initial load
//   useEffect(() => {
//     console.log("--context useEffect--");

//     const token = localStorage.getItem("authToken");
//     if (token) {
//       setIsAuthenticated(true);
//       setAuthToken(token);
//     }
//   }, []);

//   // Function to log in
//   const login = (token) => {
//     localStorage.setItem("authToken", token);
//     setAuthToken(token);
//     setIsAuthenticated(true);
//   };

//   // Function to log out
//   const logout = () => {
//     localStorage.removeItem("authToken");
//     setAuthToken(null);
//     setIsAuthenticated(false);
//   };
//   let hype = 10;

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, authToken, hype, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthContext.js
// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null);

//   const login = (authToken) => {
//     setToken(authToken);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

/////////////////// Using localStorage ////////////////////////////
// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = (authToken) => {
    setToken(authToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
