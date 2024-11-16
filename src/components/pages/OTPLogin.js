import React, { useState } from "react";
import Blacklogo from "../../images/starringblack.png";

const OTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    // Simulate sending OTP (replace with your API call)
    console.log(`Sending OTP to ${phoneNumber}`);
    setIsOtpSent(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Simulate OTP verification (replace with your API call)
    console.log(`Verifying OTP: ${otp}`);
    // Proceed with login
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pt-20">
      {/* Header */}
      <header className="text-center py-6">
        <img
          src={Blacklogo}
          alt="Store Logo"
          className="w-[200px] mb-6 mx-auto"
        />
        <h1 className="text-4xl font-bold text-gray-900">
          Login to Your Account
        </h1>
      </header>

      {/* Login Form */}
      <main className="max-w-md mx-auto p-6">
        {!isOtpSent ? (
          // Phone Number Input Form
          <form onSubmit={handlePhoneNumberSubmit}>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-semibold"
              >
                Enter Your Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Phone Number"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-200"
            >
              Send OTP
            </button>
          </form>
        ) : (
          // OTP Input Form
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-semibold"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="OTP"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-200"
            >
              Verify OTP
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default OTPLogin;
