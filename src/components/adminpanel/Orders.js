import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../api/admin";

// Sample order data
const orderData = [];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  useEffect(()=>{
    const fetchOrders = async()=>{
      const res = await getOrders(currentPage,itemsPerPage);
      if(res.status===200)
      {
        console.log(res.data.detail.data);
        setOrders(res.data.detail.data);
      }
      else
      {
        console.log(res);
      }
    }
    fetchOrders();
  },[])

  // Filtering states
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filtered orders based on criteria
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.orderDate);
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

  const navigate = useNavigate();

  // Handle order status change
  const handleOrderStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, orderStatus: newStatus } : order
      )
    );
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
        <div>
          <button className="bg-black text-white px-2 py-2 rounded">
            Export in Excel
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border">Order ID</th>
              <th className="py-3 px-4 border">Order Date</th>
              <th className="py-3 px-4 border">Customer Name</th>
              <th className="py-3 px-4 border">Total Price</th>
              <th className="py-3 px-4 border">Payment Status</th>
              <th className="py-3 px-4 border">Order Status</th>
              <th className="py-3 px-4 border">Download</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="py-3 px-4 border">
                  <button
                    onClick={() => navigate(`../orderdetail/${order._id}`)}
                    className="text-blue-500 hover:underline"
                  >
                    {order.orderId}
                  </button>
                </td>
                <td className="py-3 px-4 border">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="py-3 px-4 border">{order.userName}</td>
                <td className="py-3 px-4 border">Rs.{order.total}</td>
                <td
                  className={`py-3 px-4 border ${
                    order.paymentStatus === "Success"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.paymentStatus}
                </td>
                <td className="py-3 px-4 border">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleOrderStatusChange(order.id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Dispatch">Dispatch</option>
                  </select>
                </td>
                <td className="py-3 px-4 border">
                  <button title="Download">📄</button>
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
