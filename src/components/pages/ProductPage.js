import React, { useState, useEffect } from "react";
import Mainproductimg from "../../images/mainproduct.jpeg";
import Slide2img from "../../images/slide2.jpeg";
import Slide3img from "../../images/slide3.jpeg";
import Slide4img from "../../images/slide4.jpeg";
import Slide5img from "../../images/slide5.jpeg";
import SimilarProduct1 from "../../images/imgproduct2.jpeg";
import SimilarProduct2 from "../../images/imgproduct4.jpeg";
import SimilarProduct3 from "../../images/imgproduct5.jpeg";
import SimilarProduct4 from "../../images/imgproduct6.jpeg";
import { Link, useSearchParams } from "react-router-dom";
import FrequentProduct1 from "../../images/product1.jpeg";
import FrequentProduct2 from "../../images/product3.jpeg";
import { getProductById } from "../../api/user";

const ProductPage = () => {
  // const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [params] = useSearchParams();
  const productKey = params.get('id');

  // const colors = [
  //   "#D9D9D9",
  //   "#A9A9A9",
  //   "black",
  //   "#FFFFFF",
  //   "#A6D6CA",
  //   "#B9C1E8",
  // ];
  // const availableColors = ["#D9D9D9", "black", "#A6D6CA"]; // Example available colors
  const description =
    "A 100% cotton tee with an embroidered tiger and screen-printed forest in bold orange and red. Luxurious, tactile, perfect for commanding attention with fierce elegance.";

  const sizes = ["XS", "S", "M", "L", "XL", "2X"];
  const availableSizes = ["S", "M", "L", "XL"];
  const originalPrice = 150; // Original price
  const offerPrice = 99; // Offer price
  const offerPercentage = Math.round(
    ((originalPrice - offerPrice) / originalPrice) * 100
  );
  const stock = 6;
  const imagesgrid = [
    Mainproductimg,
    Slide2img,
    Slide3img,
    Slide4img,
    Slide5img,
  ];
  const [selectedImage, setSelectedImage] = useState(0);

  const [isRed, setIsRed] = useState(false);

  const handleClick = () => {
    setIsRed((prev) => !prev); // Toggle between red and white
  };

  const similarProducts = [
    {
      id: 1,
      image: SimilarProduct1,
      name: "Similar Product 1",
      originalPrice: 180,
      offerPrice: 89,
    },
    {
      id: 2,
      image: SimilarProduct2,
      name: "Similar Product 2",
      originalPrice: 200,
      offerPrice: 99,
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
  ];
  const starRating = 3.3;

  const frequentlyBoughtProducts = [
    {
      id: 1,
      image: FrequentProduct2,
      name: "Combo Product 1",
      originalPrice: 180,
      offerPrice: 79,
    },
    {
      id: 2,
      image: FrequentProduct1,
      name: "Combo Product 2",
      originalPrice: 200,
      offerPrice: 99,
    },
  ];
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  useEffect(() => {
    getProductById(productKey).then((res) => {
      console.log(res);
    })
  }, [])

  return (
    <section className="bg-gray-100 font-beatrice max-w-[1440px] mx-auto w-full">
      <div className="w-full md:px-10  px-4">
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
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="md:flex items-center justify-center lg:px-32 p-4 pt-10">
        <div className="grid grid-cols-5 gap-4 max-w-4xl md:w-1/2 max-h-[600px] md:p-4 pb-4">
          <div className="col-span-4">
            <img
              src={imagesgrid[selectedImage]}
              alt="Main Product"
              className="w-full h-[560px] object-cover"
            />
          </div>

          <div className="flex flex-col space-y-4">
            {imagesgrid.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-[100px] object-cover border border-gray-200 cursor-pointer ${
                  selectedImage === index ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="lg:max-w-[380px] md:w-1/2 px-10 border-2 relative">
          <button
            className="absolute top-0 right-0"
            onClick={handleClick}
            style={{
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isRed ? "red" : "white"}
              stroke="black"
              strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "rotate(-40deg)" }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <h2 className="md:text-2xl text-xl font-semibold pt-10">
            ABSTRACT PRINT SHIRT
          </h2>
          <div className="flex items-center space-x-2">
            <p className="text-sm line-through text-gray-500">
              Rs.{originalPrice}
            </p>
            <p className="text-lg font-bold">Rs.{offerPrice}</p>

            <p className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 inline-block rounded-full">
              {offerPercentage}% OFF
            </p>
            <div className="flex">
              {starRating}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-yellow-500"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>

          {stock < 9 && (
            <p className="text-sm text-red-600 pt-2">
              <strong>Hurry! Only {stock} left in stock.</strong>
            </p>
          )}

          <p className="text-sm text-gray-500">MRP incl. of all taxes</p>

          <p className="text-xs font-medium text-gray-600 py-5">
            Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.
          </p>

          <div className="py-5">
            <p>
              {description.length <= 30
                ? description
                : `${description.split(" ").slice(0, 30).join(" ")}`}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-light text-gray-600 mb-2">Size</h3>
            <div className="grid grid-cols-3 gap-5 md:grid-cols-6 md:gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    availableSizes.includes(size) && setSelectedSize(size)
                  }
                  disabled={!availableSizes.includes(size)}
                  className={`py-2 border ${
                    availableSizes.includes(size)
                      ? selectedSize === size
                        ? "border-black"
                        : "border-gray-300"
                      : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                  } hover:border-black ${
                    !availableSizes.includes(size)
                      ? "hover:border-gray-300"
                      : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 pb-3 underline">
            <Link to="/size-chart">FIND YOUR SIZE | MEASUREMENT GUIDE</Link>
          </p>
          <button className="bg-[#D9D9D9] text-black w-full py-3 mb-5 hover:bg-black hover:text-white">
            ADD
          </button>
        </div>
      </div>
      {/* frequently bought together */}
      <div>
        <div className="md:p-10 p-3 pb-10">
          <h3 className="text-lg font-semibold mb-4">
            Frequently Bought Together
          </h3>
          <div className="md:flex items-center md:space-x-5 max-sm:space-y-2">
            <div className="flex justify-between md:space-x-5">
              {frequentlyBoughtProducts.map((product, index) => {
                const offerPercentage = Math.round(
                  ((product.originalPrice - product.offerPrice) /
                    product.originalPrice) *
                    100
                );
                return (
                  <React.Fragment key={product.id}>
                    <div className="relative border p-4 rounded-lg shadow-md">
                      <input
                        type="checkbox"
                        className="absolute top-2 left-2"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleProductSelect(product.id)}
                      />
                      <Link to="/one-product" className="block">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-52 object-contain mb-4"
                        />
                        <h4 className="text-sm font-medium">{product.name}</h4>
                        <div className="flex items-center space-x-2 mt-2">
                          <p className="text-xs line-through text-gray-500">
                            Rs.{product.originalPrice}
                          </p>
                          <p className="md:text-lg text-sm font-medium">
                            Rs.{product.offerPrice}
                          </p>
                          <p className="text-yellow-600 text-xs md:font-medium font-normal">
                            {offerPercentage}% OFF
                          </p>
                        </div>
                      </Link>
                    </div>
                    {index < frequentlyBoughtProducts.length - 1 && (
                      <div className="flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-500">
                          +
                        </span>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div>
              <Link to="/Checkout" className="md:col-span-1 col-span-2">
                <button className="bg-[#D9D9D9] text-black w-full py-3 px-3 mb-5 h-14 rounded place-self-center hover:bg-black hover:text-white">
                  BUY ALL
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* products you may like */}

      <div>
        <div className="md:p-10 p-3 pb-10 ">
          <h3 className="text-lg font-semibold mb-4">Products You May Like</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 ">
            {similarProducts.map((product) => {
              const offerPercentage = Math.round(
                ((product.originalPrice - product.offerPrice) /
                  product.originalPrice) *
                  100
              );
              return (
                <Link to="/one-product" className="block">
                  <div
                    key={product.id}
                    className="border p-4 rounded-lg shadow-md"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-contain mb-4"
                    />
                    <h4 className="text-sm font-medium">{product.name}</h4>
                    <div className="flex items-center space-x-2 mt-2">
                      <p className="text-xs line-through text-gray-500">
                        Rs.{product.originalPrice}
                      </p>
                      <p className="md:text-lg text-sm font-medium">
                        Rs.{product.offerPrice}
                      </p>
                      <p className="text-yellow-600 text-xs md:font-medium font-normal">
                        {offerPercentage}% OFF
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-[#CFD8DC] h-10 flex justify-center items-center">
        <a href="https://callsharks.in/">Designed by callsharks.in</a>
      </div>
    </section>
  );
};

export default ProductPage;
