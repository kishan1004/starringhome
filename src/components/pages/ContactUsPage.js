import React from "react";
import Blacklogo from "../../images/starringblack.png";
import { Link } from "react-router-dom";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 font-beatrice">
      <div className="w-full md:px-10  px-4 pb-4">
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
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Have questions or need assistance? We're here to help!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="m-2 max-w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <div className="flex flex-col items-center">
              <img
                src={Blacklogo}
                alt="Store Logo"
                className="w-[200px] mb-4"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Our Store</h2>
            <p className="text-gray-700 mb-1">Store Name: Starring Clothing</p>
            <p className="text-gray-700 mb-1">
              Address: 123 Main Street, Chennai- 10001
            </p>
            <p className="text-gray-700 mb-1">Email: support@fashionhub.com</p>
            <p className="text-gray-700 mb-1">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="m-2 max-w-full bg-white p-8 rounded-lg shadow-lg">
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-slate-400 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
