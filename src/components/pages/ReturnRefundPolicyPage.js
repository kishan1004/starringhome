import React from "react";
import Blacklogo from "../../images/starringblack.png";
import { Link } from "react-router-dom";

const ReturnRefundPolicyPage = () => {
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
          Return & Refund Policy
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          At <span className="font-semibold">Starring Clothing</span>, we want
          you to be completely satisfied with your purchase. If for any reason
          you are not, our return and refund policy is here to assist you.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">Returns</h2>
        <p className="text-lg text-gray-700 mb-4">
          You have 30 days from the date of delivery to return an item. To be
          eligible for a return, your item must be unused and in the same
          condition that you received it, with the original packaging.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">Refunds</h2>
        <p className="text-lg text-gray-700 mb-4">
          Once we receive your returned item, we will inspect it and notify you
          of the status of your refund. If approved, the refund will be
          processed and a credit will be applied to your original method of
          payment within 5-10 business days.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
          Non-Returnable Items
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Certain items, such as intimate apparel, custom products, and final
          sale items, are not eligible for returns or refunds.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
          Exchanges
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          If you need to exchange an item for a different size or color, please
          contact us at{" "}
          <a
            href="mailto:support@fashionhub.com"
            className="text-blue-600 hover:underline"
          >
            support@starring.com
          </a>
          . We will guide you through the process.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
          Contact Us
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          If you have any questions about our return and refund policy, please
          contact us:
        </p>
        <ul className="text-lg text-gray-700 mb-4">
          <li>
            <span className="font-semibold">Store Name:</span> Starring Clothing
          </li>
          <li>
            <span className="font-semibold">Address:</span> 123 Fashion Street,
            Style City, CA 12345
          </li>
          <li>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:support@fashionhub.com"
              className="text-blue-600 hover:underline"
            >
              support@fashionhub.com
            </a>
          </li>
          <li>
            <span className="font-semibold">Phone:</span> (123) 456-7890
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReturnRefundPolicyPage;
