import React, { useState } from "react";
import { Link } from "react-router-dom";

// Sample order data
const orderData = [
  {
    id: "#ts1",
    date: "2024-10-01",
    customer: "Alice",
    productId: "#a1",
    count: 2,
    totalPrice: 50,
    paymentStatus: "Success",
    orderStatus: "Completed",
  },
  {
    id: "#ts2",
    date: "2024-10-02",
    customer: "Bob",
    productId: "#a23",
    count: 1,
    totalPrice: 20,
    paymentStatus: "Pending",
    orderStatus: "In Transit",
  },
  {
    id: "#ts3",
    date: "2024-10-03",
    customer: "Charlie",
    productId: "#a11",
    count: 3,
    totalPrice: 60,
    paymentStatus: "Success",
    orderStatus: "Dispatch",
  },
  {
    id: "#ts4",
    date: "2024-10-04",
    customer: "David",
    productId: "#a7",
    count: 5,
    totalPrice: 100,
    paymentStatus: "Success",
    orderStatus: "Completed",
  },
  {
    id: "#ts5",
    date: "2024-10-05",
    customer: "Eva",
    productId: "#a21",
    count: 2,
    totalPrice: 40,
    paymentStatus: "Pending",
    orderStatus: "In Transit",
  },
  {
    id: "#ts6",
    date: "2024-10-06",
    customer: "Frank",
    productId: "#a10",
    count: 1,
    totalPrice: 30,
    paymentStatus: "Success",
    orderStatus: "Completed",
  },
  {
    id: "#ts7",
    date: "2024-10-07",
    customer: "Grace",
    productId: "#a20",
    count: 4,
    totalPrice: 80,
    paymentStatus: "Pending",
    orderStatus: "Dispatch",
  },
  // Add more sample orders as needed
];

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Filtering states
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to filter orders based on payment, order status, and date range
  const filteredOrders = orderData.filter((order) => {
    const orderDate = new Date(order.date);
    const matchesDate =
      (!startDate || orderDate >= new Date(startDate + "T00:00:00")) &&
      (!endDate || orderDate <= new Date(endDate + "T23:59:59"));

    return (
      (!selectedPaymentStatus ||
        order.paymentStatus === selectedPaymentStatus) &&
      (!selectedOrderStatus || order.orderStatus === selectedOrderStatus) &&
      matchesDate
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Helper function to determine class names based on status
  const getPaymentStatusClass = (status) => {
    return status === "Success" ? "text-green-500" : "text-yellow-500";
  };

  const getOrderStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "In Transit":
        return "text-yellow-500";
      case "Dispatch":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <select
          value={selectedPaymentStatus}
          onChange={(e) => setSelectedPaymentStatus(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Payment Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
        </select>
        <select
          value={selectedOrderStatus}
          onChange={(e) => setSelectedOrderStatus(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Order Status</option>
          <option value="Completed">Completed</option>
          <option value="In Transit">In Transit</option>
          <option value="Dispatch">Dispatch</option>
        </select>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <label className="font-medium">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
          <label className="font-medium">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border">Order ID</th>
              <th className="py-3 px-4 border">Order Date</th>
              <th className="py-3 px-4 border">Customer Name</th>
              <th className="py-3 px-4 border">Product ID</th>
              <th className="py-3 px-4 border">Product Count</th>
              <th className="py-3 px-4 border">Total Price</th>
              <th className="py-3 px-4 border">Payment Status</th>
              <th className="py-3 px-4 border">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="py-3 px-4 border">
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {order.id}
                  </Link>
                </td>
                <td className="py-3 px-4 border">{order.date}</td>
                <td className="py-3 px-4 border">{order.customer}</td>
                <td className="py-3 px-4 border">{order.productId}</td>
                <td className="py-3 px-4 border">{order.count}</td>
                <td className="py-3 px-4 border">Rs.{order.totalPrice}</td>
                <td
                  className={`py-3 px-4 border ${getPaymentStatusClass(
                    order.paymentStatus
                  )}`}
                >
                  {order.paymentStatus}
                </td>
                <td
                  className={`py-3 px-4 border ${getOrderStatusClass(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
