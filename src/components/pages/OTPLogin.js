import React, { useState } from "react";
import LoginImg from "../../images/loginimage.jpeg";

const OTPLogin = () => {
  const [step, setStep] = useState(1); // Step 1: Enter phone/email, Step 2: Enter OTP
  const [loginType, setLoginType] = useState("phone"); // 'phone' or 'email'
  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    // Simulate sending OTP (you can replace this with an actual API call)
    console.log(`Sending OTP to ${loginType}: ${inputValue}`);
    setStep(2);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate OTP validation and login (replace with an actual API call)
    console.log(`Verifying OTP: ${otp} for ${loginType}: ${inputValue}`);
    alert("Login Successful!");
  };

  return (
    <section className="font-beatrice bg-gray-100">
      <div className="m-4 h-32 overflow-hidden md:hidden">
        <img src={LoginImg} alt="logo" className="rounded-lg object-cover" />
      </div>
      <div className="md:flex md:min-h-screen">
        <div className="flex flex-col justify-center items-center md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Sign Up
          </h2>
          <p className="text-center text-gray-500 mt-2">
            {step === 1
              ? `Enter your ${
                  loginType === "phone" ? "Phone Number" : "Email ID"
                }`
              : "Enter the 4-digit OTP sent to you."}
          </p>

          {step === 1 ? (
            // Step 1: Enter Phone/Email
            <form onSubmit={handleNext} className="mt-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {loginType === "phone" ? "Phone Number" : "Email Address"}
                </label>
                <input
                  type={loginType === "phone" ? "tel" : "email"}
                  placeholder={
                    loginType === "phone"
                      ? "Enter phone number"
                      : "Enter email address"
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Send OTP
              </button>
            </form>
          ) : (
            // Step 2: Enter OTP
            <form onSubmit={handleLogin} className="mt-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </form>
          )}

          {step === 1 && (
            <button
              onClick={() =>
                setLoginType(loginType === "phone" ? "email" : "phone")
              }
              className="mt-4 text-blue-500 underline hover:text-blue-600 transition text-center w-full"
            >
              Use {loginType === "phone" ? "Email ID" : "Phone Number"} instead
            </button>
          )}
        </div>
        <div
          className="w-1/2 bg-cover bg-center m-5 rounded-lg max-sm:hidden"
          style={{ backgroundImage: `url(${LoginImg})` }}
        ></div>
      </div>
    </section>
  );
};

export default OTPLogin;
