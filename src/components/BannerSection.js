import React from "react";
import Tshirtbanner from "../images/tshirtbanner.png";
import Hoodiebanner from "../images/hoodiebanner.png";

const BannerSection = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="md:text-9xl text-6xl font-black my-6 max-sm:mx-2 text-center">
        SHOP NOW
      </h1>
      <img src={Tshirtbanner} alt="tshirt" className="md:w-2/3" />
      <img src={Hoodiebanner} alt="hoodie" className="md:w-2/3" />
    </div>
  );
};

export default BannerSection;
