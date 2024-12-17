import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOrders,
  updateOrderCompleteApi,
  updateOrderShippingApi,
} from "../../api/admin";
import { useMutation } from "react-query";
import Swal from "sweetalert2";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isExcelExportingInProgress, setIsExcelExportingInProgress] =
    useState(false);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const itemsPerPage = 20; // as of now it is given statically

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [currentPage, selectedOrderStatus, selectedPaymentStatus]);

  useEffect(() => {
    if (
      (dateRange.startDate && dateRange.endDate) ||
      (!dateRange.startDate && !dateRange.endDate)
    ) {
      fetchOrders();
    }
  }, [dateRange]);

  // Fetch orders data
  const fetchOrders = async () => {
    setIsLoading(true);
    const { startDate, endDate } = dateRange;

    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        payment_status: selectedPaymentStatus || undefined,
        order_status: selectedOrderStatus || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      };

      const res = await getOrders(params);
      if (res.status === 200) {
        setOrders(res.data.detail.data);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Export orders to Excel
  const excelExportOrders = async () => {
    setIsExcelExportingInProgress(true);
    try {
      const res = await getOrders({ export: true, export_type: "excel" });
      if (res.status === 200) {
        const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "orders.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Failed to export orders:", res.statusText);
      }
    } catch (error) {
      console.error("Error exporting orders:", error);
    } finally {
      setIsExcelExportingInProgress(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1) setCurrentPage(page);
  };

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
  };

  const updateShippingMutation = useMutation({
    mutationFn: updateOrderShippingApi,
    onSuccess: () => {
      fetchOrders();
      Swal.fire("Success", "Order status Updated to Shipping", "success");
    },
    onError: (error) => {
      Swal.fire("Error",  error[0].msg, "error");
    },
  });
  const updateCompleteMutation = useMutation({
    mutationFn: updateOrderCompleteApi,
    onSuccess: () => {
      fetchOrders();
      Swal.fire("Success", "Order status Updated to Completed", "success");
    },
    onError: (error) => {
      Swal.fire("Error",  error[0].msg, "error");
    },
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
        <select
          value={selectedPaymentStatus}
          onChange={(e) => setSelectedPaymentStatus(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Payment Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
        </select>
        <select
          value={selectedOrderStatus}
          onChange={(e) => setSelectedOrderStatus(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Order Status</option>
          <option value="Completed">Completed</option>
          <option value="In Transit">In Transit</option>
          <option value="Dispatch">Dispatch</option>
        </select>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <label className="font-medium">From:</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
          <label className="font-medium">To:</label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
        </div>
        <div>
          <button
            onClick={excelExportOrders}
            disabled={isExcelExportingInProgress || orders.length < 1}
            className="bg-black text-white px-2 py-2 rounded"
          >
            {isExcelExportingInProgress ? "Exporting..." : "Export in Excel"}
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border">Order ID</th>
              <th className="py-3 px-4 border">Order Date</th>
              <th className="py-3 px-4 border">Customer Name</th>
              <th className="py-3 px-4 border">Total Price</th>
              <th className="py-3 px-4 border">Payment Status</th>
              <th className="py-3 px-4 border">Order Status</th>
              {/* <th className="py-3 px-4 border">Download</th> */}
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Something went wrong
                </td>
              </tr>
            )}
            {isLoading && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}
            {!error && !isLoading && orders.length > 0
              ? orders.map((order) => (
                  <tr key={order._id}>
                    <td className="border p-3">
                      <button
                        onClick={() => navigate(`../orderdetail/${order.id}`)}
                        className="text-blue-500 hover:underline"
                      >
                        {order.orderId}
                      </button>
                    </td>
                    <td className="border p-3">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="border p-3">{order.userName}</td>
                    <td className="border p-3">{order.total}</td>
                    <td className="border p-3">{order.paymentStatus}</td>
                    <td className="border p-3">
                      {order.orderStatus === "Pending" ||
                      order.orderStatus === "Completed" ? (
                        <div>{order.orderStatus}</div>
                      ) : (
                        <select
                          value={order.orderStatus}
                          onChange={(e) => {
                            if (e.target.value === "InTransit") {
                              updateShippingMutation.mutate({
                                orderId: order._id,
                                status: "Shipping",
                              });
                            } else if (e.target.value === "Completed") {
                              updateCompleteMutation.mutate({
                                orderId: order._id,
                                status: 'Completed',
                              });
                            }
                          }}
                        >
                          <option
                            value="Completed"
                            disabled={order.orderStatus === "Dispatch"}
                          >
                            Completed
                          </option>
                          <option
                            value="InTransit"
                            disabled={order.orderStatus === "InTransit"}
                          >
                            In Transit
                          </option>
                          <option
                            value="Dispatch"
                            disabled={
                              order.orderStatus === "InTransit" ||
                              order.orderStatus === "Dispatch"
                            }
                          >
                            Dispatch
                          </option>
                        </select>
                      )}
                    </td>
                    {/* <td>
                      <button>📄</button>
                    </td> */}
                  </tr>
                ))
              : !error &&
                !isLoading && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No orders found.
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span
          className={`px-3 py-1 mx-1 rounded-md hover:bg-gray-400 bg-black text-white`}
        >
          {currentPage}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={orders.length < 20}
          className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
