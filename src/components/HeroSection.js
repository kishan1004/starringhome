import React from "react";
import Backgroungherosection from "../images/homepagemainphoto.png";
import WhiteLogo from "../images/starringwhite.png";
import { IoArrowBack } from "react-icons/io5";
import SaleImage from "../images/homepagesalephoto.png";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

const HeroSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <div
        className="relative h-screen w-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Backgroungherosection})` }}
      >
        {/* Logo at the top-left corner */}
        <div
          className="absolute lg:top-3 md:left-20 top-2 left-2"
          data-aos="zoom-in"
        >
          <img src={WhiteLogo} alt="Logo" className="w-[200px]" />
        </div>

        {/* Centered content */}
        <div className="flex flex-col items-center justify-center h-full text-center text-white">
          <h4 className="md:text-xl text-lg font-normal uppercase mb-4">
            Vivamus sit amet interdum elit
          </h4>
          <h1 className="md:text-6xl text-5xl font-bold mb-6">#LoremIpsum</h1>

          {/* SVG Icon */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="100"
              height="100"
              fill="none"
              stroke="white"
              strokeWidth="4"
              className="animate-spin-slow "
            >
              <circle cx="50" cy="50" r="30" strokeDasharray="8,5" />
            </svg>
            <svg
              width="40"
              height="30"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" absolute top-[35%] right-[30%]"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M31.5 0V42.5246L51.1003 22.9243L56 28L28 56L0 28L4.89984 23.1005L24.5 42.5246V0H31.5Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <div className="flex h-96 md:w-[80%] w-[90%] bg-[#D7CCC8] mx-auto absolute top-[75%] left-[10%]">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <IoArrowBack className="text-black text-3xl cursor-pointer" />
          </div>
          <div className="flex absolute -top-10">
            <div className="flex flex-col justify-center items-center bg-[#263238] lg:w-1/3 md:w-[40%] p-8 text-white ml-20">
              <p
                className="text-base uppercase tracking-widest"
                data-aos="fade-up"
              >
                End of Season
              </p>
              <h1
                className="text-6xl uppercase font-bold mt-2"
                data-aos="fade-up"
              >
                Sale
              </h1>
              <p
                className="md:text-4xl text-3xl my-6 font-medium text-center"
                data-aos="fade-up"
              >
                Up to 70% off
              </p>
              <p
                className="bg-[#6D4C41] px-4 py-1 mt-4 inline-block text-sm font-medium"
                data-aos="fade-up"
              >
                Vivamus sit amet interdum elit.
              </p>
              <p
                className="bg-[#6D4C41] px-4 py-1 mt-1 inline-block text-sm font-medium"
                data-aos="fade-up"
              >
                Proin erat ac velit tempus auctor.
              </p>
              <button
                className="mt-10 px-6 py-3 border border-white text-white text-sm font-semibold flex items-center hover:bg-white hover:text-[#37474F] transition"
                data-aos="fade-up"
              >
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
