import React, { useState, useEffect, useRef } from "react";
import BackgroundVideoSrc1 from "../videos/starringherosection.mp4";
import WhiteLogo from "../images/starringwhite.png";
import SaleImage from "../images/homepagesalephoto.png";
import { IoArrowBack } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import "aos/dist/aos.css";
import Aos from "aos";

const HeroSection = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Create a ref for the menu to detect outside clicks
  const menuRef = useRef(null);

  useEffect(() => {
    // Initialize AOS animation library
    Aos.init({ duration: 1000 });

    // Add event listener for outside clicks
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Close menu if click is outside
      }
    };

    // Add event listener for click events
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (item) => {
    setActiveItem(item);
    setMenuOpen(false); // Close the menu when a nav item is clicked
  };

  return (
    <>
      <div className="relative h-screen w-screen bg-cover bg-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover grayscale"
        >
          <source src={BackgroundVideoSrc1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Mobile Navigation Button (Hamburger Icon) */}
        <div className="relative">
          <div className="lg:hidden flex items-center justify-between p-4 bg-transparent absolute z-10">
            <img src={WhiteLogo} alt="Logo" className="w-[150px]" />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <nav
              ref={menuRef} // Attach the ref to the menu element
              className="absolute top-0 left-0 w-full bg-[#263238] text-white p-4 z-20 flex flex-col"
            >
              {[
                "Home",
                "All New",
                "Categories",
                "Featured",
                "Testimonials",
                "Footer",
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => handleNavClick(item)}
                  className={`py-2 text-lg border-b border-gray-700 ${
                    activeItem === item ? "text-green-200" : "text-white"
                  } hover:text-gray-400`}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}

          {/* Desktop Navigation */}
          <div className="absolute lg:top-3 lg:left-10 top-2 left-2 hidden lg:flex space-x-10 items-center z-10">
            <img src={WhiteLogo} alt="Logo" className="w-[200px]" />
            <nav className="lg:flex justify-center lg:space-x-16 md:space-x-5">
              {[
                "Home",
                "All New",
                "Categories",
                "Featured",
                "Testimonials",
                "Footer",
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => handleNavClick(item)}
                  className={`transition-colors ${
                    activeItem === item ? "text-green-200" : "text-white"
                  } hover:text-gray-800`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Centered content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white pb-10">
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.5 0V42.5246L51.1003 22.9243L56 28L28 56L0 28L4.89984 23.1005L24.5 42.5246V0H31.5Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <div className="flex h-96 md:w-[80%] w-[90%] bg-[#D7CCC8] mx-auto absolute top-[90%] lg:top-[75%] left-[10%]">
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
