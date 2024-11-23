import React, { useState } from "react";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import { Link } from "react-router-dom";
import { userLogin } from "../../api/user";

const UserLogin = () => {
  //show error in UI
  const [error, setError] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const onLogin = (e) => {
    e.preventDefault();
    //email validation
    if (isNaN(userName)) {
      const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!patt.test(userName)) {
        setError("Invalid email");
        return;
      }
    } else {
      // can have 10 numbers
      // 11 if first number is 0
      // 12 if first 2 numbers is 91
      let patt = new RegExp(/(0|91)?[6-9][0-9]{9}/);
      if (!patt.test(userName)) {
        setError("Invalid Phone Number");
        return;
      }
    }

    //password validation
    let patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!patt.test(password)) {
      setError("Invalid password");
      return;
    }

    // api call: do route here
    userLogin(userName, password).then((res) => {
      if(res.status === 200) {
        localStorage.setItem("userToken", res?.data?.detail?.token);
      }
      console.log(res);
    })
  }

  return (
    <section className="font-beatrice bg-gray-100 h-screen">
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}
        <div className="flex flex-col justify-center items-center md:w-1/2 md:p-8 p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Welcome Back{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h1>
          <p className="mb-8 text-gray-600 text-center">
            Today is a new day. It's your day. You shape it. Sign in to start
            managing your projects.
          </p>

          <form className="w-full max-w-sm" onSubmit={onLogin}>
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
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
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
              type="submit"
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
    </section>
  );
};

export default UserLogin;
