import React from "react";
import jsPDF from "jspdf";
import MetaTags from "../common/MetaTags";

const OrderReport = ({ orderId }) => {
  const dummyData = {
    invoiceNumber: "INV-12345",
    orderNumber: "ORD-98765",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerMobile: "+1234567890",
    city: "New York",
    state: "NY",
    items: [
      {
        name: "Graphic T-Shirt",
        product: "T-Shirt",
        quantity: 2,
        price: 1999,
      },
      {
        name: "Comfort Hoodie",
        product: "Hoodie",
        quantity: 1,
        price: 2999,
      },
    ],
    orderStatus: "Processing",
    paymentMethod: "Razorpay",
    warehouse: "KNK",
    courierPartner: "DHL",
    trackingNo: "DHL-123456",
    checkoutId: "CHK-654321",
    orderDate: "2024-11-12T10:00:00Z",
    shipping: 150,
    discount: 200,
  };

  const orderData = dummyData;

  const calculateGrandTotal = () => {
    const totalPrice = orderData.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return totalPrice - orderData.discount + orderData.shipping;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Set font
    doc.setFontSize(12);

    // Add title
    doc.text(`Order Report - ${orderData.orderNumber}`, 10, 10);

    // Add invoice details
    doc.text(`Invoice Number: ${orderData.invoiceNumber}`, 10, 20);
    doc.text(`Order Number: ${orderData.orderNumber}`, 10, 30);
    doc.text(`Customer Name: ${orderData.customerName}`, 10, 40);
    doc.text(`Customer Email: ${orderData.customerEmail}`, 10, 50);
    doc.text(`Customer Mobile: ${orderData.customerMobile}`, 10, 60);
    doc.text(`City: ${orderData.city}`, 10, 70);
    doc.text(`State: ${orderData.state}`, 10, 80);

    // Add order details
    doc.text(`Order Status: ${orderData.orderStatus}`, 10, 90);
    doc.text(`Payment Method: ${orderData.paymentMethod}`, 10, 100);
    doc.text(`Warehouse: ${orderData.warehouse}`, 10, 110);
    doc.text(`Courier Partner: ${orderData.courierPartner}`, 10, 120);
    doc.text(`Tracking No: ${orderData.trackingNo}`, 10, 130);
    doc.text(`Checkout ID: ${orderData.checkoutId}`, 10, 140);
    doc.text(
      `Order Date: ${new Date(orderData.orderDate).toLocaleDateString()}`,
      10,
      150
    );

    // Add item details
    doc.text("Items Ordered:", 10, 160);
    let yOffset = 170;
    orderData.items.forEach((item) => {
      doc.text(
        `- ${item.name} (${item.product}), Quantity: ${item.quantity}, Price: ₹${item.price}`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    // Pricing Summary
    doc.text(`Discount: ₹${orderData.discount}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Shipping: ₹${orderData.shipping}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Grand Total: ₹${calculateGrandTotal()}`, 10, yOffset);

    // Save PDF
    doc.save(`${orderData.orderNumber}_Order_Report.pdf`);
  };

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const metaData = {
    title: `Order Report - ${orderData.orderNumber}`, desc: ""
  }

  return (
    <div className="order-report p-6 mt-14">
      <MetaTags data={metaData} />

      <h2 className="text-2xl font-bold mb-6">
        Order Report - {orderData.orderNumber}
      </h2>

      {/* Order Report Content Here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Invoice Number:</strong> {orderData.invoiceNumber}
          </p>
          <p>
            <strong>Order Number:</strong> {orderData.orderNumber}
          </p>
          <p>
            <strong>Customer Name:</strong> {orderData.customerName}
          </p>
          <p>
            <strong>Customer Email:</strong> {orderData.customerEmail}
          </p>
          <p>
            <strong>Customer Mobile:</strong> {orderData.customerMobile}
          </p>
          <p>
            <strong>City:</strong> {orderData.city}
          </p>
          <p>
            <strong>State:</strong> {orderData.state}
          </p>
        </div>
        <div>
          <p>
            <strong>Order Status:</strong> {orderData.orderStatus}
          </p>
          <p>
            <strong>Payment Method:</strong> {orderData.paymentMethod}
          </p>
          <p>
            <strong>Warehouse:</strong> {orderData.warehouse}
          </p>
          <p>
            <strong>Courier Partner:</strong> {orderData.courierPartner}
          </p>
          <p>
            <strong>Tracking No:</strong> {orderData.trackingNo}
          </p>
          <p>
            <strong>Checkout ID:</strong> {orderData.checkoutId}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(orderData.orderDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Items Ordered</h3>
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Item Name</th>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Rate (Per Piece)</th>
              <th className="px-4 py-2 text-left">Price (Total)</th>
            </tr>
          </thead>
          <tbody>
            {orderData.items.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.product}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">₹{item.price.toLocaleString()}</td>
                <td className="px-4 py-2">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Pricing Summary</h3>
        <div className="mt-4">
          <p>
            <strong>Discount:</strong> ₹{orderData.discount.toLocaleString()}
          </p>
          <p>
            <strong>Shipping:</strong> ₹{orderData.shipping.toLocaleString()}
          </p>
          <p>
            <strong>Grand Total:</strong> ₹
            {calculateGrandTotal().toLocaleString()}
          </p>
        </div>
      </div>

      {/* Download PDF Button */}
      <button
        onClick={downloadPDF}
        className="mt-6 p-2 bg-black text-white rounded"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default OrderReport;
