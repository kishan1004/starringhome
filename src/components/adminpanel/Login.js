import React, { useEffect, useState } from "react";
import Blacklogo from "../../images/starringblack.png";
import { userLogin } from "../../api/admin";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MetaTags from "../common/MetaTags";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any existing error message
    setIsLoading(true);
    try {
      const res = await userLogin(username, password);
      if (res.status === 200 && res?.data?.detail?.token) {
        localStorage.setItem("authToken", res?.data?.detail?.token);
        navigate("/admin/dashboard");
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
      }
    } catch (error) {
      // Handle errors from the API
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setErrorMessage("");
    if (localStorage.getItem('authToken')) {
      navigate('/admin/dashboard')
    }
  }, [username, password]);

  const metaData = {
    title: "Admin Login", desc: ""
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <MetaTags data={metaData} />

      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Blacklogo} alt="Logo" />
        </div>

        {/* Login Form */}
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Admin Login
        </h2>
        {errorMessage && (
          <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={loginUser} className="mt-8 space-y-6">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3 relative">
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 font-semibold text-white bg-black rounded-lg focus:outline-none focus:bg-gray-800"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
