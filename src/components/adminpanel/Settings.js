import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import MetaTags from "../common/MetaTags";

const Settings = () => {
  const [allowAccountCreation, setAllowAccountCreation] = useState(false);
  const [allowPasswordReset, setAllowPasswordReset] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate hook

  const toggleAccountCreation = () => {
    setAllowAccountCreation(!allowAccountCreation);
  };

  const togglePasswordReset = () => {
    setAllowPasswordReset(!allowPasswordReset);
  };

  const goToUserManagement = () => {
    navigate("/admin/user-management"); // Navigate to the user-management page
  };

  const metaData = {
    title: "Settings", desc: ""
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <MetaTags data={metaData} />

      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Allow creating new accounts</span>
          <button
            onClick={toggleAccountCreation}
            className={`relative inline-flex items-center h-6 rounded-full w-11 ${allowAccountCreation ? "bg-blue-600" : "bg-gray-400"
              }`}
          >
            <span
              className={`translate-x-1.5 inline-block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${allowAccountCreation ? "translate-x-6" : ""
                }`}
            />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700">Allow resetting password</span>
          <button
            onClick={togglePasswordReset}
            className={`relative inline-flex items-center h-6 rounded-full w-11 ${allowPasswordReset ? "bg-blue-600" : "bg-gray-400"
              }`}
          >
            <span
              className={`translate-x-1.5 inline-block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${allowPasswordReset ? "translate-x-6" : ""
                }`}
            />
          </button>
        </div>
      </div>

      {/* Button to go to user-management */}
      <div className="mt-6">
        <button
          onClick={goToUserManagement}
          className="px-6 py-2 bg-gray-400 text-white rounded-md shadow-md"
        >
          Go to User Management
        </button>
      </div>
    </div>
  );
};

export default Settings;
