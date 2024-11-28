import React, { useState } from "react";

const AdminCouponPage = () => {
  const [coupons, setCoupons] = useState([
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
  ]); // Preloaded dummy data

  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    description: "",
    startDate: "",
    endDate: "",
  });

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

    setCoupons([...coupons, formData]); // Add the new coupon to the table
    setFormData({
      code: "",
      discount: "",
      description: "",
      startDate: "",
      endDate: "",
    }); // Reset form
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      <h2 className="text-2xl font-semibold mb-6">Manage Coupons</h2>

      {/* Coupon Form */}
      <div className=" mb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter coupon code"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Discount */}
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

          {/* Description */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />
          </div>

          {/* Start Date */}
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

          {/* End Date */}
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
          className="mt-4 bg-gray-300 hover:text-white hover:bg-black text-center py-2 font-bold px-6 rounded"
        >
          Upload
        </button>
      </div>

      {/* Coupons Table */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Uploaded Coupons</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border font-medium ">Code</th>
                <th className="px-4 py-2 border font-medium">Discount (₹)</th>
                <th className="px-4 py-2 border font-medium">Description</th>
                <th className="px-4 py-2 border font-medium">Start Date</th>
                <th className="px-4 py-2 border font-medium">End Date</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No coupons uploaded yet.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon, index) => (
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
      </div>
    </div>
  );
};

export default AdminCouponPage;
