import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import UserProtectLayout from "../common/UserProtectLayout";
import { getUserDetails } from "../../api/user";
import MetaTags from "../common/MetaTags";

const LoginAndSecurity = () => {
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    // if (isEditing) {
      // Redirect to another route upon saving new username
      // localStorage.setItem('new_email',username)
      navigate("/otp-login/update-username");
    // }
    // setIsEditing(!isEditing);
  };

  useEffect(() => {
    getUserData()
  }, [])

  async function getUserData() {
    const res = await getUserDetails();
    if (res.status == 200) {
      setUsername(res.data.detail.data.userName)
    }
    console.log(res.data.detail.data.userName)
  }

  const metaData = {
    title: "Login & Security", desc: ""
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
          <div className="md:w-1/2 p-6">
            <div className="w-full pb-4">
              <Link to="/user-account">
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
            <h2 className="text-xl font-bold mb-4">Login and Security</h2>

            {/* Username Section */}
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <label htmlFor="username" className="font-semibold">
                    User Name (Phone Number or Email)
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!isEditing}
                    className={`mt-1 block px-3 py-2 text-sm ${isEditing
                        ? "border-gray-300 text-gray-700"
                        : "border-transparent text-gray-500 bg-gray-100"
                      } rounded-lg focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-blue-400" : ""
                      }`}
                  />
                </div>
                <button
                  onClick={handleSave}
                  className={`py-1 px-4 rounded text-white ${isEditing ? "bg-green-500 hover:bg-green-600" : "bg-black"
                    }`}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
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
    </UserProtectLayout>
  );
};

export default LoginAndSecurity;
