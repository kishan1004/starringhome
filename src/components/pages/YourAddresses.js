import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";

const YourAddresses = () => {
  const addresses = [
    {
      id: 1,
      name: "Deva",
      address:
        "133/2, S.V.R Nagar, 5th Street, nesavalar colony, dadagapatti, Salem, TAMIL NADU 636006, India",
      phone: "6379518189",
      isDefault: true,
    },
    {
      id: 2,
      name: "Deva",
      address:
        "#5, 1st floor GST Road, NH service road, Perumal kovil st, Urapakkam land mark, CHENNAI, TAMIL NADU 603210, India",
      phone: "6379518189",
      isDefault: false,
    },
  ];

  return (
    <section className="font-beatrice bg-gray-100 min-h-screen">
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}

        <div className="md:w-1/2 m-5 p-4">
          <h1 className="text-2xl font-semibold mb-6">Your Addresses</h1>
          <div className="grid grid-cols-1 gap-6">
            {/* Add Address Card */}
            <Link to="/add-address">
              <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-400">+</div>
                  <p className="mt-2 text-gray-500">Add address</p>
                </div>
              </div>
            </Link>

            {/* Existing Address Cards */}
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
              >
                {/* Default Badge */}
                {address.isDefault && (
                  <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full inline-block mb-2">
                    Default
                  </span>
                )}

                {/* Address Details */}
                <h2 className="text-lg font-semibold">{address.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{address.address}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Phone number: {address.phone}
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-4 text-sm">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-blue-500 hover:underline">
                    Remove
                  </button>
                  {!address.isDefault && (
                    <button className="text-blue-500 hover:underline">
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
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

export default YourAddresses;
