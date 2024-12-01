import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReturnExchangePage = () => {
  const [requests, setRequests] = useState([
    {
      orderId: "12345",
      type: "Return",
      reason: "Defective Item",
      status: "Accepted",
      date: "2024-11-01",
    },
    {
      orderId: "67890",
      type: "Exchange",
      reason: "Wrong Size",
      status: "Declined",
      date: "2024-11-10",
    },
    {
      orderId: "11223",
      type: "Return",
      reason: "Late delivery",
      status: "Pending",
      date: "2024-11-15",
    },
    {
      orderId: "99887",
      type: "Exchange",
      reason: "Color mismatch",
      status: "Shipping",
      date: "2024-11-20",
    },
  ]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Adjust as needed

  // Filter requests based on date range
  const filteredRequests = requests.filter((request) => {
    const requestDate = new Date(request.date);
    const matchesStartDate = !startDate || requestDate >= new Date(startDate);
    const matchesEndDate = !endDate || requestDate <= new Date(endDate);
    return matchesStartDate && matchesEndDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedRequests = [...requests];
    const globalIndex = requests.findIndex(
      (req) => req.orderId === currentRequests[index].orderId
    );
    updatedRequests[globalIndex].status = newStatus;
    setRequests(updatedRequests);
  };

  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-[60px]">
      <div>
        <h1 className="text-2xl font-bold mb-6">Return or Exchange Requests</h1>

        {/* Date Filters */}
        <div className="mb-6 flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
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

        {/* Table */}
        <div className="overflow-x-auto shadow-lg">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left border">Order ID</th>
                <th className="p-2 text-left border">Return/Exchange</th>
                <th className="p-2 text-left border">Reason</th>
                <th className="p-2 text-left border">Date</th>
                <th className="p-2 text-left border">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((request, index) => (
                <tr key={index} className="bg-white border">
                  <td className="p-2 border">
                    <button
                      onClick={() => navigate(`../orderdetail/${request._id}`)}
                      className="text-blue-500 hover:underline"
                    >
                      {request.orderId}
                    </button>
                  </td>
                  <td className="p-2 border">{request.type}</td>
                  <td className="p-2 border">{request.reason}</td>
                  <td className="p-2 border">{request.date}</td>
                  <td className="p-2 border">
                    <select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="Accepted">Accepted</option>
                      <option value="Declined">Declined</option>
                      <option value="Pending">Pending</option>
                      <option value="Shipping">Shipping</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default ReturnExchangePage;
