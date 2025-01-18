import React, { useState, useEffect, useRef } from "react";
import BackgroundVideoSrc1 from "../videos/starringherosection.mp4";
import WhiteLogo from "../images/starringwhite.png";
import SaleImage from "../images/homepagesalephoto.png";
import { IoArrowBack } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import "aos/dist/aos.css";
import Aos from "aos";
import { Link } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import {
  getUserNotifications,
  salesOverviewSave,
  clearNotificationsUser,
  getCartDetails
} from "../api/user";

import MetaTags from "./common/MetaTags";
import NewArrivalsSection from "./NewArrivalsSection";
import TrendingSection from "./TrendingSection";
import BannerSection from "./BannerSection";
import FeatureSection from "./FeatureSection";
import FooterSection from "./FooterSection";
import OurStory from "./OurStory";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
const HeroSection = (props) => {
  const [activeItem, setActiveItem] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const [cartCount,SetCartCount] = useState(0);
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Create a ref for the menu to detect outside clicks
  const menuRef = useRef(null);

  useEffect(() => {
    // Initialize AOS animation library
    Aos.init({ duration: 1000 });

    salesOverview();

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

  const salesOverview = async () => {
    const res = await salesOverviewSave("google");
  };

  const handleNavClick = (item) => {
    setActiveItem(item);
    setMenuOpen(false); // Close the menu when a nav item is clicked
  };

  const fetchUserNotifications = async () => {
    try {
      const res = await getUserNotifications();
      if (res.status === 200) {
        setNotifications(res.data.detail.data);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const clearNotifications = async () => {
    try {
      const res = await clearNotificationsUser();
      if (res.status === 200) {
        setNotifications([]);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleNotificationDropdown = () => {
    fetchUserNotifications();
    setIsNotificationOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setIsNotificationOpen(false);
    }
  };

  useEffect(() => {
    if(localStorage.getItem('userToken')){
      getCartCount();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function getCartCount(){
    const res = await getCartDetails();
    SetCartCount(res.data.detail.total);
  }

  const metaData = {
    title: "Home",
    desc: "Discover Starring: Clothing designed to live with you, blending comfort, style, and durability for every moment of your life.",
  };

  return (
    <>
      <MetaTags data={metaData} />
      <div className="relative " id={props.id}>
        <div className="fixed top-0 h-screen w-full z-0">
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
        </div>
        <div className="relative  top-0 bg-transparent h-screen z-10 ">
          {/* Mobile Navigation Button (Hamburger Icon) */}
          <div className="relative">
            <div className="flex items-center justify-between px-4 pt-5 bg-transparent absolute z-10 w-full">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white text-2xl"
              >
                {menuOpen ? <FaTimes size={32} /> : <FaBars size={32} />}
              </button>

              <img src={WhiteLogo} alt="Logo" className="w-[150px] home-logo" />

              <div className="flex space-x-2 md:space-x-5 relative">
                <div className="relative">
                  {searchActive ? (
                    <input
                      type="text"
                      className="absolute max-md:top-10 right-0 p-2 border border-gray-300 rounded-md focus:outline-none bg-white"
                      placeholder="Search..."
                      autoFocus
                      onBlur={() => setSearchActive(false)} // Close input when it loses focus
                    />
                  ) : (
                    <FaSearch
                      className="text-white cursor-pointer"
                      size={window.innerWidth <= 768 ? 25 : 32}
                      onClick={() => setSearchActive(true)}
                    />
                  )}
                </div>
                <div className="relative hidden sm:block" ref={notificationRef}>
                  <IoNotifications
                    onClick={toggleNotificationDropdown}
                    className="text-white cursor-pointer"
                    size={window.innerWidth <= 768 ? 25 : 32}
                  />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs">
                      {notifications.length}
                    </span>
                  )}
                  {isNotificationOpen && (
                    <div className="fixed right-2 mt-2 w-[350px] bg-white border border-gray-300 shadow-lg z-50 h-[90vh] overflow-scroll">
                      <div className="p-4">
                        <h4 className="font-bold text-sm sm:text-lg mb-2">
                          Notifications
                        </h4>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearNotifications}
                            className="mb-4 text-sm text-blue-500 hover:underline"
                          >
                            Clear Notifications
                          </button>
                        )}
                        <ul className="h-full overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                              <li
                                key={index}
                                className="px-4 py-6 cursor-pointer border-b border-gray-300 hover:bg-gray-100"
                              >
                                <p>{notification.message}</p>
                                {/* <p className="text-sm text-gray-500">
                                {new Date(
                                  notification.createdTime.$date
                                ).toLocaleString()}
                              </p> */}
                              </li>
                            ))
                          ) : (
                            <li className="px-4 py-2 text-gray-500 flex items-center justify-center">
                              No notifications
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <Link to="/shopping-cart" className=" relative">
                  <FaShoppingCart className="text-white" size={window.innerWidth <= 768 ? 25 : 32} />
                  <span className={"absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center "+(cartCount == 0 ? 'hidden':'')}>
                    {cartCount} {" "}
                  </span>
                </Link>

                <Link to="/favourites" className="">
                  <FaHeart className="text-white" size={window.innerWidth <= 768 ? 25 : 32} />
                </Link>
                <Link to="/user-login" className="hidden sm:block">
                  <FaRegUserCircle
                    className="text-white"
                    size={window.innerWidth <= 768 ? 25 : 32}
                  />
                </Link>
              </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <nav
                ref={menuRef}
                className="absolute top-14 left-0 w-full bg-[#263238] text-white p-4 z-20 flex flex-col"
              >
                {/* <a
                href="#home"
                onClick={() => {
                  handleNavClick("Home");
                  handleScroll("home");
                }}
                className={`py-2 text-lg border-b border-gray-700 ${activeItem === "Home" ? "text-green-200" : "text-white"
                  } hover:text-gray-400`}
              >
                Home
              </a> */}

                <a
                  href="#new-arrivals"
                  onClick={() => handleNavClick("All New")}
                  className={`py-2 text-lg border-b border-gray-700 ${
                    activeItem === "All New" ? "text-green-200" : "text-white"
                  } hover:text-gray-400`}
                >
                  All New
                </a>

                <a
                  href="#trending"
                  onClick={() => handleNavClick("Categories")}
                  className={`py-2 text-lg border-b border-gray-700 ${
                    activeItem === "Categories"
                      ? "text-green-200"
                      : "text-white"
                  } hover:text-gray-400`}
                >
                  Categories
                </a>

                <a
                  href="#banner"
                  onClick={() => {
                    handleNavClick("Featured");
                    handleScroll("banner");
                  }}
                  className={`py-2 text-lg border-b border-gray-700 ${
                    activeItem === "Featured" ? "text-green-200" : "text-white"
                  } hover:text-gray-400`}
                >
                  Featured
                </a>

                <a
                  href="#features"
                  onClick={() => handleNavClick("Testimonials")}
                  className={`py-2 text-lg border-b border-gray-700 ${
                    activeItem === "Testimonials"
                      ? "text-green-200"
                      : "text-white"
                  } hover:text-gray-400`}
                >
                  Testimonials
                </a>

                <a
                  href="#footer"
                  onClick={() => handleNavClick("Footer")}
                  className={`py-2 text-lg border-b border-gray-700 ${
                    activeItem === "Footer" ? "text-green-200" : "text-white"
                  } hover:text-gray-400`}
                >
                  Endcap
                </a>
              </nav>
            )}
          </div>
          {/* Centered content */}
          <div className="relative flex flex-col items-center justify-center h-full text-center text-white pb-10">
            <h4 className="md:text-xl text-lg font-normal uppercase mb-4">
              Clothing that lives with you
            </h4>
            <h1 className="md:text-6xl text-5xl font-bold mb-6 max-sm:mx-2">
              Step into style, step into confidence.
            </h1>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Notifications</h2>
                <button
                  onClick={toggleModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                <ul>
                  {notifications.map((notification, index) => (
                    <li key={index} className="mb-2">
                      <p>{notification.message}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(
                          notification.createdTime.$date
                        ).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className=" bg-white">
            <OurStory />
            <NewArrivalsSection id="new-arrivals" />
            <TrendingSection id="trending" />
            {/* <BannerSection id="banner" />
            <FeatureSection id="features" /> */}
            <FooterSection id="footer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
