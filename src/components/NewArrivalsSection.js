import React from "react";
import Product1 from "../images/product1.jpeg";
import Product2 from "../images/imgproduct2.jpeg";
import Product3 from "../images/product3.jpeg";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

// Component for Star Ratings
const StarRating = () => {
  return (
    <div className="flex space-x-1">
      {Array(5)
        .fill()
        .map((_, index) => (
          <svg
            key={index}
            className="w-4 h-4 text-teal-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
    </div>
  );
};

// Component for Individual Product Card
const ProductCard = ({ image, title, price }) => {
  return (
    <div className="flex flex-col items-start p-4" data-aos="flip-right">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-52 md:h-64 object-cover mb-2"
        />
        <span className="absolute top-2 left-2 bg-[#263238] text-white text-xs font-semibold px-2 py-1">
          SALE
        </span>
      </div>
      <StarRating />
      <p className="mt-2">{title}</p>
      <p className="font-bold">{price}</p>
    </div>
  );
};

// Main Component
const NewArrivalsSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const products = [
    { image: Product1, title: "Cras convallis lacus", price: "₹90.00" },
    { image: Product2, title: "Cras convallis lacus", price: "₹90.00" },
    { image: Product3, title: "Cras convallis lacus", price: "₹90.00" },
    { image: Product1, title: "Cras convallis lacus", price: "₹90.00" },
  ];

  return (
    <section className="md:flex gap-8 lg:p-8 mt-72 md:mx-10">
      {/* Left Text Section */}
      <div className="w-full md:w-1/3 p-4 text-center md:text-start">
        <h2 className="text-4xl font-bold text-gray-800" data-aos="fade-right">
          New
          <span className="block bg-[#6D4C41]  text-white px-2 py-1">
            Arrivals
          </span>
        </h2>
        <p className="mt-10 text-gray-600" data-aos="fade-up">
          Cras convallis lacus orci, tristique tincidunt magna consequat in. In
          vel pulvinar est, at euismod libero.
        </p>
      </div>

      {/* Right Product Cards Section */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
