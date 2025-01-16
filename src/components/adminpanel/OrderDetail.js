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

  const statusOptions = [{name : "Dispatched",value:'Shipping'}, {name :"Shipped",value:"Completed"}];

  const handleStatusChange = (value) => {
    let selValue = value;
    if (!isNaN(selValue.slice(-1))) {
      selValue = selValue.slice(0, -1); 
    }
    console.log(selValue);
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      orderStatus: selValue,
    }));
  };

  const handleStatus = async () => {
    const status = orderDetails.orderStatus
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
        <p><strong>Name:</strong> {orderDetails.firstName} {orderDetails.lastName}</p>
        <p><strong>Email:</strong> {orderDetails.email}</p>
        <p><strong>Mobile Number:</strong> {orderDetails.mobileNumber}</p>
        <p><strong>Address:</strong> {orderDetails.address}, {orderDetails.landmark}, {orderDetails.city}, {orderDetails.state}, {orderDetails.postalCode}, {orderDetails.country}</p>
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
        disabled={orderDetails.orderStatus=="Pending"}
          value={orderDetails.orderStatus}
          onChange={handleStatusChange}
          className="ml-2"
          style={{ width: 200 }}
        >
          {statusOptions.map((status,i) => (
            <option key={i} value={status.value}>
              {status.name}
            </option>
          ))}
        </Select>
      </div>
      <Button type="primary" onClick={handleStatus}>Update Status</Button>
    </div>
  );
};

export default OrderDetail;
