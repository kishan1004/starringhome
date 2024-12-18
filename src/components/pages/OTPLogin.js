import React, { useState } from "react";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import {
  forgotPassword,
  getOtp,
  otpVerification,
  userSignup,
} from "../../api/user";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader2 from "../common/Loader2";

const OTPLogin = () => {
  const { type } = useParams();
  const [step, setStep] = useState(1);
  const [loginType, setLoginType] = useState("phone");
  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, SetEmailErr] = useState(false);
  const [PasswordStatus, setPasswordStatus] = useState(false);
  const [isOtpVerified, setisOtpVerified] = useState(true);
  const [ValidationMsg, SetValidationMsg] = useState(true);
  const [isLoading, SetisLoading] = useState(false);

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    const t = type === "new" ? "PROFILE" : "PASSWORD";
    const isAllNumbers = /^\d+$/.test(inputValue);
    const hasPrefix = inputValue.startsWith("+91");

    const data = {
      verificationType: t,
      actionType: "SEND",
      userName: isAllNumbers && !hasPrefix ? `+91${inputValue}` : inputValue,
    };


    SetisLoading(true);
    getOtp(data).then((res) => {
      SetisLoading(false);

      if (res.status === 200) {
        setOtp(res.data?.detail.otp);
      }

      if (res.status != 404 && res.status != 422) {
        setStep(2);
      } else {
        console.log(res.response.data.detail);
        SetValidationMsg(res.response.data.detail[0].msg)
      }
    });
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const t = type === "new" ? "PROFILE" : "PASSWORD";

    const isAllNumbers = /^\d+$/.test(inputValue);
    const hasPrefix = inputValue.startsWith("+91");
    SetisLoading(true);

    const res = await otpVerification({
      userName: isAllNumbers && !hasPrefix ? `+91${inputValue}` : inputValue,
      otpCode: otp,
      actionType: "VERIFY",
      verificationType: t,
    });

    SetisLoading(false);

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Verification Successful",
        text: res.data.detail[0].msg,
        timer: 5000,
        timerProgressBar: true,
      }).then(() => {
        setisOtpVerified(false);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: res.data.detail[0].msg,
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const isAllNumbers = /^\d+$/.test(inputValue);
    const hasPrefix = inputValue.startsWith("+91");
    SetisLoading(true);

    if (type === "new") {
      SetisLoading(true);

      userSignup({
        userName: isAllNumbers && !hasPrefix ? `+91${inputValue}` : inputValue,
        password,
      })
        .then((res) => {
          console.log(res);

          if (res?.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Signup Successful",
              text: res.data.detail[0].msg,
              timer: 5000,
              timerProgressBar: true,
            }).then(() => {
              navigate("/user-login");
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Signup Failed",
              text: res.response.data.detail[0].msg,
            });
          }
        })
        .catch((error) => {
          console.error("Signup failed", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Signup failed. Please try again.",
          });
        });
        SetisLoading(false);
    } else {
      SetisLoading(true);

      forgotPassword({
        userName: isAllNumbers && !hasPrefix ? `+91${inputValue}` : inputValue,
        newPassword: password,

      })
        .then((res) => {
          console.log(res);
        SetisLoading(false);
          if (res.status == 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: res.data.detail[0].msg,
              timer: 5000,
              timerProgressBar: true,
            }).then(() => {
              navigate("/user-login");
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.data.detail[0].msg,
              timer: 5000,
              timerProgressBar: true,
            }).then(() => {
              navigate("/user-login");
            });
          }

        })
        .catch((error) => {
        SetisLoading(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Password reset failed. Please try again.",
          });
        });
    }

  };

  function validateMobile(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  }

  function allowOnlyEmail(e) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the input against the regex
    if (emailRegex.test(e.target.value)) {
      SetEmailErr(false);
    } else {
      SetEmailErr(true);
    }
  }

  function validatePassword(e) {
    const regex =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$:;".<~>!%`^\[\]\-\'\\\({|_+=/,})*#?&]).{8,15}$/;
    const PassStatus = regex.test(e.target.value);
    setPasswordStatus(!PassStatus);
    setPassword(e.target.value);
  }

  return (
    <section className="font-beatrice bg-gray-100 h-screen">
      {isLoading && <Loader2/>}
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>
      <div className="md:flex md:min-h-screen">
        <div className="flex flex-col justify-center items-center md:w-1/2 md:p-8 p-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            {type === "new" ? "Sign Up" : "Reset Password"}
          </h2>
          <p className="text-center text-gray-500 mt-2">
            {step === 1
              ? `Enter your ${loginType === "phone" ? "Phone Number" : "Email ID"
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
                  onInput={(e) =>
                    loginType === "phone"
                      ? validateMobile(e)
                      : allowOnlyEmail(e)
                  }
                  type={loginType === "phone" ? "tel" : "email"}
                  maxLength={loginType === "phone" ? "10" : ""}
                  placeholder={
                    loginType === "phone" ? "+91" : "Enter email address"
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {loginType != "phone" && (
                  <p style={{ color: "red" }}>
                    {emailErr ? "Invalid Email" : ""}
                  </p>
                )}
                <p className="text-red-500 mt-2">{ValidationMsg}</p>
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
                    readOnly={isOtpVerified}
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onInput={(e) => validatePassword(e)}
                    maxLength="15"
                    minLength="8"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {PasswordStatus && (
                    <p style={{ color: "red" }}>Invalid Password</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isOtpVerified}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                {type === "new" ? "Sign Up" : "Reset Password"}
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
