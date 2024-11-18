import React, { useState } from "react";
import Product1 from "../../images/product1.jpeg";
import Product2 from "../../images/product2.jpeg";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

// Saved Address Component
const SavedAddress = ({ savedAddress }) => {
  const [isAddressVisible, setIsAddressVisible] = useState(false);

  const toggleAddressVisibility = () => {
    setIsAddressVisible((prevState) => !prevState);
  };

  return (
    <div className="space-y-6 pb-4">
      <h3
        className="text-sm font-semibold cursor-pointer flex items-center"
        onClick={toggleAddressVisibility}
      >
        SAVED ADDRESS <RiArrowDropDownLine />
      </h3>
      {isAddressVisible && (
        <div className="space-y-4">
          <div className="p-3 border border-gray-300 bg-gray-50">
            <p className="text-sm font-medium">
              {savedAddress.firstName} {savedAddress.lastName}
            </p>
            <p className="text-sm">{savedAddress.address}</p>
            <p className="text-sm">
              {savedAddress.city}, {savedAddress.state}{" "}
              {savedAddress.postalCode}
            </p>
            <p className="text-sm">{savedAddress.country}</p>
            <p className="text-sm">{savedAddress.phone}</p>
            <p className="text-sm">{savedAddress.email}</p>
            <button className="text-sm text-blue-500 mt-2">
              Use this address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckoutPage = () => {
  const [order, setOrder] = useState([
    {
      name: "Basic Heavy T-Shirt",
      size: "L",
      price: 99,
      img: Product1,
      count: 2,
    },
    {
      name: "Basic Fit T-Shirt",
      size: "L",

      price: 99,
      img: Product2,
      count: 1,
    },
  ]);

  const savedAddress = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    country: "United States",
    state: "California",
    address: "123 Main Street",
    city: "Los Angeles",
    postalCode: "90001",
  };

  const subtotal = order.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const totalCount = order.reduce((acc, item) => acc + item.count, 0);

  const handleIncrease = (index) => {
    setOrder((prevOrder) => {
      const updatedOrder = [...prevOrder];
      updatedOrder[index].count += 1;
      return updatedOrder;
    });
  };

  const handleDecrease = (index) => {
    setOrder((prevOrder) => {
      const updatedOrder = [...prevOrder];
      if (updatedOrder[index].count > 1) {
        updatedOrder[index].count -= 1;
      }
      return updatedOrder;
    });
  };

  const handleDelete = (index) => {
    setOrder((prevOrder) => prevOrder.filter((_, i) => i !== index));
  };

  return (
    <section className=" w-full bg-gray-100 min-h-screen">
      <div className=" md:px-10 md:py-14 px-4 py-10">
        <Link to="/one-product">
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

      <div className="md:px-10 px-3">
        <h1 className="font-beatrice font-extrabold text-4xl pb-7">CHECKOUT</h1>
        <div className="flex md:space-x-8 space-x-4">
          <h3 className="font-medium text-base">
            <Link to="/">INFORMATION</Link>
          </h3>
          <h3 className="font-normal text-base text-[#8A8A8A]">
            <Link to="/">SHIPPING</Link>
          </h3>
          <h3 className="font-normal text-base text-[#8A8A8A]">
            <Link to="/">PAYMENT</Link>
          </h3>
        </div>
      </div>

      <div className="md:flex">
        <div className="md:p-10 md:w-1/2 p-4 pb-10">
          <SavedAddress savedAddress={savedAddress} />

          <h3 className="text-sm font-semibold">CONTACT INFO</h3>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
            />
          </div>

          <h3 className="text-sm font-semibold pt-4 pb-2">SHIPPING ADDRESS</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
              />
            </div>
            <select className="w-full p-3 bg-gray-100  text-sm border border-gray-300">
              <option>Country</option>
            </select>
            <input
              type="text"
              placeholder="State / Region"
              className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
              />
            </div>
          </div>

          <Link to="/payment-confirmation">
            <div className="md:grid grid-cols-1 justify-items-end gap-4 hidden">
              <button className="w-1/2 flex justify-between bg-[#D9D9D9] hover:bg-gray-500 py-3 lg:px-5 px-2 items-center font-semibold text-base font-beatrice mt-4">
                Shipping
                <svg
                  width="50"
                  height="14"
                  viewBox="0 0 50 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 7H48.5M48.5 7L42.5 1M48.5 7L42.5 13"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </Link>
        </div>

        <div className="p-4 md:pr-10 lg:mx-20 mt-10 font-beatrice">
          <div className="px-4 py-10 border-2 md:px-6 relative">
            <div className="absolute bg-white text-[#000E8A] top-0 right-0 h-10 w-10 flex items-center justify-center">
              <p>({totalCount})</p>
            </div>
            <h3 className="text-base font-medium">YOUR ORDER</h3>
            <div className="space-y-6 mt-6">
              {order.map((item, index) => (
                <div key={index} className="flex items-center">
                  <Link to="/one-product">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-28 h-36 object-cover border-2"
                    />
                  </Link>
                  <div className="grid grid-cols-2 md:gap-10 gap-5 place-content-between ml-4">
                    <div className="flex flex-col">
                      <Link to="/one-product">
                        <p className="font-medium text-base xl:w-52">
                          {item.name}
                        </p>
                      </Link>
                      <p className="text-xs text-gray-600">{item.size}</p>
                    </div>
                    <div>
                      <button
                        className="text-red-500 text-lg"
                        onClick={() => handleDelete(index)}
                      >
                        X
                      </button>
                    </div>

                    <div className="text-[#000E8A]">
                      <div className="text-[#000E8A] flex items-center space-x-2">
                        <button
                          className="px-2 py-1 bg-gray-200"
                          onClick={() => handleDecrease(index)}
                        >
                          -
                        </button>
                        <p>({item.count})</p>
                        <button
                          className="px-2 py-1 bg-gray-200"
                          onClick={() => handleIncrease(index)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Rs.{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 mt-6 pt-4">
              <div className="flex justify-between">
                <p className="font-medium">Subtotal</p>
                <p className="font-medium text-base">
                  Rs.{subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium">Shipping</p>
                <p className="font-medium text-xs text-[#8A8A8A]">
                  Calculated at next step
                </p>
              </div>
              <div className="flex justify-between mt-6 border-t-2 pt-4">
                <p className="text-base font-medium">Total</p>
                <p className="text-base font-medium">
                  Rs.{subtotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <Link to="/payment-confirmation">
            <div className="grid grid-cols-1 justify-items-end gap-4 md:hidden pb-20">
              <button className="w-1/2 flex justify-between bg-[#D9D9D9] hover:bg-gray-600 py-3 lg:px-5 px-2 items-center font-semibold text-base font-beatrice mt-4">
                Shipping
                <svg
                  width="50"
                  height="14"
                  viewBox="0 0 50 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 7H48.5M48.5 7L42.5 1M48.5 7L42.5 13"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
