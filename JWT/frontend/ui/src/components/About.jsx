// components/About.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function About() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="about-content">
        <h1>Welcome to the Protected About Page!</h1>
        <p>This page is only visible to authenticated users.</p>
      </div>
    </div>
  );
}

export default About;
