import React from "react";
import Product1 from "../images/product1.jpeg";
import Product2 from "../images/product2.jpeg";
import Centerimage from "../images/all-products-bg.jpg";
import BackgroundVideoSrc2 from "../videos/starringvideo.mp4";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TrendingSection = (props) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  

  return (
    <>
      <div
        className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 w-full h-[400px] "
        id={props.id}
      >
        {/* Left Section */}

        <div
          className="relative col-span-1 bg-cover cursor-pointer"
          style={{ backgroundImage: `url(${Product1})` }}
        >
          <Link to={"/all-products?category=Hoodie"}>
            <div className="absolute inset-0 bg-black opacity-30 hover:opacity-10"></div>
            <div
              className="absolute bottom-14 left-8 text-white text-2xl font-semibold"
              data-aos="flip-left"
            >
              <p>Hoodie</p>
            </div>
          </Link>
        </div>

        {/* Center Section */}
        <div
          className="relative lg:col-span-3 col-span-1 bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url(${Centerimage})` }}
        >
          <Link to={"/all-products?category=Shirt"}>
            <div className="absolute inset-0 bg-black opacity-30 hover:opacity-10"></div>
            <div className="flex justify-end mr-10">
              <div
                className="absolute flex flex-col justify-center items-end  text-white h-full"
                data-aos="flip-left"
              >
                <p className="text-3xl font-semibold text-end">All</p>
                <p className="text-6xl font-bold mt-2 ">Products</p>
                <hr className="w-36 border-t-2" />
              </div>
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div
          className="relative col-span-1 bg-cover cursor-pointer"
          style={{ backgroundImage: `url(${Product2})` }}
        >
          <Link to={"/all-products?category=T-Shirt"}>
            <div className="absolute inset-0 bg-black opacity-30 hover:opacity-10"></div>
            <div
              className="absolute bottom-14 left-8 text-white text-2xl text-center font-semibold"
              data-aos="flip-left"
            >
              <p>T-shirts</p>
            </div>
          </Link>
        </div>
      </div>

      <div style={{minHeight:'100vh'}} className="relative 2xl:h-[700px]  max-w[1440px] w-full mx-auto bg-cover max-sm:bg-center">
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
        <div style={{minHeight:'100vh'}} className="relative flex flex-col items-center justify-center h-full text-center text-white pb-10">
          <h4 className="md:text-xl text-lg font-normal uppercase mb-4">
            Wear your story, every day
          </h4>
          <h1 className="md:text-6xl text-4xl font-bold mb-6 ">
            Where style meets comfort
          </h1>
        </div>
      </div>
    </>
  );
};

export default TrendingSection;
