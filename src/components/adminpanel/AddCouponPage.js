import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCouponPage = () => {
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpload = () => {
    const { code, discount, description, startDate, endDate } = formData;
    if (!code || !discount || !description || !startDate || !endDate) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulating API call or state update for new coupon
    alert(`Coupon "${code}" added successfully!`);
    navigate("/admin-coupons"); // Navigate back to the coupon table page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      <h2 className="text-2xl font-semibold mb-6">Add New Coupon</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter coupon code (max 15 characters)"
            maxLength="15"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Amount (₹)
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Enter discount amount"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description (max 50 characters)"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            maxLength="50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-950"
      >
        Add Coupon
      </button>
    </div>
  );
};

export default AddCouponPage;
