import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCoupon } from "../../api/admin";
import moment from "moment";
import Swal from "sweetalert2";

const AddCouponPage = () => {
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({}); // For tracking validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const handleUpload = async () => {
    const { code, discount, description, startDate, endDate } = formData;
    const newErrors = {};

    // Validation
    if (!code) newErrors.code = "Coupon code is required.";
    if (!discount) newErrors.discount = "Discount amount is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!startDate) newErrors.startDate = "Start date is required.";
    if (!endDate) newErrors.endDate = "End date is required.";

    // Check if there are errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const res = await addCoupon({
        code: code,
        description: description,
        discoutAmount: discount,
        startDate: moment(startDate).format("DD/MM/YYYY"),
        endDate: moment(endDate).format("DD/MM/YYYY"),
      });
      console.log(res);
      if (res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Coupon code created successfully.",
          icon: "success",
          confirmButtonText: "OK",
          timer: 5000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate("/admin/coupons");
        }, 4000);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Coupon Code already Exist",
          icon: "error",
          confirmButtonText: "close",
          timer: 5000,
          timerProgressBar: true,
        });
      }
      console.log("RES>>>", res);
    } catch (err) {
      console.log("ERRR", err);
    }

    // Simulating API call or state update for new coupon
    navigate("/admin/coupons"); // Navigate back to the coupon table page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      <h2 className="text-2xl font-semibold mb-6">Add New Coupon</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code *
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter coupon code (max 15 characters)"
            maxLength="15"
            className={`w-full border ${
              errors.code ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Amount (₹) *
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Enter discount amount"
            className={`w-full border ${
              errors.discount ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.discount && (
            <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
          )}
        </div>
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description (max 50 characters)"
            className={`w-full border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows="2"
            maxLength="50"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full border ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date *
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full border ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
          )}
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
