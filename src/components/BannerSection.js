import React from "react";
import Tshirtbanner from "../images/tshirt.png";
import Hoodiebanner from "../images/hoodie.png";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

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
        SHOP NOW
      </h1>
      <img
        src={Tshirtbanner}
        alt="tshirt"
        className="lg:w-1/3 w-2/3 mx-auto"
        data-aos="fade-up"
      />
      <img
        src={Hoodiebanner}
        alt="hoodie"
        className="lg:w-1/3 w-2/3 mx-auto"
        data-aos="fade-up"
      />
    </div>
  );
};

export default BannerSection;
