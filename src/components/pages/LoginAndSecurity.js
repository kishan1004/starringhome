import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";

const LoginAndSecurity = () => {
  const [name, setName] = useState("Deva");
  const [username, setUsername] = useState("deva11");

  return (
    <section className="font-beatrice bg-gray-100 min-h-screen">
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}
        <div className="md:w-1/2 m-5 p-6">
          <h2 className="text-xl font-bold mb-4">Login and Security</h2>

          {/* Name Section */}
          <div className="flex justify-between items-start p-4 border-b">
            <div className="flex-grow">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Username Section */}
          <div className="flex justify-between items-start p-4 border-b">
            <div className="flex-grow">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="flex justify-between items-start p-4 border-b">
            <div className="flex-grow">
              <p className="font-semibold">Password</p>
              <p className="text-sm text-gray-600">********</p>
            </div>
            <Link
              to="/change-password"
              className="bg-black text-white py-1 px-4 rounded "
            >
              Edit
            </Link>
          </div>
        </div>

        {/* Right Side - Image Section */}
        <div
          className="w-1/2 bg-cover bg-center m-5 rounded-lg max-sm:hidden"
          style={{ backgroundImage: `url(${LoginImg})` }}
        ></div>
      </div>
    </section>
  );
};

export default LoginAndSecurity;
