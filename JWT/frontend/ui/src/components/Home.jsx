// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../contexts/authContext";

// const Home = ({ isAuthenticated, setIsAuthenticated }) => {
//   const [token, setToken] = useState("");
//   const [profile, setProfile] = useState("");

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const register = async () => {
//     console.log("--register--");

//     await axios.post("http://localhost:3001/register", {
//       username,
//       password,
//     });
//     alert("User registered!");
//   };

//   const login = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/login", {
//         username,
//         password,
//       });
//       console.log(response.data);
//       setToken(response.data.token);
//       setIsAuthenticated(true);
//       alert("Logged in!");
//     } catch (error) {
//       console.log("Error on login", error.message);
//       alert("Wrong credentials");
//     }
//   };

//   const getProfile = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProfile(response.data.message);
//     } catch (error) {
//       alert("Error fetching profile: " + error.response.data.message);
//     }
//   };
//   return (
//     <div
//       style={{
//         textAlign: "center",
//         padding: "20px",
//         backgroundColor: "#f0f0f0",
//         borderRadius: "8px",
//         // border: "3px solid red",
//       }}
//     >
//       <h1 style={{ color: "#333" }}>Welcome to Our App</h1>
//       <div style={{ margin: "20px 0" }}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={{
//             padding: "10px",
//             margin: "10px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             width: "200px",
//           }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{
//             padding: "10px",
//             margin: "10px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             width: "200px",
//           }}
//         />
//       </div>
//       <div style={{ margin: "20px 0" }}>
//         <button
//           onClick={register}
//           style={{
//             margin: "0  10px",
//             marginLeft: "-80px",
//             padding: "10px 20px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             transition: "background-color 0.3s",
//           }}
//           onMouseOver={(e) =>
//             (e.currentTarget.style.backgroundColor = "#45a049")
//           }
//           onMouseOut={(e) =>
//             (e.currentTarget.style.backgroundColor = "#4CAF50")
//           }
//         >
//           Register
//         </button>
//         <button
//           onClick={login}
//           style={{
//             margin: "0 10px",
//             padding: "10px 20px",
//             backgroundColor: "#008CBA",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             transition: "background-color 0.3s",
//           }}
//           onMouseOver={(e) =>
//             (e.currentTarget.style.backgroundColor = "#007bb5")
//           }
//           onMouseOut={(e) =>
//             (e.currentTarget.style.backgroundColor = "#008CBA")
//           }
//         >
//           Login
//         </button>
//         <button
//           onClick={getProfile}
//           style={{
//             margin: "0 10px",
//             padding: "10px 20px",
//             backgroundColor: "#f44336",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             transition: "background-color 0.3s",
//           }}
//           onMouseOver={(e) =>
//             (e.currentTarget.style.backgroundColor = "#e53935")
//           }
//           onMouseOut={(e) =>
//             (e.currentTarget.style.backgroundColor = "#f44336")
//           }
//         >
//           Get Profile
//         </button>
//       </div>
//       <p style={{ fontSize: "16px", color: "#555", marginTop: "20px" }}>
//         {profile}
//       </p>
//       {isAuthenticated ? (
//         <h1 style={{ fontSize: "48px" }}>Hello {username}</h1>
//       ) : null}
//     </div>
//   );
// };

// export default Home;
////////////////////////////////////
// components/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? "/api/signup" : "/api/signin";

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data: ", data);

      if (response.ok) {
        if (!isSignup) {
          login(data.token);
          navigate("/about");
        } else {
          setIsSignup(false); // Switch to signin after successful signup
        }
      } else {
        setEmail("");
        setPassword("");
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Sign In"
          : "Need an account? Sign Up"}
      </button>
    </div>
  );
}

export default Home;
