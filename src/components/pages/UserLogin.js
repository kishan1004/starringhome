import React from "react";
import LoginImg from "../../images/loginimage.jpeg";
import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <>
      <div className="m-4 h-32 overflow-hidden md:hidden">
        <img src={LoginImg} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}
        <div className="flex flex-col justify-center items-center md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome Back{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h1>
          <p className="mb-8 text-gray-600">
            Today is a new day. It's your day. You shape it. Sign in to start
            managing your projects.
          </p>

          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="emailOrPhone"
              >
                Email or Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="emailOrPhone"
                type="text"
                placeholder="Enter Email id or Phone Number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="At least 10 characters"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <a
                className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
                href="/"
              >
                Forgot Password?
              </a>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign in
            </button>
          </form>

          <p className="pt-4">
            Don't you have an account?{" "}
            <span className="underline text-blue-500">
              <Link to="/otp-login">Sign up </Link>
            </span>
          </p>
        </div>

        {/* Right Side - Image Section */}
        <div
          className="w-1/2 bg-cover bg-center m-5 rounded-lg max-sm:hidden"
          style={{ backgroundImage: `url(${LoginImg})` }}
        ></div>
      </div>
    </>
  );
};

export default UserLogin;
