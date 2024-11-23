import React, { useState } from "react";
import Blacklogo from "../../images/starringblack.png";
import { Link } from "react-router-dom";

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="px-4 py-10 flex justify-between items-center font-beatrice bg-gray-100">
      <button onClick={toggleMenu} className="md:hidden">
        <svg
          width="28"
          height="18"
          viewBox="0 0 28 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 1L1 1"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M19 9L1 9"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M14 17H1"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="flex items-center space-x-4 md:space-x-8">
        <nav className="hidden md:flex space-x-4 md:space-x-8 font-medium text-sm">
          <a href="/" className="text-gray-600 hover:text-black">
            Home
          </a>
          <a href="/all-products" className="text-gray-600 hover:text-black">
            Collections
          </a>
          <a href="/all-products" className="text-gray-600 hover:text-black">
            New
          </a>
        </nav>
      </div>

      <div className="max-w-[200px] px-2">
        <img src={Blacklogo} alt="logoimg" />
      </div>

      <div className="flex space-x-4 md:space-x-8 items-center">
        <Link to="/favourites">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="black" />
            <path
              d="M27.8059 30.6955L27.7597 29.9469L27.8059 30.6955ZM22.3327 20.8256L22.2762 21.5735C22.4795 21.5888 22.6803 21.5207 22.8323 21.3849C22.9844 21.2491 23.0746 21.0572 23.0822 20.8535L22.3327 20.8256ZM31.5254 27.3727L32.264 27.5027L31.5254 27.3727ZM27.7597 29.9469C26.1685 30.045 24.5344 30.2352 22.9356 30.0497C21.3752 29.8687 19.933 29.3338 18.7594 28.02L17.6408 29.0193C19.1263 30.6822 20.9523 31.3297 22.7627 31.5398C24.5347 31.7453 26.3739 31.5352 27.852 31.4441L27.7597 29.9469ZM18.7594 28.02C17.6168 26.741 17.3858 25.028 17.9646 23.7069C18.5225 22.4335 19.8968 21.3937 22.2762 21.5735L22.3892 20.0777C19.4577 19.8563 17.4361 21.1753 16.5907 23.105C15.7661 24.9871 16.1242 27.3217 17.6408 29.0193L18.7594 28.02ZM27.852 31.4441C28.3848 31.4112 28.9662 31.3738 29.4961 31.2662C30.0257 31.1587 30.5862 30.9664 31.0342 30.5662L30.0349 29.4475C29.8709 29.5941 29.6086 29.7128 29.1976 29.7962C28.7869 29.8796 28.3101 29.913 27.7597 29.9469L27.852 31.4441ZM32.264 27.5027C32.5206 26.0441 32.936 24.2402 32.9307 22.4563C32.9254 20.6338 32.4871 18.7466 31.0016 17.0837L29.8829 18.083C31.0566 19.3968 31.4261 20.8899 31.4307 22.4607C31.4355 24.0703 31.0629 25.6727 30.7867 27.2428L32.264 27.5027ZM31.0016 17.0837C29.4851 15.3861 27.2054 14.768 25.2426 15.3759C23.2301 15.9993 21.6924 17.86 21.5832 20.7977L23.0822 20.8535C23.1708 18.4689 24.3584 17.2201 25.6864 16.8088C27.0641 16.382 28.7403 16.8039 29.8829 18.083L31.0016 17.0837ZM30.7867 27.2428C30.6912 27.7858 30.6044 28.256 30.4754 28.6547C30.3464 29.0537 30.199 29.3009 30.0349 29.4475L31.0342 30.5662C31.4823 30.1659 31.7363 29.6305 31.9026 29.1163C32.069 28.6019 32.1716 28.0284 32.264 27.5027L30.7867 27.2428Z"
              fill="white"
            />
          </svg>
        </Link>

        <div className="flex">
          <Link to="/shopping-cart">
            <button className="bg-black text-white px-4 md:px-5 py-4 items-center rounded-full hover:text-gray-400 font-medium text-sm hidden lg:block">
              Cart
            </button>
          </Link>
          <button className="relative">
            <Link to="/shopping-cart">
              <svg
                width="51"
                height="50"
                viewBox="0 0 51 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="25.6665" cy="25" r="25" fill="black" />
                <circle cx="25.6665" cy="24.999" r="18.5185" fill="white" />
                <path
                  d="M19.5829 30.8256C20.515 32 22.25 32 25.7198 32H26.2802C29.75 32 31.485 32 32.4171 30.8256M19.5829 30.8256C18.6507 29.6511 18.9704 27.8681 19.6099 24.3021C20.0646 21.7662 20.292 20.4982 21.1552 19.7491M19.5829 30.8256C19.5829 30.8256 19.5829 30.8256 19.5829 30.8256ZM32.4171 30.8256C33.3493 29.6511 33.0296 27.8681 32.3901 24.3021C31.9354 21.7662 31.708 20.4982 30.8448 19.7491M32.4171 30.8256C32.4171 30.8256 32.4171 30.8256 32.4171 30.8256ZM30.8448 19.7491C29.9816 19 28.7478 19 26.2802 19H25.7198C23.2522 19 22.0184 19 21.1552 19.7491M30.8448 19.7491C30.8448 19.7491 30.8448 19.7491 30.8448 19.7491ZM21.1552 19.7491C21.1552 19.7491 21.1552 19.7491 21.1552 19.7491Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M24 22C24.2911 23.1652 25.0766 24 26 24C26.9234 24 27.7089 23.1652 28 22"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </button>
        </div>
        <Link to="/user-account">
          <button>
            <svg
              width="51"
              height="50"
              viewBox="0 0 51 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="25.2593" cy="25" r="25" fill="black" />
              <circle
                cx="25.0001"
                cy="22.4286"
                r="3.42857"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M31 31.8583C31 29.9647 28.3137 28.4297 25 28.4297C21.6863 28.4297 19 29.9647 19 31.8583"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </Link>
      </div>

      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col items-center space-y-4 p-4">
            <a href="/" className="text-gray-600 hover:text-black">
              Home
            </a>
            <a href="/" className="text-gray-600 hover:text-black">
              Collections
            </a>
            <a href="/" className="text-gray-600 hover:text-black">
              New
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Topbar;
