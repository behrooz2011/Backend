// //rafce
// import React, { useState } from "react";
// import { BrowserRouter } from "react-router-dom";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import { AuthProvider } from "./contexts/authContext";

// const ProtectedRoute = ({ element, isAuthenticated }) => {
//   return isAuthenticated ? element : <Navigate to="/" replace />;
// };

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   console.log("isAuthenticated: ", isAuthenticated);

//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <div>
//           <Routes>
//             {/* <Route path="/" element={<Home />} /> */}
//             <Route
//               path="/"
//               element={
//                 <Home
//                   isAuthenticated={isAuthenticated}
//                   setIsAuthenticated={setIsAuthenticated}
//                 />
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute
//                   element={<Profile />}
//                   isAuthenticated={isAuthenticated}
//                 />
//               }
//             />
//             }
//           </Routes>
//         </div>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// };

// export default App;

// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/authContext";
import Home from "./components/Home";
import About from "./components/About";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default App;
