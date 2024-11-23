import React, { useState } from "react";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== reenterPassword) {
      alert("New password and reentered password do not match!");
      return;
    }
    // Handle password update logic here (API call or other actions)
    alert("Password updated successfully!");
  };

  return (
    <section className="font-beatrice bg-gray-100 min-h-screen">
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}

        <div className="md:w-1/2 m-5 p-6">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <p className="text-sm text-gray-600 mb-6">
            Use the form below to change the password for your account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-semibold mb-1"
              >
                Current password:
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold mb-1"
              >
                New password:
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="reenterPassword"
                className="block text-sm font-semibold mb-1"
              >
                Reenter new password:
              </label>
              <input
                type="password"
                id="reenterPassword"
                value={reenterPassword}
                onChange={(e) => setReenterPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg"
            >
              Save changes
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

export default ChangePassword;