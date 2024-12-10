import React from "react";
import Productphoto from "../../images/product1.jpeg";
import { Link } from "react-router-dom";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";

const orders = [
  {
    id: 1,
    photo: Productphoto,
    name: "Product Name 1",
    size: "Medium",
    price: "Rs.149.99",
  },
  {
    id: 2,
    photo: Productphoto,
    name: "Product Name 2",
    size: "Large",
    price: "Rs.89.99",
  },
  {
    id: 3,
    photo: Productphoto,
    name: "Product Name 3",
    size: "Small",
    price: "Rs.129.99",
  },
];

const YourOrders = () => {
  return (
    <section className="font-beatrice bg-gray-100 min-h-screen">
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}
        <div className="min-h-screen bg-gray-100 py-8 md:w-1/2 w-full">
          <div className="w-full p-4">
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
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Your Orders
            </h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {orders.map((order) => (
                <div
                  key={order.id} // Correctly placed key prop
                  className="rounded-lg shadow-md overflow-hidden flex items-center p-4 bg-white"
                >
                  {/* Wrap the image and details with a link for better UX */}
                  <Link
                    to="/userorderdetail"
                    className="flex items-center w-full hover:no-underline"
                  >
                    {/* Product Image */}
                    <img
                      src={order.photo}
                      alt={order.name}
                      className="w-32 h-32 object-contain rounded-md mr-4"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {order.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Size: {order.size}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Price: {order.price}
                      </p>
                      {/* Buy Again Button */}
                      <div>
                        <button
                          className="bg-green-500 text-white text-sm py-2 px-4 mt-1 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                          onClick={() => `Buying ${order.name} again!`}
                        >
                          Buy Again
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
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

export default YourOrders;
