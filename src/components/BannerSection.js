import React from "react";
import Tshirtbanner from "../images/tshirt.png";
import Hoodiebanner from "../images/hoodie.png";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BannerSection = (props) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="flex flex-col items-center" id={props.id}>
      <h1
        className="md:text-9xl text-6xl font-black my-6 max-sm:mx-2 text-center"
        data-aos="fade-down"
      >
        <Link to="/all-products">SHOP NOW</Link>
      </h1>
      <Link to="/all-products" className="lg:w-1/3 w-2/3 mx-auto">
        <img src={Tshirtbanner} alt="tshirt" data-aos="fade-up" />
      </Link>

      <Link to="/all-products" className="lg:w-1/3 w-2/3 mx-auto">
        <img src={Hoodiebanner} alt="hoodie" data-aos="fade-up" />
      </Link>
    </div>
  );
};

export default BannerSection;
