import React, { useState, useRef, useEffect } from "react";
import Blacklogo from "../../images/starringblack.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getNotifications } from "../../api/admin";

const Adminbar = ({ toggleSidebar, onLogout }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [clickedOrderIds, setClickedOrderIds] = useState([]);
  const notificationRef = useRef(null);
  const accountRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      if (res.status === 200) {
        console.log("Success", res.data);
        setRecentOrders(res.data.detail.data);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Error fetching order stats:", error);
    }
  };

  const toggleNotificationDropdown = () => {
    fetchNotifications();
    setIsNotificationOpen((prev) => !prev);
  };

  const clearNotifications = () => {
    setRecentOrders([]);
    setClickedOrderIds([]);
  };

  const toggleAccountDropdown = () => {
    setIsAccountOpen(!isAccountOpen);
    if (isNotificationOpen) setIsNotificationOpen(false);
  };

  const getNotificationText = (order) => {
    return order.message;
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target) &&
      accountRef.current &&
      !accountRef.current.contains(event.target)
    ) {
      setIsNotificationOpen(false);
      setIsAccountOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (orderId) => {
    setClickedOrderIds((prevIds) =>
      prevIds.includes(orderId) ? prevIds : [...prevIds, orderId]
    );
    setIsNotificationOpen(false);
  };

  return (
    <div className="w-[screen] fixed h-[60px] bg-gray-100 flex items-center justify-between p-2 sm:p-4">
      <div className="flex items-center">
        <GiHamburgerMenu
          onClick={toggleSidebar}
          className="text-2xl sm:text-3xl cursor-pointer sm:mr-4"
        />
        <img src={Blacklogo} alt="Logo" className="w-[120px] sm:w-[180px]" />
      </div>
      <div className="flex items-center gap-3 sm:gap-10 relative">
        {/* Notification Icon */}

        <div className="relative" ref={notificationRef}>
          <button onClick={toggleNotificationDropdown}>
            <IoNotifications className="text-xl sm:text-2xl cursor-pointer" />
          </button>
          {recentOrders.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs">
              {recentOrders.length}
            </span>
          )}
          {isNotificationOpen && (
            <div className="fixed right-2 mt-2 w-[350px] bg-white border border-gray-300 shadow-lg z-50 h-[90vh] overflow-scroll">
              <div className="p-4">
                <h4 className="font-bold text-sm sm:text-lg mb-2">
                  Recent Orders
                </h4>
                <button
                  onClick={clearNotifications}
                  className="mb-4 text-sm text-blue-500 hover:underline"
                >
                  Clear Notifications
                </button>
                <ul className="h-full overflow-y-auto">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <li
                        key={order._id}
                        className={`px-4 py-6 cursor-pointer border-b border-gray-300 ${
                          clickedOrderIds.includes(order._id)
                            ? "bg-gray-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <Link
                          to="orderdetail"
                          onClick={() => handleLinkClick(order._id)}
                        >
                          {getNotificationText(order)}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500 flex items-center justify-center">
                      No recent orders
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* User Management Icon */}
        <div className="relative">
          <Link to="user-management">
            <FaUserCog className="text-xl sm:text-2xl cursor-pointer" />
          </Link>
        </div>

        {/* Account Icon */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={toggleAccountDropdown}
            className="focus:outline-none"
          >
            <MdAccountCircle className="text-xl sm:text-2xl" />
          </button>
          {isAccountOpen && (
            <div className="absolute right-0 mt-2 w-[90vw] max-w-[160px] bg-white border border-gray-200 rounded shadow-lg z-50">
              <ul>
                {/* <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                  My Account
                </li> */}
                <li
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  onClick={() => {
                    onLogout();
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adminbar;
