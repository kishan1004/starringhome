import React from "react";
import LoginImg from "../../images/loginimage.jpeg";

const UserLogin = () => {
  return (
    <section className="font-beatrice bg-gray-100">
      <div className="m-4 h-32 overflow-hidden md:hidden">
        <img src={LoginImg} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}
        <div className="flex flex-col justify-center items-center md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">User Account</h1>
          <p className="mb-8 text-gray-600 text-center">
            Manage your account details below. Make updates or log out of your
            account.
          </p>

          <form className="w-full max-w-sm">
            {/* Name Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone Number Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email ID"
              />
            </div>

            {/* Address Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                placeholder="Enter your address"
                rows="3"
              ></textarea>
            </div>

            {/* New Password Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="newPassword"
                type="password"
                placeholder="At least 10 characters"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
              />
            </div>

            {/* Save Changes Button */}
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline mb-4"
              type="button"
            >
              Save Changes
            </button>

            {/* Logout Button */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Logout
            </button>
          </form>
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

export default UserLogin;
