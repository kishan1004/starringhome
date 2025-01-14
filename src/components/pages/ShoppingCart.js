import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartDetails, addToCart } from "../../api/user";
import { useQuery } from "react-query";
import { Spin } from "antd";
import UserProtectLayout from "../common/UserProtectLayout";
import MetaTags from "../common/MetaTags";

const ShoppingCart = () => {
  const navigate = useNavigate();

  const {
    data: getCartProducts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["AllCart"],
    queryFn: () => getCartDetails(),
  });

  const handleDelete = (id) => {
    const data = {
      productId: id,
      action: "REMOVE",
    };

    addToCart({ data: data }).then((res) => {
      if (res?.status === 401) {
        navigate("/user-login");
        return;
      }
      refetch();
    });
  };
  const metaData = {
    title:"Shopping Cart",desc:"Review your selections in the Starring Shopping Cart."
  }

  return (
    <UserProtectLayout>
            <MetaTags data={metaData}/>
      
    <section className="bg-gray-100 font-sans min-h-screen">
      {/* Top Navigation */}
      

      {/* Shopping Cart Header */}
      <div className="px-4 md:px-10">
        <h1 className="text-lg font-bold">Shopping Bag</h1>
        <div className="border-t border-gray-300 my-4"></div>
      </div>

      {isLoading ? (
        <div className=" flex h-40 justify-center items-center">
          <Spin spinning={true} />
        </div>
      ) : isError ? (
        <div className=" flex h-40 justify-center items-center">
          Error try after sometime
        </div>
      ) : (
        <div className="px-4 md:px-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <div className={`p-10 ${getCartProducts?.data.detail.total !== 0 ? "hidden" : "block"}`}>
            Products Not added yet!
          </div>
          {getCartProducts?.data.detail.data.map((product) => (
            <div
              key={product._id}
              className="flex items-center p-4 bg-white shadow-md mb-4 rounded-lg"
            >
              {/* Product Image */}
              <Link to={`/one-product?id=${product._id}`}>
                <img
                  src={product.photos[0]}
                  alt={product.name}
                  className="w-24 h-24 object-contain rounded"
                />
              </Link>
              <div className="px-2">
                {/* Product Details */}
                <div className="md:flex justify-between md:space-x-5">
                  <Link to={`/one-product?id=${product._id}`}>
                    <h2 className="text-md font-medium">{product.name}</h2>
                  </Link>
                  <p className="text-gray-800 font-bold">₹{product.offerPrice}</p>
                </div>
                <p className="text-gray-600 text-sm my-2">
                  {product.description}
                </p>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        className={`p-10 ${
          isLoading || isError || getCartProducts?.data.detail.total === 0
            ? "hidden"
            : "block"
        }`}
      >
        <Link
          to={`/checkout?type=${'cart'}`}
          className="bg-[#D9D9D9] text-black w-full py-3 px-2 mb-5 hover:bg-black hover:text-white"
        >
          Proceed to Checkout
        </Link>
      </div>
    </section>
    </UserProtectLayout>
  );
};

export default ShoppingCart;
