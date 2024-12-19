import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder, statusToShipping } from "../../api/admin";
import { Button, Card, Select } from "antd";
import MetaTags from "../common/MetaTags";

const OrderDetail = () => {
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const resp = await getOrder(orderId);
      if (resp.status === 200) {
        setOrderDetails(resp.data.detail.data);
      }
      else {
        console.log(resp);
      }
    }
    fetchOrder();
  }, [])

  const [orderDetails, setOrderDetails] = useState({
    addressDetails: {
      address: "",
      city: "",
      country: "",
      email: "",
      firstName: "",
      landmark: "",
      lastName: "",
      mobileNumber: "",
      postalCode: "",
      state: "",
    },
    orderId: "",
    orderStatus: "",
    paymentStatus: "",
    products: [],
    shipping: 0,
    total: 0,
    createdTime: "",
    updatedTime: "",
  });

  const statusOptions = ["Dispatched", "Shipped", "Delivered"];

  const handleStatusChange = (value) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      orderStatus: value,
    }));
  };

  const handleStatus = async () => {
    const status = orderDetails.orderStatus === "Shipped" ? "Shipping" : "Delivered";
    const res = await statusToShipping(orderId, status);
    if (res.status === 200) {
      console.log(res.data);
    }
    else {
      console.log(res);
    }
  }

  const metaData = {
    title: "Order Details", desc: ""
  }


  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <MetaTags data={metaData} />

      <Card title="Order Information" className="mb-4">
        <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
        <p><strong>Order Status:</strong> {orderDetails.orderStatus}</p>
        <p><strong>Payment Status:</strong> {orderDetails.paymentStatus}</p>
        <p><strong>Total Amount:</strong> Rs.{orderDetails.total}</p>
        <p><strong>Shipping Cost:</strong> Rs.{orderDetails.shipping}</p>
        <p><strong>Created Time:</strong> {new Date(orderDetails.createdTime).toLocaleString()}</p>
        <p><strong>Updated Time:</strong> {new Date(orderDetails.updatedTime).toLocaleString()}</p>
      </Card>

      <Card title="Customer Information" className="mb-4">
        <p><strong>Name:</strong> {orderDetails.addressDetails.firstName} {orderDetails.addressDetails.lastName}</p>
        <p><strong>Email:</strong> {orderDetails.addressDetails.email}</p>
        <p><strong>Mobile Number:</strong> {orderDetails.addressDetails.mobileNumber}</p>
        <p><strong>Address:</strong> {orderDetails.addressDetails.address}, {orderDetails.addressDetails.landmark}, {orderDetails.addressDetails.city}, {orderDetails.addressDetails.state}, {orderDetails.addressDetails.postalCode}, {orderDetails.addressDetails.country}</p>
      </Card>

      <Card title="Product Details" className="mb-4">
        {orderDetails.products.map((product, index) => (
          <div key={index} className="border p-2 mb-2 rounded">
            <p><strong>Product Name:</strong> {product.name}</p>
            <p><strong>Product ID:</strong> {product.productId}</p>
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Quantity:</strong> {product.count}</p>
          </div>
        ))}
      </Card>

      <div className="mb-4">
        <strong>Order Status:</strong>
        <Select
          value={orderDetails.orderStatus}
          onChange={handleStatusChange}
          className="ml-2"
          style={{ width: 200 }}
        >
          {statusOptions.map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Button type="primary" onClick={handleStatus}>Update Status</Button>
    </div>
  );
};

export default OrderDetail;
