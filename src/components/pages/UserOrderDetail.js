import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";

const orderDetail = {
  orderId: "#12345",
  orderDate: "2024-11-25",
  deliveredDate: "2024-11-28",
  productDetails: {
    name: "Product Name 1",
    size: "Medium",
    cost: "₹149.99",
  },
  costDetails: {
    productCost: "₹149.99",
    shippingCost: "₹50.00",
    discountAmount: "₹20.00",
    totalCost: "₹179.99",
  },
  shippingAddress: {
    name: "John Doe",
    addressLine1: "123 Main Street, Apt 4B",
    cityState: "City, State - 123456",
  },
};

const UserOrderDetail = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    action: "Return", // Default action
    reason: "",
    product: "product 1",
    size: "s",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("The Return/Exchange request has been sent"); // Add this alert
    setShowPopup(false); // Close popup after submission
    setFormData({ action: "Return", reason: "" }); // Reset form
  };

  return (
    <section className="font-beatrice bg-gray-100 min-h-screen">
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}
        <div className="min-h-screen bg-gray-100 py-8 md:w-1/2 w-full">
          <div className="px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Order Details
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Order Information */}
              <div className="mb-4">
                <p className="text-gray-700">
                  <span className="font-medium">Order ID:</span>{" "}
                  {orderDetail.orderId}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Ordered Date:</span>{" "}
                  {orderDetail.orderDate}
                </p>
              </div>

              {/* Product Details */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Product Details</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Name:</span>{" "}
                  {orderDetail.productDetails.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Size:</span>{" "}
                  {orderDetail.productDetails.size}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Cost:</span>{" "}
                  {orderDetail.productDetails.cost}
                </p>
              </div>

              {/* Cost Details */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Cost Details</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Product Cost:</span>{" "}
                  {orderDetail.costDetails.productCost}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Shipping Cost:</span>{" "}
                  {orderDetail.costDetails.shippingCost}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Discount Amount:</span>{" "}
                  {orderDetail.costDetails.discountAmount}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Total Cost:</span>{" "}
                  {orderDetail.costDetails.totalCost}
                </p>
              </div>

              {/* Shipping Address */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                <p className="text-gray-700">
                  {orderDetail.shippingAddress.name}
                </p>
                <p className="text-gray-700">
                  {orderDetail.shippingAddress.addressLine1}
                </p>
                <p className="text-gray-700">
                  {orderDetail.shippingAddress.cityState}
                </p>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-6">
                <button
                  onClick={() => navigate("/refund-policy")}
                  className="px-4 py-2 border-2 rounded text-black"
                >
                  Return/Exchange Policy
                </button>
                <button
                  onClick={() => setShowPopup(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Return/Exchange
                </button>
              </div>
            </div>
          </div>

          {/* Return/Exchange Popup */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h3 className="text-lg font-medium mb-4">Return/Exchange</h3>
                <form onSubmit={handleSubmit}>
                  {/* Action Selection */}
                  <div className="mb-4">
                    <label className="block font-medium mb-2">Action:</label>
                    <select
                      name="action"
                      value={formData.action}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                    >
                      <option value="Return">Return</option>
                      <option value="Exchange">Exchange</option>
                    </select>
                  </div>
                  {formData?.action === "Exchange" && (
                    <div className="mb-4">
                      <label className="block font-medium mb-2">
                        Choose Products:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Product 1",
                          "Product 2",
                          "Product 3",
                          "Product 4",
                        ].map((product) => (
                          <label
                            key={product}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              value={product}
                              checked={formData.selectedProducts?.some(
                                (item) => item.product === product
                              )}
                              onChange={(e) => {
                                const newSelectedProducts = e.target.checked
                                  ? [
                                      ...(formData.selectedProducts || []),
                                      { product, size: "XS" }, // Default size for new product
                                    ]
                                  : (formData.selectedProducts || []).filter(
                                      (item) => item.product !== product
                                    );

                                handleInputChange({
                                  target: {
                                    name: "selectedProducts",
                                    value: newSelectedProducts,
                                  },
                                });
                              }}
                              className="form-checkbox"
                            />
                            <span>{product}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData?.action === "Exchange" &&
                    formData.selectedProducts?.map(
                      ({ product, size }, index) => (
                        <div key={index} className="mb-4">
                          <label className="block font-medium mb-2">
                            Choose Size for {product}:
                          </label>
                          <select
                            name="size"
                            value={size}
                            onChange={(e) => {
                              const newSelectedProducts = [
                                ...formData.selectedProducts,
                              ];
                              newSelectedProducts[index] = {
                                ...newSelectedProducts[index],
                                size: e.target.value,
                              };
                              handleInputChange({
                                target: {
                                  name: "selectedProducts",
                                  value: newSelectedProducts,
                                },
                              });
                            }}
                            className="w-full border p-2 rounded"
                          >
                            <option value="xs">XS</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="2xl">2XL</option>
                          </select>
                        </div>
                      )
                    )}

                  {/* Reason Input */}
                  <div className="mb-4">
                    <label className="block font-medium mb-2">Reason:</label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      maxLength="250"
                      placeholder="Enter reason for return or exchange (max 250 characters)"
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowPopup(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Image Section */}
        <div
          className="w-1/2 bg-cover bg-center m-5 rounded-lg max-sm:hidden"
          style={{ backgroundImage: `url(${LoginImg})` }}
        ></div>
      </div>
    </section>
  );
};

export default UserOrderDetail;
