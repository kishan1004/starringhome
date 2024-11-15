import React from "react";
import Tshirtbanner from "../images/tshirtbanner.png";
import Hoodiebanner from "../images/hoodiebanner.png";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

const BannerSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1
        className="md:text-9xl text-6xl font-black my-6 max-sm:mx-2 text-center"
        data-aos="fade-down"
      >
        SHOP NOW
      </h1>
      <img
        src={Tshirtbanner}
        alt="tshirt"
        className="md:w-2/3"
        data-aos="fade-up"
      />
      <img
        src={Hoodiebanner}
        alt="hoodie"
        className="md:w-2/3"
        data-aos="fade-up"
      />
    </div>
  );
};

export default BannerSection;
