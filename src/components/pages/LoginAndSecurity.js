import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";

const LoginAndSecurity = () => {
  const [email, setEmail] = useState("deva@example.com");
  const [isEditing, setIsEditing] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleEmailEdit = () => {
    if (isEditing) {
      if (email.includes("@") && email.includes(".")) {
        setOtpSent(true); // Simulate OTP being sent
        alert("OTP sent to the new email ID for verification!");
      } else {
        alert("Please enter a valid email address.");
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  const handleOtpVerify = () => {
    // Simulate OTP verification
    if (otp === "123456") {
      setIsVerified(true);
      setOtpSent(false);
      alert("Email successfully verified!");
    } else {
      alert("Invalid OTP. Please try again.");
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
          <h2 className="text-xl font-bold mb-4">Login and Security</h2>

          {/* Email Section */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className={`mt-1 block px-3 py-2 text-sm ${
                    isEditing
                      ? "border-gray-300 text-gray-700"
                      : "border-transparent text-gray-500 bg-gray-100"
                  } rounded-lg focus:outline-none ${
                    isEditing ? "focus:ring-2 focus:ring-blue-400" : ""
                  }`}
                />
                {isVerified && (
                  <p className="text-sm text-green-500 mt-2">
                    Email successfully verified.
                  </p>
                )}
              </div>
              <button
                onClick={handleEmailEdit}
                className={`py-1 px-4 rounded text-white ${
                  isEditing ? "bg-green-500 hover:bg-green-600" : "bg-black"
                }`}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>

            {/* OTP Verification */}
            {otpSent && (
              <div className="mt-4">
                <label htmlFor="otp" className="font-semibold text-sm">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block px-3 py-2 text-sm border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter OTP"
                />
                <button
                  onClick={handleOtpVerify}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </div>

          {/* Password Section */}
          <div className="flex justify-between items-start p-4 border-b mt-4">
            <div className="flex-grow">
              <p className="font-semibold">Password</p>
              <p className="text-sm text-gray-600">********</p>
            </div>
            <Link
              to="/change-password"
              className="bg-black text-white py-1 px-4 rounded"
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
