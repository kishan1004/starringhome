import React from "react";
import Blacklogo from "../../images/starringblack.png";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center font-beatrice">
      <div className="w-screen md:px-10  px-4 pb-4">
        <Link to="/">
          <svg
            width="62"
            height="14"
            viewBox="0 0 62 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60.5 7H1M1 7L7 1M1 7L7 13"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <img
          src={Blacklogo}
          alt="Store Logo"
          className="w-[200px] mb-6 mx-auto"
        />
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to <span className="font-semibold">Starring Clothing</span>!
          We are your go-to destination for the latest trends in fashion. Our
          goal is to provide high-quality, stylish apparel that meets the needs
          of our diverse customers.
        </p>
        {/* <p className="text-lg text-gray-700 mb-4">
          We believe that fashion is more than just clothing—it’s a form of
          self-expression. Our carefully curated collections are designed to
          inspire and empower you to showcase your unique style.
        </p> */}
        <p className="text-lg text-gray-700 mb-6">
          Imagine the tale of a lone star wandering through the cosmos—quiet,
          patient, yet destined for a spectacular burst of light. It doesn't
          shout to be seen; it simply shines when the time is right,
          transforming the space around it with effortless glow. In the tale of
          your journey, every twist and turn revolves around you, the
          protagonist, the star of the narrative. Each interaction with other
          characters shapes not only their destinies but also your own, leaving
          an indelible mark on the world around you.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Introducing “Starring.”! We believe that clothing is more than just
          fabric and stitching, it’s a reflection of individuals who embrace
          their inner protagonist, to step into the spotlight with confidence
          and grace. Our pieces are designed not just to be worn but to elevate,
          to give every wearer the confidence to be the star of their own show.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Thank you for choosing Starring. We’re excited to be part of your
          style journey!
        </p>
        <p className="text-lg text-gray-700 text-center font-semibold">
          For any inquiries or assistance, don’t hesitate to{" "}
          <a href="/contact-us" className="text-blue-600 hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
