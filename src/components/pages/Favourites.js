import React, { useState } from "react";
import SimilarProduct1 from "../../images/imgproduct2.jpeg";
import SimilarProduct2 from "../../images/imgproduct4.jpeg";
import SimilarProduct3 from "../../images/imgproduct5.jpeg";
import SimilarProduct4 from "../../images/imgproduct6.jpeg";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [similarProducts, setSimilarProducts] = useState([
    {
      id: 1,
      image: SimilarProduct1,
      name: "Similar Product 1",
      originalPrice: 180,
      offerPrice: 129,
    },
    {
      id: 2,
      image: SimilarProduct2,
      name: "Similar Product 2",
      originalPrice: 200,
      offerPrice: 149,
    },
    {
      id: 3,
      image: SimilarProduct3,
      name: "Similar Product 3",
      originalPrice: 160,
      offerPrice: 119,
    },
    {
      id: 4,
      image: SimilarProduct4,
      name: "Similar Product 4",
      originalPrice: 170,
      offerPrice: 139,
    },
    {
      id: 5,
      image: SimilarProduct1,
      name: "Similar Product 5",
      originalPrice: 190,
      offerPrice: 139,
    },
    {
      id: 6,
      image: SimilarProduct2,
      name: "Similar Product 6",
      originalPrice: 210,
      offerPrice: 159,
    },
    {
      id: 7,
      image: SimilarProduct3,
      name: "Similar Product 7",
      originalPrice: 150,
      offerPrice: 109,
    },
  ]);

  const handleDelete = (id) => {
    setSimilarProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <div className="min-h-screen md:px-10 bg-gray-100 font-beatrice">
      <section className="max-w-screen md:px-10 px-4 pt-14 py-10">
        <Link to="/all-products">
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
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </section>
      <div>
        <div className="md:p-10 p-3 pb-10">
          <h3 className="text-2xl font-semibold mb-4">Favourites</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
            {similarProducts.map((product) => {
              const offerPercentage = Math.round(
                ((product.originalPrice - product.offerPrice) /
                  product.originalPrice) *
                  100
              );
              return (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg shadow-md relative"
                >
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="absolute right-0 top-0 w-5 h-5 text-gray-600 hover:text-red-600 focus:outline-none"
                  >
                    x
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  <div className="flex items-center md:space-x-2 space-x-1 mt-2">
                    <p className="text-xs line-through text-gray-500">
                      Rs.{product.originalPrice}
                    </p>
                    <p className="text-sm md:text-lg font-light">
                      Rs.{product.offerPrice}
                    </p>
                    <p className="text-yellow-600 text-xs md:font-medium font-light">
                      {offerPercentage}% OFF
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
