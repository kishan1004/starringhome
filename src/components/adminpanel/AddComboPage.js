import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

const AddComboPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    comboName: "",
    product1: "",
    product2: "",
    actualPrice: "",
    comboPrice: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.comboName) newErrors.comboName = "Combo name is required.";
    if (!form.product1) newErrors.product1 = "Product 1 ID is required.";
    if (!form.product2) newErrors.product2 = "Product 2 ID is required.";
    if (!form.actualPrice || isNaN(form.actualPrice))
      newErrors.actualPrice = "Valid actual price is required.";
    if (!form.comboPrice || isNaN(form.comboPrice))
      newErrors.comboPrice = "Valid combo price is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      Swal.fire("Success", "Combo added successfully!", "success");
      // Logic to submit form
      console.log("Combo submitted:", form);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/comboproducts")}
          className="flex items-center text-slate-900 hover:text-slate-700"
        >
          <FaArrowLeft className="mr-2" />
        </button>
      </div>

      {/* Form Header */}
      <h2 className="text-2xl font-semibold mb-6">Add Combo</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Combo Name */}
        <div>
          <label className="block font-medium mb-1">Combo Name *</label>
          <input
            type="text"
            name="comboName"
            value={form.comboName}
            onChange={handleChange}
            className={`w-full border ${
              errors.comboName ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.comboName && (
            <p className="text-red-500 text-sm mt-1">{errors.comboName}</p>
          )}
        </div>

        {/* Product IDs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Product 1 ID *</label>
            <input
              type="text"
              name="product1"
              value={form.product1}
              onChange={handleChange}
              className={`w-full border ${
                errors.product1 ? "border-red-500" : "border-gray-300"
              } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.product1 && (
              <p className="text-red-500 text-sm mt-1">{errors.product1}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Product 2 ID *</label>
            <input
              type="text"
              name="product2"
              value={form.product2}
              onChange={handleChange}
              className={`w-full border ${
                errors.product2 ? "border-red-500" : "border-gray-300"
              } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.product2 && (
              <p className="text-red-500 text-sm mt-1">{errors.product2}</p>
            )}
          </div>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Actual Price *</label>
            <input
              type="text"
              name="actualPrice"
              value={form.actualPrice}
              onChange={handleChange}
              className={`w-full border ${
                errors.actualPrice ? "border-red-500" : "border-gray-300"
              } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.actualPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.actualPrice}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Combo Price *</label>
            <input
              type="text"
              name="comboPrice"
              value={form.comboPrice}
              onChange={handleChange}
              className={`w-full border ${
                errors.comboPrice ? "border-red-500" : "border-gray-300"
              } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.comboPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.comboPrice}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-950"
        >
          Add Combo
        </button>
      </form>
    </div>
  );
};

export default AddComboPage;
