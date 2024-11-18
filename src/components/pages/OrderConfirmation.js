import React from "react";
import Blacklogo from "../../images/starringblack.png";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  // Example order details (these can be dynamically passed as props or from state)
  const orderNumber = "123456789";
  const orderDate = "November 15, 2024";
  const shippingAddress = {
    name: "John Doe",
    address: "123 Fashion St, Chennai -10001",
    phone: "+1 234 567 890",
  };

  const items = [
    { id: 1, name: "T-Shirt", size: "M", color: "Red", price: 19.99 },
    { id: 2, name: "Jeans", size: "32", color: "Blue", price: 49.99 },
    { id: 3, name: "Sneakers", size: "10", color: "White", price: 79.99 },
  ];

  const totalAmount = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="max-w-full md:px-10  px-4 pb-4 pt-10">
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
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
      {/* Header */}
      <header className="text-center py-10">
        <img
          src={Blacklogo}
          alt="Store Logo"
          className="w-[200px] mb-6 mx-auto"
        />
        <h1 className="text-4xl font-bold text-gray-900">Order Confirmation</h1>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Thank you for your order!
          </h2>
          <p className="text-gray-700">
            Your order has been successfully placed. Below are the details of
            your order.
          </p>
        </section>

        {/* Order Details */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
          <p className="text-gray-700">
            Order Number: <span className="font-bold">{orderNumber}</span>
          </p>
          <p className="text-gray-700">
            Order Date: <span className="font-bold">{orderDate}</span>
          </p>
        </section>

        {/* Shipping Address */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Shipping Information
          </h3>
          <p className="text-gray-700">
            <span className="font-bold">{shippingAddress.name}</span>
            <br />
            {shippingAddress.address}
            <br />
            Phone: {shippingAddress.phone}
          </p>
        </section>

        {/* Items Purchased */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Items in Your Order
          </h3>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left">Item</th>
                  <th className="px-2 py-2 text-left">Size</th>
                  <th className="px-2 py-2 text-left">Color</th>
                  <th className="px-2 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="px-2 py-2">{item.name}</td>
                    <td className="px-2 py-2">{item.size}</td>
                    <td className="px-2 py-2">{item.color}</td>
                    <td className="px-2 py-2">Rs.{item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Total Amount */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Total Amount</h3>
          <p className="text-gray-700">
            Total:{" "}
            <span className="font-bold">Rs.{totalAmount.toFixed(2)}</span>
          </p>
        </section>

        {/* Order Status */}
        <section className="mb-6">
          <p className="text-green-500 font-semibold">
            Your order is being processed and will be shipped soon.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center py-4 bg-[#CFD8DC] text-black">
        <a href="https://callsharks.in/">Designed by callsharks.in</a>
      </footer>
    </div>
  );
};

export default OrderConfirmation;
