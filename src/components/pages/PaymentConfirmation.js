import React, { useState } from "react";
import Product1 from "../../images/product1.jpeg";
import Product2 from "../../images/product2.jpeg";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { verifyPayment, proceedToPay } from "../../api/user";

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
        Deliver to: <RiArrowDropDownLine />
      </h3>
      {isAddressVisible && (
        <div className="space-y-4">
          <div className="p-3 ">
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
          </div>
        </div>
      )}
    </div>
  );
};

const PaymentConfirmation = () => {
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
  const [order] = useState([
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
  const subtotal = order.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
  const shipping = 99;

  const total = subtotal + shipping;

  const [isRed, setIsRed] = useState(false);

  const handleClick = () => {
    setIsRed((prev) => !prev); // Toggle between red and white
  };

  const proceedPayment = (orderID, amt, data) => {
    let rOrderID = "";
    let rAmt= "";
    proceedToPay(orderID, amt).then((res) => {
      if(res.status===200) {
        rOrderID = res?.data?.detail?.data?.id;
        rAmt =  res?.data?.detail?.data?.amt;
      }
    })
    const params =  {
      // store this value in env value
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: rAmt,
      currecy: data.currency,
      name: data.name || "Starring",
      description: "Starring Clothing",
      order_id: rOrderID,
      handler: (res) => {
        let verificationRes = "";
        verifyPayment(res?.razorpay_payment_id,
          res?.razorpay_order_id,
          res?.razorpay_signature,
          ).then(res => {
          verificationRes = res;
        })
      },
      prefill: {
        name: data?.name,
        email: data?.email,
        contact: data?.contact
      },
      notes: {
        address: data?.address,
      },
      theme: {
        color: "#3399cc"
      }
    }
    const rzPay = new Razorpay(params);
    rzPay.open();
  }

  return (
    <section className="bg-gray-100 font-beatrice w-full max-[1440px] mx-auto ">
      <div className="max-w-full md:px-10  px-4">
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
      <div className=" md:p-10 p-2 pb-20 min-h-screen">
        <div className="max-w-6xl w-full">
          <div className="flex space-x-8">
            <h1 className="text-sm font-medium m-4 font-sans">SHOPPING BAG</h1>
            <Link to="/Favourites">
              <div className="flex space-x-1">
                <button>
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.66">
                      <rect
                        width="34"
                        height="34"
                        fill="white"
                        fill-opacity="0.88"
                      />
                      <path
                        d="M19.2792 20.4917L19.2577 20.1424L19.2792 20.4917ZM16.1681 14.8814L16.1417 15.2304C16.2366 15.2376 16.3303 15.2058 16.4013 15.1425C16.4722 15.0791 16.5143 14.9895 16.5178 14.8944L16.1681 14.8814ZM21.3934 18.603L21.7382 18.6636L21.3934 18.603ZM19.2577 20.1424C18.3589 20.1978 17.4196 20.3069 16.502 20.2005C15.6023 20.0961 14.763 19.7863 14.08 19.0218L13.558 19.4881C14.3865 20.4156 15.405 20.7779 16.4213 20.8958C17.4197 21.0117 18.4548 20.8932 19.3007 20.8411L19.2577 20.1424ZM14.08 19.0218C13.4115 18.2734 13.2737 17.2681 13.6152 16.4886C13.947 15.7314 14.7611 15.1262 16.1417 15.2304L16.1944 14.5324C14.5562 14.4087 13.44 15.1442 12.9741 16.2077C12.5179 17.249 12.715 18.5445 13.558 19.4881L14.08 19.0218ZM19.3007 20.8411C19.6045 20.8224 19.9296 20.8013 20.2248 20.7414C20.5197 20.6815 20.8232 20.5759 21.0634 20.3613L20.5971 19.8393C20.4894 19.9355 20.3251 20.0067 20.0855 20.0553C19.846 20.104 19.5696 20.1232 19.2577 20.1424L19.3007 20.8411ZM21.7382 18.6636C21.885 17.8289 22.1189 16.8137 22.116 15.8086C22.113 14.7854 21.8673 13.7327 21.0388 12.8053L20.5168 13.2716C21.1997 14.0362 21.4133 14.905 21.416 15.8107C21.4187 16.7344 21.2047 17.6555 21.0487 18.5424L21.7382 18.6636ZM21.0388 12.8053C20.1958 11.8616 18.9307 11.5203 17.8447 11.8566C16.7356 12.2002 15.8794 13.2267 15.8183 14.8684L16.5178 14.8944C16.5693 13.5109 17.2621 12.7699 18.0519 12.5253C18.8648 12.2735 19.8482 12.5233 20.5168 13.2716L21.0388 12.8053ZM21.0487 18.5424C20.9946 18.8502 20.9445 19.1226 20.8693 19.3552C20.794 19.5878 20.7048 19.7431 20.5971 19.8393L21.0634 20.3613C21.3037 20.1467 21.4426 19.857 21.5353 19.5706C21.628 19.2841 21.6854 18.9633 21.7382 18.6636L21.0487 18.5424Z"
                        fill="#1E1E1E"
                      />
                    </g>
                  </svg>
                </button>
                <h1 className="text-sm font-medium text-[#8A8A8A] m-4 font-sans">
                  FAVOURITES
                </h1>
              </div>
            </Link>
          </div>

          <div className="border-t border-dotted border-gray-500 lg:w-2/3 my-6"></div>
          <div className="md:flex space-x-2">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-2/3 gap-4">
              {order.map((item, index) => (
                <div key={index}>
                  <div className="relative">
                    <button
                      className="absolute bottom-0 right-0"
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

                    <Link to="/one-product">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="object-cover border-2 rounded-md"
                      />
                    </Link>
                  </div>
                  <div className="mt-2">
                    <Link to="/one-product">
                      <h2 className="text-sm font-medium">{item.name}</h2>
                    </Link>
                    <div className="flex space-x-3">
                      <p>Count: {item.count}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">
                        Full Sleeve Zipper
                      </p>
                      <p className="text-sm font-semibold">Rs. {item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-dotted border-gray-500 my-6 lg:hidden"></div>

            <div className="lg:w-1/3">
              <div className="md:hidden">
                <SavedAddress savedAddress={savedAddress} />
              </div>
              <div className="md:pt-14 md:px-10 md:pb-10 p-4 border">
                <h2 className="text-lg font-medium mb-4">ORDER SUMMARY</h2>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">Subtotal</p>
                  <p>Rs.{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">Shipping</p>
                  <p>Rs.{shipping.toFixed(2)}</p>
                </div>
                <div className="border-t border-dotted border-gray-500 w-full my-6"></div>
                <div className="flex justify-between font-bold mb-12">
                  <p>
                    TOTAL{" "}
                    <span className="text-gray-500 text-xs font-sans">
                      (TAX INCL.)
                    </span>
                  </p>
                  <p>Rs.{total.toFixed(2)}</p>
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 h-7 w-7 rounded-none text-xz font-extralight"
                    />
                    I agree to the Terms and Conditions
                  </label>
                </div>
                <button 
                  onClick={() => proceedPayment()}
                  className="w-full bg-[#D9D9D9] hover:text-white hover:bg-black text-center py-2 font-bold">
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dotted border-gray-500 md:w-2/3 my-6 hidden lg:block"></div>
        <div className="max-sm:hidden">
          <SavedAddress savedAddress={savedAddress} />
        </div>
      </div>
    </section>
  );
};

export default PaymentConfirmation;
