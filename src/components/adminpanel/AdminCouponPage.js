import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCoupons, deleteCoupon } from "../../api/admin";
import { FaTrash } from "react-icons/fa";

const AdminCouponTablePage = () => {
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState([]);
  const [total, setTotal] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCoupons = coupons.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchCoupons = async () => {
    setLoading(true);
    const res = await getCoupons(currentPage, itemsPerPage);
    if (res.status === 200) {
      setCoupons(res.data.detail.data);
      setTotal(res.data.detail.total);
      setLoading(false);
      setError(false);
    } else {
      setError(true);

      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteCoupon(id);
    if (res.status === 200) {
      console.log(res);
      fetchCoupons();
    } else {
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [currentPage]);

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
              <th className="px-4 py-2 border font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr className="border">
                <td className="px-6 py-4 border">Something went wrong</td>
              </tr>
            )}
            {loading && (
              <tr className="border">
                <td className="px-6 py-4 border">Loading...</td>
              </tr>
            )}
            {!error && !loading && currentCoupons.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No coupons found
                </td>
              </tr>
            ) : (
              !error &&
              !loading &&
              currentCoupons.map((coupon, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{coupon.code}</td>
                  <td className="px-4 py-2 border">{coupon.discoutAmount}</td>
                  <td className="px-4 py-2 border">{coupon.description}</td>
                  <td className="px-4 py-2 border">{coupon.startDate}</td>
                  <td className="px-4 py-2 border">{coupon.endDate}</td>
                  <td className="px-6 py-4 text-red-500 cursor-pointer">
                    <button
                      onClick={() => {
                        handleDelete(coupon._id);
                      }}
                      className="text-red-600 hover:text-red-800 flex "
                    >
                      <FaTrash />
                    </button>
                  </td>
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
