import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartDetails, addToCart } from "../../api/user";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const increaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleDelete = (id) => {
    const data = {
      productId: [id],
      action: "REMOVE",
    };

    addToCart(data).then((res) => {
      if (res?.status === 403) {
        navigate("/user-login");
      }
      getCartData();
    });

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    );
  };

  useEffect(() => {
    getCartData();
  }, []);

  function getCartData() {
    getCartDetails(1, 20).then((res) => {
      if (res.status === 200) {
        const data = res.data.detail.data.map((product) => ({
          ...product,
          quantity: product.quantity || 1, // Ensure quantity is initialized
        }));
        setProducts(data);
      }
    });
  }

  return (
    <section className="bg-gray-100 font-sans min-h-screen">
      {/* Top Navigation */}
      <div className="w-full px-4 pb-5">
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

      {/* Shopping Cart Header */}
      <div className="px-4 md:px-10">
        <h1 className="text-lg font-bold">Shopping Bag</h1>
        <div className="border-t border-gray-300 my-4"></div>
      </div>

      {/* Product List */}
      <div className="px-4 md:px-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center p-4 bg-white shadow-md mb-4 rounded-lg"
          >
            {/* Product Image */}
            <Link to="/one-product">
              <img
                src={product.photos[0]}
                alt={product.name}
                className="w-24 h-24 object-contain rounded"
              />
            </Link>
            <div className="px-2">
              {/* Product Details */}
              <div className="md:flex justify-between md:space-x-5">
                <Link to="/one-product">
                  <h2 className="text-md font-medium">{product.name}</h2>
                </Link>
                <p className="text-gray-800 font-bold">₹{product.price}</p>
              </div>
              <p className="text-gray-600 text-sm my-2">{product.description}</p>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-1 bg-gray-300 rounded text-black"
                  onClick={() => decreaseQuantity(product._id)}
                >
                  -
                </button>
                <span className="px-3 py-1 bg-gray-100 border rounded">
                  {product.quantity}
                </span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded text-black"
                  onClick={() => increaseQuantity(product._id)}
                >
                  +
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(product._id)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-10">
        <Link
          to="/checkout"
          className="bg-[#D9D9D9] text-black w-full py-3 px-2 mb-5 hover:bg-black hover:text-white"
        >
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
};

export default ShoppingCart;
