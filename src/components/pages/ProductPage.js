import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { addToCart, getProductById, addFavouriteProduct } from "../../api/user";
import { useMutation, useQuery } from "react-query";
import { getTestimonialApi, userProductsList } from "../../api/user";
import { Spin, Pagination } from "antd";
import Swal from "sweetalert2";

const ProductPage = () => {
  const [params] = useSearchParams();
  const productKey = params.get("id");
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const [allProductCurrentPage, setAllProductCurrentPage] = useState(1);
  const initialFilter = {
    sizes: "",
    categories: [],
    tags: [],
    collections: [],
    ratings: [],
    pricegt: 0,
    pricelt: 5000,
  };
  const {
    data: Allproducts,
    isLoading: AllProductsLoading,
    isError: AllProductsError,
  } = useQuery({
    queryKey: ["allproducts", { allProductCurrentPage }],
    queryFn: () => userProductsList(allProductCurrentPage, "", initialFilter),
  });

  const {
    data,
    isLoading,
    isError,
    refetch: refetchProduct,
  } = useQuery({
    queryKey: ["individualProduct", { productKey }],
    queryFn: () => getProductById(productKey),
    enabled: !!productKey,
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getTestimonialApi(),
  });

  let product = isError ? false : data?.data?.detail;

  const addtoCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (res) => {
      Swal.fire("Success", "Product Added to Cart", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error[0].msg, "error");
      console.log(error);
    },
  });

  const addtoFavMutation = useMutation({
    mutationFn: addFavouriteProduct,
    onSuccess: (res) => {
      refetchProduct();
      Swal.fire("Success", "Product Added to Favourite", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error[0].msg, "error");
      console.log(error);
    },
  });

  const handleAddFav = (id) => {
    if (!localStorage.getItem("userToken")) {
      navigate("/user-login");
      return;
    }
    const data = {
      productId: [product._id],
      action: "ADD",
    };
    addtoFavMutation.mutate({ data });
  };

  const handleAddToCart = () => {
    if (!localStorage.getItem("userToken")) {
      navigate("/user-login");
      return;
    }
    const data = {
      productId: [product._id],
      action: "ADD",
    };
    addtoCartMutation.mutate({ data });
  };


  const allSizes = ["XS", "S", "M", "L", "XL", "2X"];

  const handleBuyAll = () => {};

  return (
    <section className="bg-gray-100 font-beatrice max-w-[1440px] mx-auto w-full">
      <div className="w-full md:px-10 px-4">
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
      </div>
      {/* product view */}
      {product ? (
        <div className="md:flex items-center justify-center lg:px-32 p-4 pt-10">
          <div className="grid grid-cols-5 gap-4 max-w-4xl md:w-1/2 max-h-[600px] md:p-4 pb-4">
            <div className="col-span-4">
              <img
                src={product.photos[selectedImage]}
                alt="Main Product"
                className="w-full h-[560px] object-cover"
              />
            </div>

            <div className="flex flex-col space-y-4">
              {product.photos.map((image, index) => (
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
              onClick={() => handleAddFav()}
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
                fill={product.isFavo ? "red" : "white"}
                stroke="black"
                strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "rotate(-40deg)" }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
            <h2 className="md:text-2xl text-xl font-semibold pt-10">
              {product.name}
            </h2>
            <div className="flex items-center space-x-2">
              <p className="text-sm line-through text-gray-500">
                Rs.{product.price}
              </p>
              <p className="text-lg font-bold">Rs.{product.offerPrice}</p>

              <p className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 inline-block rounded-full">
                {product.offerPercentage}% OFF
              </p>
              <div className="flex">
                {product.rating}
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

            {product.stockCount < 9 && (
              <p className="text-sm text-red-600 pt-2">
                <strong>Hurry! Only {product.stockCount} left in stock.</strong>
              </p>
            )}

            <p className="text-sm text-gray-500">MRP incl. of all taxes</p>

            <p className="text-xs font-medium text-gray-600 py-5">
              {product.description}
            </p>

            <div className="mb-6">
              <h3 className="text-xs font-light text-gray-600 mb-2">
                Select Size on Checkout
              </h3>
              <div className="grid grid-cols-3 gap-5 md:grid-cols-6 md:gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    disabled={!product.sizes.includes(size)}
                    className={`py-2 border border-black cursor-default ${
                      !product.sizes.includes(size) &&
                      "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
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
            <button
              className="bg-[#D9D9D9] text-black w-full py-3 mb-5 hover:bg-black hover:text-white"
              onClick={handleAddToCart}
            >
              ADD
            </button>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center">
          <Spin spinning={true} />
        </div>
      ) : (
        isError && (
          <div className="flex justify-center items-center">
            Product Not found
          </div>
        )
      )}

      {/* combo     */}
      <div>
        <div className="md:p-10 p-3 pb-10 grid lg:grid-cols-2 grid-cols-1 gap-2">
          {/* frequently bought together */}
          {product && product?.isComboAvailable && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Frequently Bought Together
              </h3>
              <div className="md:flex items-start md:space-x-5 max-sm:space-y-2">
                {/* Products */}
                <div className="flex justify-between md:space-x-5">
                  {product.comboProducts.map((product, index) => {
                    return (
                      <React.Fragment key={product._id}>
                        <div className="relative border p-4 rounded-lg shadow-md">
                          <Link to={`/one-product?id=${product._id}`} className="block">
                            <img
                              src={product.photos[0]}
                              alt={product.name}
                              className="w-full h-52 object-contain mb-4"
                            />
                            <h4 className="text-sm font-medium">
                              {product.name}
                            </h4>
                            <div className="flex items-center space-x-2 mt-2">
                              <p className="text-xs line-through text-gray-500">
                                Rs.{product.price}
                              </p>
                              <p className="md:text-lg text-sm font-medium">
                                Rs.{product.offerPrice}
                              </p>
                              <p className="text-yellow-600 text-xs md:font-medium font-normal">
                                {product.offerPercentage}% OFF
                              </p>
                            </div>
                          </Link>
                        </div>
                        {index === 0 && (
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
                  <Link to={`/checkout?type=${'combo'}&productId=${productKey}`} className="md:col-span-1 col-span-2">
                    <button
                      className="bg-[#D9D9D9] text-black w-full py-3 px-3 mb-5 h-14 rounded place-self-center hover:bg-black hover:text-white"
                    >
                      BUY ALL
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials */}
          <div>
            <h3 className="text-lg font-semibold mb-4 mt-2">Testimonials</h3>

            <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-2 lg:grid-cols-1 gap-4">
              {reviews?.data.detail.data
                .slice(0, 5)
                .map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md border"
                  >
                    <p className="text-sm italic text-gray-600">
                      "{testimonial.review}" - {testimonial.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* products you may like */}
      <div>
        <div className="md:p-10 p-3 pb-10 ">
          <h3 className="text-lg font-semibold mb-4">Products You May Like</h3>
          {AllProductsLoading ? (
            <div className="h-40 flex justify-center items-center">
              <Spin spinning={true} />{" "}
            </div>
          ) : AllProductsError ? (
            <div className="h-40 flex justify-center items-center">
              Products Error
            </div>
          ) : Allproducts?.data.detail.total === 0 ? (
            <div className="h-40 flex justify-center items-center">
              No Products found
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 ">
                {Allproducts.data.detail.data.map((product) => {
                  return (
                    <Link
                      to={`/one-product?id=${product._id}`}
                      className="block"
                    >
                      <div
                        key={product._id}
                        className="border p-4 rounded-lg shadow-md"
                      >
                        <img
                          src={product.photos[0]}
                          alt={product.name}
                          className="w-full h-64 object-contain mb-4"
                        />
                        <h4 className="text-sm font-medium">{product.name}</h4>
                        <div className="flex items-center space-x-2 mt-2">
                          <p className="text-xs line-through text-gray-500">
                            Rs.{product.price}
                          </p>
                          <p className="md:text-lg text-sm font-medium">
                            Rs.{product.offerPrice}
                          </p>
                          <p className="text-yellow-600 text-xs md:font-medium font-normal">
                            {product.offerPercentage}% OFF
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className=" flex justify-center pt-10 pb-5 px-5">
                <Pagination
                  value={allProductCurrentPage}
                  onChange={(value) => {
                    setAllProductCurrentPage(value);
                  }}
                  total={Allproducts.data.detail.total}
                  hideOnSinglePage
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="bg-[#CFD8DC] h-10 flex justify-center items-center">
        <a href="https://callsharks.in/">Designed by callsharks.in</a>
      </div>
    </section>
  );
};

export default ProductPage;
