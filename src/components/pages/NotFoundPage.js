import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-beatrice">
      <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-3xl mb-4">😢</p>
      <p className="text-xl text-gray-600 mb-8">Oops! Page Not Found</p>
      <Link
        to="/"
        className=" text-black px-6 py-3 rounded-md shadow-md border-2 hover:text-white transition duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
