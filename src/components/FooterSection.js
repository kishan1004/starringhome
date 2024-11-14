import React, { useState } from "react";
import Blacklogo from "../images/starringblack.png";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

const FooterSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const [activeItem, setActiveItem] = useState("Home");

  const handleNavClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div className="p-6 text-center">
        <img
          src={Blacklogo}
          alt="logo"
          className="w-[350px] mx-auto md:my-10"
          data-aos="flip-up"
        />
        <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
        <div className="flex items-center justify-between border-b border-gray-300 max-w-lg mx-auto py-2">
          <input
            type="email"
            placeholder="Enter your email here"
            className="w-full text-gray-600 placeholder-gray-500 focus:outline-none bg-[#FAFAFA]"
          />
          <button className="ml-4 text-black font-bold hover:text-gray-700">
            SUBSCRIBE
          </button>
        </div>
        <nav className="flex justify-center lg:space-x-16 md:space-x-7 mb-10 md:mt-20 mt-5 max-sm:flex-col max-sm:space-y-2">
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
                activeItem === item ? "text-[#6D4C41]" : "text-gray-500"
              } hover:text-gray-800`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex justify-center space-x-14 mb-8">
          <a
            href="/"
            className="text-gray-400 hover:text-gray-600"
            data-aos="flip-left"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="70" height="70" fill="#CFD8DC" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M39.3333 26.6667V21.7057C39.3333 19.4661 39.8479 18.3333 43.4635 18.3333H48V10H40.4302C31.1542 10 28.0938 14.0885 28.0938 21.1068V26.6667H22V35H28.0938V60H39.3333V35H46.9708L48 26.6667H39.3333Z"
                fill="#546E7A"
              />
            </svg>
          </a>
          <a
            href="/"
            className="text-gray-400 hover:text-gray-600"
            data-aos="flip-left"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="70" height="70" fill="#CFD8DC" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M57 23.7917C55.5251 24.4333 53.9485 24.8667 52.2871 25.0667C53.9824 24.0667 55.2878 22.4833 55.8981 20.6C54.313 21.525 52.5584 22.2 50.6851 22.5583C49.1848 20.9833 47.0487 20 44.6923 20C40.1574 20 36.4872 23.6167 36.4872 28.075C36.4872 28.7083 36.555 29.325 36.6991 29.9167C29.8756 29.5833 23.8235 26.3667 19.7803 21.475C19.0767 22.6667 18.6698 24.0583 18.6698 25.5333C18.6698 28.3333 20.1278 30.8083 22.3316 32.2583C20.9754 32.225 19.704 31.8583 18.602 31.25C18.602 31.2833 18.602 31.3167 18.602 31.35C18.602 35.2667 21.4331 38.525 25.1882 39.2667C24.5016 39.45 23.7726 39.55 23.0267 39.55C22.5012 39.55 21.9841 39.5 21.484 39.4C22.5266 42.6083 25.5611 44.9417 29.1551 45.0083C26.3494 47.175 22.8063 48.4667 18.958 48.4667C18.2969 48.4667 17.6442 48.425 17 48.35C20.6194 50.6667 24.9339 52 29.562 52C44.6754 52 52.9313 39.6917 52.9313 29.0167C52.9313 28.6667 52.9229 28.3167 52.9059 27.975C54.5079 26.8333 55.8981 25.4167 57 23.7917Z"
                fill="#546E7A"
              />
            </svg>
          </a>
          <a
            href="/"
            className="text-gray-400 hover:text-gray-600"
            data-aos="flip-left"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="70" height="70" fill="#CFD8DC" />
              <circle cx="35.5" cy="36" r="7" fill="#546E7A" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.2548 28.6761C31.068 26.8629 33.4787 25.8537 36.043 25.8537C38.6072 25.8537 41.0179 26.8683 42.8311 28.6815C43.9816 29.8319 44.8035 31.2144 45.251 32.7573H52.4573V23.0715C52.4573 20.7993 50.701 19.043 48.4287 19.043H23.743C21.4707 19.043 19.543 20.7993 19.543 23.0715V32.7573H26.8349C27.2825 31.2144 28.1044 29.8266 29.2548 28.6761ZM49.7144 26.1744C49.7144 26.7803 49.2233 27.2715 48.6173 27.2715H45.3258C44.7199 27.2715 44.2287 26.7804 44.2287 26.1744V22.883C44.2287 22.2771 44.7198 21.7858 45.3258 21.7858H48.6173C49.2232 21.7858 49.7144 22.277 49.7144 22.883V26.1744Z"
                fill="#546E7A"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M42.8311 42.2525C41.0179 44.0657 38.6072 45.0535 36.043 45.0535C33.4787 45.0535 31.068 44.0711 29.2548 42.2579C27.445 40.448 26.4469 37.9857 26.4431 35.5H19.543V47.7571C19.543 50.0294 21.4707 51.9571 23.743 51.9571H48.4287C50.701 51.9571 52.4573 50.0294 52.4573 47.7571V35.5H45.6428C45.6391 37.9857 44.6411 40.4426 42.8311 42.2525Z"
                fill="#546E7A"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="bg-[#CFD8DC] max-w-screen h-10 flex justify-center items-center">
        <p>@ Luxi Theme 2019</p>
      </div>
    </>
  );
};

export default FooterSection;
