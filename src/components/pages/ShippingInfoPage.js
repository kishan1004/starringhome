import React from "react";
import Blacklogo from "../../images/starringblack.png";
import { Link } from "react-router-dom";
const ShippingInfoPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center font-beatrice">
      <div className="w-screen md:px-10  px-4 pb-4">
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
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <img
          src={Blacklogo}
          alt="Store Logo"
          className="w-[200px] mb-6 mx-auto"
        />
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Shipping Information
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          At <span className="font-semibold">Fashion Hub</span>, we strive to
          ensure your shopping experience is as seamless and enjoyable as
          possible. Here’s everything you need to know about our shipping
          process.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
          Shipping Methods & Costs
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          We offer a variety of shipping methods to meet your needs. Shipping
          costs are calculated based on your location and selected shipping
          speed, which you can view at checkout.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
          Delivery Times
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Orders are processed within 1-2 business days. Delivery times vary
          depending on your chosen shipping method:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
          <li>Standard Shipping: 5-7 business days</li>
          <li>Express Shipping: 2-3 business days</li>
          <li>Overnight Shipping: 1 business day</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
          Tracking Your Order
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Once your order has been shipped, you will receive a tracking number
          via email so you can monitor your package’s progress.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
          International Shipping
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          We ship worldwide! International shipping times and costs vary based
          on destination. Please note that customs fees may apply and are the
          responsibility of the customer.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
          Need Help?
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          If you have any questions or concerns about your order, please{" "}
          <a href="/contact-us" className="text-blue-600 hover:underline">
            contact our support team
          </a>
          . We’re here to assist you!
        </p>
      </div>
    </div>
  );
};

export default ShippingInfoPage;
