import React from "react";
import Productphoto from "../../images/product1.jpeg";

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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h2>

        <div className="grid xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 gap-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg shadow-md overflow-hidden flex items-center p-4"
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
                <p className="text-sm text-gray-600 mt-1">Size: {order.size}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Price: {order.price}
                </p>
                <div className="flex justify-start gap-4 mt-4">
                  {/* Track Order Button */}
                  <button
                    onClick={() => alert("Tracking order...")}
                    className="bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Track Order
                  </button>

                  {/* Buy Again Button */}
                  <button
                    onClick={() => alert("Buying again...")}
                    className="bg-green-500 text-white text-sm py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Buy Again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourOrders;
