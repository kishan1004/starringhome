import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import { userLogout } from "../../api/user";
import UserProtectLayout from "../common/UserProtectLayout";
import MetaTags from "../common/MetaTags";

const UserLogin = () => {
  const navigate = useNavigate();
  const accountOptions = [
    {
      title: "Your Orders",
      description: "Track or buy things again",
      icon: "📦", // Replace with a relevant icon or image
      link: "/your-orders", // Route for this card
    },
    {
      title: "Login Credentials",
      description: "Edit username and password",
      icon: "📧",
      link: "/login-security", // Route for this card
    },
    {
      title: "Your Addresses",
      description: "Edit addresses for orders",
      icon: "📬",
      link: "/addresses", // Route for this card
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem('userToken')) {
      navigate('/user-login')
    }
  }, [localStorage])

  const metaData = {
    title: "User Account", desc: ""
  }

  return (
    <UserProtectLayout>
      <MetaTags data={metaData} />

      <section className="font-beatrice bg-gray-100 min-h-screen">
        <div className="m-4 overflow-hidden md:hidden">
          <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
        </div>

        <div className="flex md:min-h-screen">
          {/* Left Side - Form Section */}
          <div className="flex flex-col justify-center items-center md:w-1/2 md:p-8 p-4">
            <div className="w-full p-4">
              <Link to="/">
                <svg
                  width="62"
                  height="14"
                  viewBox="0 0 62 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M60.5 7H1M1 7L7 1M1 7L7 13"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center">User Account</h1>
            <p className="mb-8 text-gray-600 text-center">
              Manage your account details below. Make updates or log out of your
              account.
            </p>
            <div className="grid grid-cols-1 gap-6">
              {accountOptions.map((option, index) => (
                <Link
                  key={index}
                  to={option.link} // Link to the specified route
                  className="flex items-start p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Replace emoji with images/icons if needed */}
                  <div className="text-3xl mr-4">{option.icon}</div>
                  <div>
                    <h2 className="text-lg font-medium">{option.title}</h2>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </Link>
              ))}

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  userLogout()
                    .then(res => {
                      if (res.status === 200) {
                        localStorage.removeItem("userToken");
                        navigate('/user-login')
                      }
                    })
                }}
              >
                Logout
              </button>

            </div>
          </div>

          {/* Right Side - Image Section */}
          <div
            className="w-1/2 bg-cover bg-center m-5 rounded-lg max-sm:hidden"
            style={{ backgroundImage: `url(${LoginImg})` }}
          ></div>
        </div>
      </section>
    </UserProtectLayout>
  );
};

export default UserLogin;
