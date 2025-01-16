import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const AuthComponent = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // const register = async () => {
  //   await axios.post("http://localhost:3000/register", {
  //     username: "testuser",
  //     password: "password123",
  //   });
  //   alert("User registered!");
  // };

  // const login = async () => {
  //   const response = await axios.post("http://localhost:3000/login", {
  //     username: "testuser",
  //     password: "password123",
  //   });
  //   setToken(response.data.token);
  //   alert("Logged in!");
  // };

  // const getProfile = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/profile", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setProfile(response.data.message);
  //   } catch (error) {
  //     alert("Error fetching profile: " + error.response.data.message);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        {/* Tabs */}
        <div className="flex space-x-4 border-b">
          <button
            className={`pb-2 px-4 ${
              isSignIn
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`pb-2 px-4 ${
              !isSignIn
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            {isSignIn ? "Welcome Back" : "Create Account"}
          </h2>

          {!isSignIn && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                required
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              required
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {isSignIn && (
            <div className="text-right">
              <a
                href="/hi"
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Google
            </button>
            <button className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
