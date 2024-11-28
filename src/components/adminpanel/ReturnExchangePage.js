import React, { useState } from "react";

const ReturnExchangePage = () => {
  const [orderId, setOrderId] = useState("");
  const [refundOrExchange, setRefundOrExchange] = useState("Refund");
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState([
    {
      orderId: "12345",
      type: "Refund",
      reason: "Defective Item",
      status: "Accepted",
    },
    {
      orderId: "67890",
      type: "Exchange",
      reason: "Wrong Size",
      status: "Declined",
    },
    // Add more dummy data as needed
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId && reason) {
      setRequests([
        ...requests,
        { orderId, type: refundOrExchange, reason, status: "Pending" },
      ]);
      setOrderId("");
      setReason("");
    }
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = newStatus;
    setRequests(updatedRequests);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      <div className=" p-8">
        <h1 className="text-3xl font-bold mb-6">Refund or Exchange</h1>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="orderId" className="block text-lg font-medium mb-2">
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="refundOrExchange"
              className="block text-lg font-medium mb-2"
            >
              Refund or Exchange
            </label>
            <select
              id="refundOrExchange"
              value={refundOrExchange}
              onChange={(e) => setRefundOrExchange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Refund">Refund</option>
              <option value="Exchange">Exchange</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="reason" className="block text-lg font-medium mb-2">
              Reason
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="2"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-gray-300 hover:text-white hover:bg-black text-center py-2 font-bold px-6 rounded"
          >
            Submit
          </button>
        </form>

        {/* Table Section */}
        <h2 className="text-2xl font-semibold mb-4">
          Refund/Exchange Requests
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Refund/Exchange</th>
              <th className="p-2 text-left">Reason</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index} className="border bg-white">
                <td className="p-2 border">{request.orderId}</td>
                <td className="p-2 border">{request.type}</td>
                <td className="p-2 border">{request.reason}</td>
                <td className="p-2 border">
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnExchangePage;
