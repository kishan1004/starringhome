import React from "react";
import Product1 from "../images/product1.jpeg";
import Product2 from "../images/product2.jpeg";
import Centerimage from "../images/centerimage.jpg";
import BackgroundVideoSrc2 from "../videos/starringvideo.mp4";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

const TrendingSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 w-full h-[400px] ">
        {/* Left Section */}
        <div
          className="relative col-span-1 bg-cover"
          style={{ backgroundImage: `url(${Product1})` }}
        >
          <div className="absolute inset-0 bg-black opacity-30 hover:opacity-10"></div>
          <div
            className="absolute bottom-14 left-8 text-white text-2xl font-semibold"
            data-aos="flip-left"
          >
            <p>AUTUMN SHOW</p>
          </div>
        </div>

        {/* Center Section */}
        <div
          className="relative lg:col-span-3 col-span-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${Centerimage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-30 hover:opacity-10"></div>
          <div className="flex justify-end mr-10">
            <div
              className="absolute flex flex-col justify-center items-end  text-white h-full"
              data-aos="flip-left"
            >
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
          <div className="absolute inset-0 bg-black opacity-30 hover:opacity-10"></div>
          <div
            className="absolute bottom-14 left-8 text-white text-2xl text-center font-semibold"
            data-aos="flip-left"
          >
            <p>MAN COLLECTION</p>
          </div>
        </div>
      </div>

      <div className="relative h-[500px] w-screen bg-cover max-sm:bg-center">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={BackgroundVideoSrc2} type="video/mp4" />
          {/* Add more <source> tags if you have different video formats for compatibility */}
          Your browser does not support the video tag.
        </video>

        {/* Overlay content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white pb-10">
          <h4 className="md:text-xl text-lg font-normal uppercase mb-4">
            Wear your story, every day
          </h4>
          <h1 className="md:text-6xl text-4xl font-bold mb-6 ">
            Where style meets comfort
          </h1>

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
      </div>
    </>
  );
};

export default TrendingSection;
