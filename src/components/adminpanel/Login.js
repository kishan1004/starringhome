import React, { useState, useEffect } from "react";
import Blacklogo from "../../images/starringblack.png";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { loginApi } from "../../api/auth";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useMutation(loginApi);

  useEffect(() => {
    // Check if the user is already logged in (check localStorage)
    if (localStorage.getItem("authToken")) {
      navigate("/admin/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    mutation.mutate(
      { email: username, password: password },
      {
        onSuccess: (res) => {
          console.log(res);
          localStorage.setItem("authToken", res.data.detail.token);
          navigate("/admin/dashboard");
        },
        onError: (err) => {
          console.log(err);
          alert("Invalid username or password");
        },
      }
    );

    // Check if the username and password are correct
    // if (username === "StarringAdmin01" && password === "*#123&%478SSERd") {
    //   // Call the onLogin prop to set authentication
    //   onLogin();

    //   // Persist login state in localStorage
    //   localStorage.setItem("isLoggedIn", "true");

    //   // Redirect to dashboard
    //   navigate("/admin/dashboard");
    // } else {
    //   alert("Invalid username or password");
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Blacklogo} alt="Logo" />
        </div>

        {/* Login Form */}
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
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
          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-black rounded-lg focus:outline-none focus:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
