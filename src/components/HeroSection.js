import React from "react";
import Backgroungherosection from "../images/homepagemainphoto.png";
import WhiteLogo from "../images/starringwhite.png";
import { IoArrowBack } from "react-icons/io5";
import SaleImage from "../images/homepagesalephoto.png";

const HeroSection = () => {
  return (
    <>
      <div
        className="relative h-screen w-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Backgroungherosection})` }}
      >
        {/* Logo at the top-left corner */}
        <div className="absolute lg:top-3 md:left-20 top-2 left-2">
          <img src={WhiteLogo} alt="Logo" className="w-[200px]" />
        </div>

        {/* Centered content */}
        <div className="flex flex-col items-center justify-center h-full text-center text-white">
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

        <div className="flex h-96 md:w-[80%] w-[90%] bg-[#D7CCC8] mx-auto absolute top-[75%] left-[10%]">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <IoArrowBack className="text-black text-3xl cursor-pointer" />
          </div>
          <div className="flex absolute -top-10">
            <div className="flex flex-col justify-center items-center bg-[#263238] lg:w-1/3 md:w-[40%] p-8 text-white ml-20">
              <p className="text-base uppercase tracking-widest ">
                End of Season
              </p>
              <h1 className="text-6xl uppercase font-bold mt-2">Sale</h1>
              <p className="md:text-4xl text-3xl my-6 font-medium text-center">
                Up to 70% off
              </p>
              <p className="bg-[#6D4C41] px-4 py-1 mt-4 inline-block text-sm font-medium">
                Vivamus sit amet interdum elit.
              </p>
              <p className="bg-[#6D4C41] px-4 py-1 mt-1 inline-block text-sm font-medium">
                Proin erat ac velit tempus auctor.
              </p>
              <button className="mt-10 px-6 py-3 border border-white text-white text-sm font-semibold flex items-center hover:bg-white hover:text-[#37474F] transition">
                SEE DETAIL <span className="ml-2">&rarr;</span>
              </button>
            </div>

            {/* Image on the right */}
            <div className="flex-1">
              <img
                src={SaleImage}
                alt="Sale"
                className="h-full w-full object-cover hidden md:block"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
