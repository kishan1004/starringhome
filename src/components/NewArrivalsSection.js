import React from "react";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { newarrivalProducts } from "../api/user";
import { useQuery } from "react-query";

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
const ProductCard = ({ image, title, price, id }) => {
  return (
    <div className="flex flex-col items-start p-4" data-aos="flip-right">
      <Link to={`/all-products`}>
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
      </Link>
      <StarRating />
      <Link to="/all-products">
        <p className="mt-2">{title}</p>
        <p className="font-bold">Rs. {price}</p>
      </Link>
    </div>
  );
};

// Main Component
const NewArrivalsSection = (props) => {
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["newArraival"],
    queryFn: () => newarrivalProducts(),
  });

  return (
    <section
      className="md:flex gap-8 lg:p-8 lg:mt-72 mt-96 md:mx-10"
      id={props.id}
    >
      {/* Left Text Section */}
      <div className="w-full md:w-1/3 p-4 text-center md:text-start">
        <h2 className="text-4xl font-bold text-gray-800" data-aos="fade-right">
          New
          <span className="block bg-[#6D4C41]  text-white px-2 py-1">
            Arrivals
          </span>
        </h2>
        <p className="mt-10 text-gray-600" data-aos="fade-up">
          Step into the season with our new arrivals, designed to keep you
          trendy and confident. Don't miss out on the styles that everyone's
          talking about!
        </p>
      </div>

      {/* Right Product Cards Section */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {products?.data.detail.data.map((product, index) => (
          <ProductCard
            key={product._id}
            image={product.photos[0]}
            title={product.name}
            price={product.price}
            id={product._id}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
