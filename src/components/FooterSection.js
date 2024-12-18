import React, { useState } from "react";
import Blacklogo from "../images/starringblack.png";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import Insta from "../images/instagram.png";
import Fbimg from "../images/facebook.png";
import Twitterimg from "../images/twitter.png";
import { Link } from "react-router-dom";
import ContactDrawer from "./ContactUsDrawer";
import { salesOverviewSave } from "../api/user";

const FooterSection = (props) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const [activeItem, setActiveItem] = useState("Home");
  const [showDrawer, setShowDrawer] = useState(false);
  const handleNavClick = (item) => {
    setActiveItem(item);
  };

  async function socialClick(platform){
    const res = await salesOverviewSave(platform)

  }

  return (
    <>
      <ContactDrawer
        isOpen={showDrawer}
        closeDrawer={() => {
          setShowDrawer(false);
        }}
      />
      <div className="p-6 text-center" id={props.id}>
        <img
          src={Blacklogo}
          alt="logo"
          className="w-[350px] mx-auto md:my-10"
          data-aos="fade-up"
          data-aos-duration="1000"
        />
        <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
        <div className="flex items-center justify-between border border-gray-300 max-w-lg mx-auto rounded-full">
          <input
            type="email"
            placeholder="     Enter your email here"
            className="w-full text-gray-600 placeholder-gray-500 focus:outline-none bg-[#FAFAFA]"
          />
          <button className="px-4 py-2 text-white rounded-full bg-black font-bold hover:text-gray-700">
            SUBSCRIBE
          </button>
        </div>
        <nav className="flex justify-center lg:space-x-16 md:space-x-7 mb-10 md:mt-20 mt-5 max-sm:flex-col max-sm:space-y-2">
          <a
            href="#hero"
            onClick={() => {
              handleNavClick("Home");
            }}
            className={`py-2 text-lg  ${
              activeItem === "Home"
                ? "text-[#6D4C41] border-b border-gray-700"
                : "text-[#263238]"
            } hover:text-gray-400`}
          >
            Home
          </a>

          <a
            href="#new-arrivals"
            onClick={() => handleNavClick("All New")}
            className={`py-2 text-lg  ${
              activeItem === "All New"
                ? "text-[#6D4C41] border-b border-gray-700"
                : "text-[#263238]"
            } hover:text-gray-400`}
          >
            All New
          </a>

          <a
            href="#trending"
            onClick={() => handleNavClick("Categories")}
            className={`py-2 text-lg  ${
              activeItem === "Categories"
                ? "text-[#6D4C41] border-b border-gray-700"
                : "text-[#263238]"
            } hover:text-gray-400`}
          >
            Categories
          </a>

          <a
            href="#banner"
            onClick={() => {
              handleNavClick("Featured");
            }}
            className={`py-2 text-lg  ${
              activeItem === "Featured"
                ? "text-[#6D4C41] border-b border-gray-700"
                : "text-[#263238]"
            } hover:text-gray-400`}
          >
            Featured
          </a>

          <Link
            to="/refund-policy"
            onClick={() => handleNavClick("Footer")}
            className={`py-2 text-lg ${
              activeItem === "Footer"
                ? "text-[#6D4C41] border-b border-gray-700"
                : "text-[#263238]"
            } hover:text-gray-400`}
          >
            Return & Exchange
          </Link>

          <a
            href="#features"
            onClick={() => {
              setShowDrawer(true);
            }}
            className={`py-2 text-lg  ${
              activeItem === "Testimonials"
                ? "text-[#6D4C41] border-b border-gray-700"
                : "text-[#263238]"
            } hover:text-gray-400`}
          >
            Contact Us
          </a>
        </nav>
        <div className="flex justify-center space-x-14 mb-8">
          <a
            href="https://www.instagram.com/starringindia/?igsh=ZGUzMzM3NWJiOQ%3D%3D"
            target="_blank"
            className="text-gray-400 hover:text-gray-600"
            data-aos="flip-left"
            data-aos-duration="1000"
            onClick={()=>socialClick('instagram')}
          >
            <img src={Insta} alt="instagram" className="h-10 w-10" />
          </a>
          <a
            href="/"
            className="text-gray-400 hover:text-gray-600"
            data-aos="flip-left"
            data-aos-duration="1000"
          >
            <img src={Twitterimg} alt="twitter" className="h-10 w-10" />
          </a>
          <a
            href="/"
            target="_blank"
            className="text-gray-400 hover:text-gray-600"
            data-aos="flip-left"
            data-aos-duration="1000"
            onClick={()=>socialClick('facebook')}
          >
            <img src={Fbimg} alt="facebook" className="h-10 w-10" />
          </a>
        </div>
      </div>
      <div className="bg-[#CFD8DC] h-10 flex justify-center items-center">
        <a href="https://callsharks.in/">Designed by callsharks.in</a>
      </div>
    </>
  );
};

export default FooterSection;
