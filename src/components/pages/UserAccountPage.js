import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserAccountPage = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Fashion St, Chennai-10001",
  });

  const [orders] = useState([
    { id: 1, date: "November 1, 2024", total: 79.99, status: "Shipped" },
    { id: 2, date: "October 15, 2024", total: 49.99, status: "Delivered" },
    { id: 3, date: "September 20, 2024", total: 129.99, status: "Pending" },
  ]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Handle saving user data (e.g., API call)
    console.log("User data saved:", userData);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-beatrice">
      {/* Header */}
      <header className="text-center py-8 bg-black text-white">
        <h1 className="text-4xl font-bold">Your Account</h1>
        <p className="text-lg">Manage your profile and orders</p>
      </header>
      <div className="w-screen md:px-10  px-4 py-4">
        <Link to="/">
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        {/* User Information Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Personal Information
          </h2>
          <form onSubmit={handleSaveChanges} className="mt-4 grid gap-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                value={userData.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-200"
            >
              Save Changes
            </button>
          </form>
        </section>

        {/* Order History Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Order History
          </h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2 text-gray-600">Order ID</th>
                  <th className="px-4 py-2 text-gray-600">Date</th>
                  <th className="px-4 py-2 text-gray-600">Total</th>
                  <th className="px-4 py-2 text-gray-600">Status</th>
                  <th className="px-4 py-2 text-gray-600">Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-200">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">Rs.{order.total.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`font-semibold ${
                          order.status === "Shipped"
                            ? "text-blue-500"
                            : order.status === "Delivered"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-indigo-600 hover:underline">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Account Settings Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Account Settings
          </h2>
          <div className="mt-4">
            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200">
              Logout
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center py-4 bg-[#CFD8DC] text-black">
        <p>&copy; 2024 Starring. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default UserAccountPage;
