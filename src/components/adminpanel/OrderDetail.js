import React, { useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams(); // Get the order ID from the URL

  // Sample order details (in a real app, fetch this data based on orderId)
  const [orderDetails, setOrderDetails] = useState({
    id: 1,
    date: "2024-10-01",
    customer: "Alice",
    productId: "#a1",
    count: 2,
    totalPrice: 50,
    paymentStatus: "Success",
    orderStatus: "Completed",
  });

  const statusOptions = ["Dispatched", "Shipped", "Delivered"]; // Status options

  // Handle order status change
  const handleStatusChange = (event) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      orderStatus: event.target.value,
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p>
        <strong>Order ID:</strong> {orderDetails.id}
      </p>
      <p>
        <strong>Date:</strong> {orderDetails.date}
      </p>
      <p>
        <strong>Customer:</strong> {orderDetails.customer}
      </p>
      <p>
        <strong>Product ID:</strong> {orderDetails.productId}
      </p>
      <p>
        <strong>Quantity:</strong> {orderDetails.count}
      </p>
      <p>
        <strong>Total Price:</strong> Rs.{orderDetails.totalPrice}
      </p>
      <p>
        <strong>Payment Status:</strong> {orderDetails.paymentStatus}
      </p>
      <div>
        <strong>Order Status:</strong>
        <select
          value={orderDetails.orderStatus}
          onChange={handleStatusChange}
          className="ml-2 px-3  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrderDetail;
