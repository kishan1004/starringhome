import React from "react";
import { Link } from "react-router-dom";

const RefundPolicyPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <div className="w-full pb-5">
          <Link to="/your-orders">
            <svg
              width="62"
              height="14"
              viewBox="0 0 62 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60.5 7H1M1 7L7 1M1 7L7 13"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-6">Refund and Exchange Policy</h1>
        <p className="mb-6 text-gray-600">
          Thank you for shopping with us! We strive to provide high-quality
          products and excellent service. If you are not completely satisfied
          with your purchase, we're here to help.
        </p>

        {/* Refund Policy */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">
              1. Eligibility for Refunds:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                Items must be returned within 4 days of receiving your order.
              </li>
              <li>
                The item must be unused, unworn, and in the same condition that
                you received it.
              </li>
              <li>Original tags and packaging must be intact.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">
              2. Non-Refundable Items:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Sale items or items purchased with a discount.</li>
              <li>Gift cards.</li>
              <li>Customized or personalized items.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">
              3. How to Request a Refund:
            </h3>
            <p className="text-gray-600">
              Contact our customer service team with your order number and
              reason for return. Once your return is approved, we will provide a
              return shipping label or instructions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">4. Refund Process:</h3>
            <p className="text-gray-600">
              Refunds will be processed within 2-3 business days after we
              receive and inspect the returned item. Refunds will be issued to
              the original payment method. Please allow 7-10 days for your bank
              to process the refund.
            </p>
          </div>
        </div>

        {/* Exchange Policy */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Exchange Policy (Size Differences Only)
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">
              1. Eligibility for Size Exchanges:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Exchanges are accepted only for size differences.</li>
              <li>
                Items must meet the same criteria as listed in the refund policy
                (unused, unworn, and in original condition).
              </li>
              <li>
                Exchange requests must be made within 4 days of receiving your
                order.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">
              2. How to Request a Size Exchange:
            </h3>
            <p className="text-gray-600">
              Contact our customer service team with your order number, the
              current size, and the size you want to exchange for. We will
              provide instructions for returning the original item and shipping
              the new size.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">3. Exchange Process:</h3>
            <p className="text-gray-600">
              Once we receive the returned item, we will ship the new size
              within 2-4 business days. If the requested size is out of stock,
              you may choose a refund or wait for the item to be restocked.
            </p>
          </div>
        </div>

        {/* Return Shipping */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return Shipping</h2>
          <p className="text-gray-600">
            For defective or incorrect items, we will cover the return shipping
            cost. For all other returns, customers are responsible for return
            shipping fees.
          </p>
        </div>

        {/* Final Sale Items */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Final Sale Items</h2>
          <p className="text-gray-600">
            All items marked as "Final Sale" are non-refundable and
            non-exchangeable.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions or need assistance, please contact us at{" "}
            <a
              href="mailto:help@starring.co.in"
              className="text-blue-500 hover:underline"
            >
              help@starring.co.in
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
