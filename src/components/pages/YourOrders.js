import React from "react";
import Productphoto from "../../images/product1.jpeg";
import { Link } from "react-router-dom";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import { getMyOrdersProducts } from "../../api/user";
import { useQuery } from "react-query";
import { Spin } from "antd";
import moment from "moment";

const YourOrders = () => {
  const {
    data: myOrders,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myorders"],
    queryFn: () => getMyOrdersProducts(),
  });


  return (
    <section className="font-beatrice bg-gray-100 min-h-screen">
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}
        <div className="min-h-screen bg-gray-100 py-8 md:w-1/2 w-full">
          <div className="w-full p-4">
            <Link to="/user-account">
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
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Your Orders
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Spin spinning={true} />
              </div>
            ) : isError || !myOrders ? (
              <div className="flex justify-center items-center h-40">
                Error in orders try after sometime
              </div>
            ) : myOrders.data.detail.total === 0 ? (
              <div className="flex justify-center items-center h-40">
                You have not order from us yet!
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {myOrders.data.detail.data.map((order) => (
                  <div
                    key={order._id} // Correctly placed key prop
                    className="rounded-lg shadow-md overflow-hidden flex items-center p-4 bg-white"
                  >
                    {/* Wrap the image and details with a link for better UX */}
                    <Link
                      to={`/userorderdetail?id=${order._id}`}
                      className="flex items-center w-full hover:no-underline"
                    >
                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Order Id : {order.orderId}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Order Status: <span> {order.orderStatus}</span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Payment Status: {order.paymentStatus}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Shipping Status: {order.shippingStatus}
                        </p>
                        <p className="text-XS text-gray-600 mt-1">
                          Total Amount: {order.total}
                        </p>
                        <p className="text-XS text-gray-600 mt-1">
                          Order At : {moment(order.createdTime).format("LLL")}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Right Side - Image Section */}
        <div
          className="w-1/2 bg-cover bg-center m-5 rounded-lg max-sm:hidden"
          style={{ backgroundImage: `url(${LoginImg})` }}
        ></div>
      </div>
    </section>
  );
};

export default YourOrders;
