import React, { useState } from "react";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import { getOtp, otpVerification, userSignup } from "../../api/user";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OTPLogin = () => {
  const [step, setStep] = useState(1);
  const [loginType, setLoginType] = useState("phone");
  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    const data = {
      verificationType: "PROFILE",
      actionType: "SEND",
      userName: inputValue,
    };


    getOtp(data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setOtp(res.data?.detail.otp);
      }
    });
    setStep(2);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    const res = otpVerification({
      userName: inputValue,
      otpCode: otp,
      actionType: "VERIFY",
      verificationType: "PROFILE",
    });
    console.log(res);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    userSignup({ userName: inputValue, password })
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Signup Successful",
            text: "Your account has been created successfully.",
            timer: 5000,
            timerProgressBar: true,
          }).then(() => {
            navigate("/user-login");
          });
        }
      })
      .catch((error) => {
        console.error("Signup failed", error);
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: "Something went wrong. Please try again.",
          timer: 5000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <section className="font-beatrice bg-gray-100 h-screen">
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>
      <div className="md:flex md:min-h-screen">
        <div className="flex flex-col justify-center items-center md:w-1/2 md:p-8 p-4">
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
                onClick={handleNext}
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
                <button type="submit" onClick={verifyOtp}>
                  Verify OTP
                </button>
              </div>

              {step === 2 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

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
