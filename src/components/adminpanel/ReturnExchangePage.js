import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getReturnExchangeApi, updateReturnStatusApi } from "../../api/admin";
import { useMutation, useQuery } from "react-query";
import { Pagination, Dropdown} from "antd";
import Swal from "sweetalert2";
import Loader2 from "../common/Loader2";

const ReturnExchangePage = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: returnExchangeData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getreturnExchange", { currentPage, dateRange }],
    queryFn: () => getReturnExchangeApi(currentPage, dateRange),
  });

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value !== "" ? moment(value).format("DD/MM/YYYY") : "",
    }));
  };


  const updateReturnStatusMutation = useMutation({
    mutationFn: updateReturnStatusApi,
    onSuccess: () => {
      refetch();
      Swal.fire("Success", "Order status Updated to Completed", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error[0].msg, "error");
    },
  });

  const isDisabled = (item, action) => {
    if (item === "Accepted" && action === "Refund") {
      return true;
    } else if (item === "Shipping" && action === "Return") {
      return true;
    } else if (item === "Completed" && action === "Return") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-[60px]">
      <div>
        <h1 className="text-2xl font-bold mb-6">Return or Exchange Requests</h1>
        {isLoading && <Loader2/> }
        {/* Date Filters */}
        <div className="mb-6 flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <label className="font-medium">From:</label>
            <input
              type="date"
              onChange={(e) => handleDateChange("startDate", e.target.value)}
              className="px-3 py-2 border rounded w-full md:w-auto"
            />
            <label className="font-medium">To:</label>
            <input
              type="date"
              onChange={(e) => handleDateChange("endDate", e.target.value)}
              className="px-3 py-2 border rounded w-full md:w-auto"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow-lg">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left border">Order ID</th>
                <th className="p-2 text-left border">Return/Exchange</th>
                <th className="p-2 text-left border">Reason</th>
                <th className="p-2 text-left border">Date</th>
                <th className="p-2 text-left border">Status</th>
                <th className="p-2 text-left border">Action</th>
              </tr>
            </thead>
            <tbody>
              {isError ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Something went wrong
                  </td>
                </tr>
              ) : isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : returnExchangeData?.data.detail.total === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-4 font-semibold"
                  >
                    No combos found
                  </td>
                </tr>
              ) : (
                returnExchangeData?.data.detail.data.map((request, index) => (
                  <tr key={index} className="bg-white border">
                    <td className="p-2 border">
                      <button
                        onClick={() =>
                          navigate(`../orderdetail/${request._id}`)
                        }
                        className="text-blue-500 hover:underline"
                      >
                        {request.orderId}
                      </button>
                    </td>
                    <td className="p-2 border">
                      {request.action === "Refund"
                        ? "Exchnage"
                        : request.action}
                    </td>
                    <td className="p-2 border">{request.reason}</td>
                    <td className="p-2 border">
                      {moment(request.createdTime).format("DD-MM-YYYY")}
                    </td>
                    <td className="p-2 border">{request.status}</td>
                    <td className="p-2 border">
                      <div>
                        <Dropdown
                          menu={{
                            items: [
                              "Accepted",
                              "Declined",
                              "Shipping",
                              "Completed",
                            ].map((item) => {
                              return {
                                key: item,
                                label: item,
                                disabled: isDisabled(item, request.action),
                              };
                            }),
                            onClick: (value) => {
                              updateReturnStatusMutation.mutate({
                                refundId: request._id,
                                status: value.key,
                              });
                            },
                          }}
                          placement="bottom"
                        >
                          <div className=" cursor-pointer text-sm text-blue-500">
                            Change Status
                          </div>
                        </Dropdown>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" flex justify-center pt-10 pb-5 px-5">
        <Pagination
          value={currentPage}
          onChange={(value) => {
            setCurrentPage(value);
          }}
          total={returnExchangeData?.data.detail.total}
          hideOnSinglePage
        />
      </div>
    </div>
  );
};

export default ReturnExchangePage;
