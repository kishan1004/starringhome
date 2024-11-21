import React, { useState } from "react";
import Blacklogo from "../../images/starringblack.png";
import { userLogin } from "../../api/admin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {

    e.preventDefault();
    userLogin(username, password).then(res => {
      if (res.status === 200 && res?.data?.detail?.token) {
        localStorage.setItem('authToken', res?.data?.detail?.token);
        navigate('/admin/dashboard');
      }
    })
  }

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
