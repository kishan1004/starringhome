import React from "react";
import Product1 from "../images/product1.jpeg";
import Product2 from "../images/imgproduct2.jpeg";
import Centerimage from "../images/centerimage.jpg";
import Backgroungherosection from "../images/homepagemainphoto.png";

const TrendingSection = () => {
  return (
    <>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 w-full h-[400px] ">
        {/* Left Section */}
        <div
          className="relative col-span-1 bg-cover"
          style={{ backgroundImage: `url(${Product1})` }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute bottom-14 left-8 text-white text-2xl font-semibold">
            <p>AUTUMN SHOW</p>
          </div>
        </div>

        {/* Center Section */}
        <div
          className="relative lg:col-span-3 col-span-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${Centerimage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="flex justify-end mr-10">
            <div className="absolute flex flex-col justify-center items-end  text-white h-full">
              <p className="text-3xl font-semibold text-end">NEW TRENDING</p>
              <p className="text-6xl font-bold mt-2 ">2024</p>
              <hr className="w-36 border-t-2" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="relative col-span-1 bg-cover"
          style={{ backgroundImage: `url(${Product2})` }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute bottom-14 left-8 text-white text-2xl text-center font-semibold">
            <p>MAN COLLECTION</p>
          </div>
        </div>
      </div>

      <div
        className="relative h-[500px] w-screen bg-cover max-sm:bg-center"
        style={{ backgroundImage: `url(${Backgroungherosection})` }}
      >
        {/* Centered content */}
        <div className="flex flex-col items-center justify-end h-full text-center text-white pb-10">
          <h4 className="md:text-xl text-lg font-normal uppercase mb-4">
            Vivamus sit amet interdum elit
          </h4>
          <h1 className="md:text-6xl text-5xl font-bold mb-6">#LoremIpsum</h1>

          {/* SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="100"
            height="100"
            fill="none"
            stroke="white"
            strokeWidth="4"
          >
            {/* <!-- Dotted Circle --> */}
            <circle cx="50" cy="50" r="30" strokeDasharray="8,5" />

            {/* <!-- Shorter Downward Arrow --> */}
            <path
              d="M50 40 L50 60 M45 55 L50 60 L55 55"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default TrendingSection;
