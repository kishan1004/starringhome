import React, { useState } from "react";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import { updatePassword } from "../../api/user";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentPassword, newPassword);

    if (newPassword !== reenterPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New password and reentered password do not match!",
      });
    } else {
      try {
        const res = await updatePassword(currentPassword, newPassword);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Password Updated",
            text: "Your password has been updated successfully!",
            timer: 5000,
            timerProgressBar: true,
          }).then(() => {
            navigate("/");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "Failed to update the password. Please try again.",
            timer: 5000,
            timerProgressBar: true,
          });
          console.log(res);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred. Please try again.",
          timer: 5000,
          timerProgressBar: true,
        });
        console.error("Update failed:", error);
      }
    }
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
