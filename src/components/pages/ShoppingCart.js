import React, { useState } from "react";
import { Link } from "react-router-dom";
import Product1 from "../../images/product1.jpeg";
import Product2 from "../../images/product2.jpeg";

const ShoppingCart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: Product1,
      name: "Cotton T-Shirt",
      description: "T-Shirt",
      originalPrice: 180,
      quantity: 1,
    },
    {
      id: 2,
      image: Product2,
      name: "Sweatshirt",
      description: "Full Sleeve Zipper",
      originalPrice: 200,
      quantity: 3,
    },
  ]);

  const increaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <section className="bg-gray-100 font-sans min-h-screen">
      {/* Top Navigation */}
      <div className="w-full px-4 py-5">
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
            key={product.id}
            className="flex items-center p-4 bg-white shadow-md mb-4 rounded-lg"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="px-2">
              {/* Product Details */}
              <div className="md:flex justify-between md:space-x-5">
                <h2 className="text-md font-medium">{product.name}</h2>
                <p className="text-gray-800 font-bold">
                  ₹{product.originalPrice}
                </p>
              </div>
              <p className="text-gray-600 text-sm my-2">
                {product.description}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-1 bg-gray-300 rounded text-black"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <span className="px-3 py-1 bg-gray-100 border rounded">
                  {product.quantity}
                </span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded text-black"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(product.id)}
                >
                  X
                </button>
              </div>

              {/* Delete Button */}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 w-full bg-white p-4 border-t">
        <Link
          to="/checkout"
          className="bg-black text-white px-4 py-2 rounded  text-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
};

export default ShoppingCart;
