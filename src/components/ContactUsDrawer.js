import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ContactDrawer = ({ isOpen, closeDrawer }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!formData.message) newErrors.message = "Message is required.";
    if (formData.message.length > 255)
      newErrors.message = "Message cannot exceed 255 characters.";

    return newErrors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Replace with your actual API endpoint
        await axios
          .post("https://3.14.249.42:9004/api/v1/users/profiles/contact/us", {
            name: formData.name,
            email: formData.email,
            mobileNumber: "+91" + formData.phone,
            passage: formData.message,
          })
          .then(() => {
            // Success popup
            Swal.fire({
              title: "Success!",
              text: "Your message was sent successfully.",
              icon: "success",
              confirmButtonText: "OK",
              timer: 5000,
              timerProgressBar: true,
            });
            setFormData({
              name: "",
              email: "",
              phone: "",
              message: "",
            });
            setErrors({});
            closeDrawer();
          });
      } catch (error) {
        console.error("Error sending message:", error);

        // Error popup
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "Try Again",
          timer: 5000,
          timerProgressBar: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Validation error popup
      // Swal.fire({
      //   title: "Validation Error",
      //   text: "Please correct the highlighted errors in the form.",
      //   icon: "warning",
      //   confirmButtonText: "OK",
      // });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <button onClick={closeDrawer} className="text-xl">
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit} className="px-4 py-2">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            What can we help you with?
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            rows="4"
            maxLength={255}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 disabled:bg-gray-500"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactDrawer;
