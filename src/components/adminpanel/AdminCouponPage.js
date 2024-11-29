import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCouponTablePage = () => {
  const navigate = useNavigate();

  const dummyCoupons = [
    {
      code: "SAVE100",
      discount: 100,
      description: "Get ₹100 off on orders above ₹999.",
      startDate: "2024-11-01",
      endDate: "2024-12-31",
    },
    {
      code: "NEWYEAR50",
      discount: 50,
      description: "Flat ₹50 off on all products.",
      startDate: "2024-12-01",
      endDate: "2025-01-15",
    },
    {
      code: "FREESHIP",
      discount: 0,
      description: "Free shipping on orders above ₹500.",
      startDate: "2024-11-15",
      endDate: "2024-12-15",
    },
  ];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter coupons based on the date range
  const filteredCoupons = dummyCoupons.filter((coupon) => {
    const couponStartDate = new Date(coupon.startDate);
    const couponEndDate = new Date(coupon.endDate);

    const matchesStartDate =
      !startDate || couponEndDate >= new Date(startDate + "T00:00:00");
    const matchesEndDate =
      !endDate || couponStartDate <= new Date(endDate + "T23:59:59");

    return matchesStartDate && matchesEndDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCoupons = filteredCoupons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Uploaded Coupons</h2>
        <button
          onClick={() => navigate("/admin/add-coupon")}
          className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-950"
        >
          Add Coupon
        </button>
      </div>

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

      {/* Coupons Table */}
      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border font-medium">Code</th>
              <th className="px-4 py-2 border font-medium">Discount (₹)</th>
              <th className="px-4 py-2 border font-medium">Description</th>
              <th className="px-4 py-2 border font-medium">Start Date</th>
              <th className="px-4 py-2 border font-medium">End Date</th>
            </tr>
          </thead>
          <tbody>
            {currentCoupons.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No coupons found for the selected date range.
                </td>
              </tr>
            ) : (
              currentCoupons.map((coupon, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{coupon.code}</td>
                  <td className="px-4 py-2 border">{coupon.discount}</td>
                  <td className="px-4 py-2 border">{coupon.description}</td>
                  <td className="px-4 py-2 border">{coupon.startDate}</td>
                  <td className="px-4 py-2 border">{coupon.endDate}</td>
                </tr>
              ))
            )}
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

export default AdminCouponTablePage;
