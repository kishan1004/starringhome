import React, { useEffect, useState } from "react";
import { getInventoryDetailsandExport } from "../../api/admin";
import { useQuery } from "react-query";
import moment from "moment";
import { Pagination } from "antd";
import Loader2 from "../common/Loader2";

const Inventory = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isExcelExportingInProgress, setIsExcelExportingInProgress] =
    useState(false);
  const pageSize = 10;

  const { data: inventory,isLoading,isError } = useQuery({
    queryKey: ["getAllinventory", { dateRange }],
    queryFn: () =>
      getInventoryDetailsandExport(
        dateRange,
        false,
        ""
      ),
  });

   const currentData = inventory?.data.detail.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Export inventory to Excel
  const excelExportInventory = async () => {
    setIsExcelExportingInProgress(true);
    try {
      const res = await getInventoryDetailsandExport(dateRange , true, "excel");
      if (res.status === 200) {
        const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "inventory.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Failed to export inventory:", res.statusText);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setIsExcelExportingInProgress(false);
    }
  };

  // Handle date input changes
  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value !== '' ? moment(value).format("DD/MM/YYYY") : '',
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      {isLoading && <Loader2/>}
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      {/* Date Filters */}
      <div className="mb-6 flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <label htmlFor="start-date" className="font-medium">
            From:
          </label>
          <input
            id="start-date"
            type="date"
            // value={moment(dateRange.startDate).format("YYYY-DD-MM")}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
          <label htmlFor="end-date" className="font-medium">
            To:
          </label>
          <input
            id="end-date"
            type="date"
            // value={moment(dateRange.endDate).format("YYYY-DD-MM")}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
        </div>
        <div>
          <button
            className="bg-black text-white px-2 py-2 rounded"
            onClick={excelExportInventory}
            disabled={isExcelExportingInProgress || inventory?.data.detail.total === 0}
          >
            {isExcelExportingInProgress ? "Exporting..." : "Export in Excel"}
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 border">Product ID</th>
            <th className="py-3 px-4 border">Product Name</th>
            <th className="py-3 px-4 border">Stock Update Date</th>
            <th className="py-3 px-4 border">Purchased Stock </th>
            <th className="py-3 px-4 border">Opening Stock</th>
            <th className="py-3 px-4 border">Closing Stock</th>
            <th className="py-3 px-4 border">Ordered Stock</th>
            <th className="py-3 px-4 border">Shipped Stock</th>
          </tr>
        </thead>
        <tbody>
          {isError && (
            <tr className="border">
              <td className="px-6 py-4 border">Something went wrong</td>
            </tr>
          )}
          {isLoading && (
            <tr className="border">
              <td className="px-6 py-4 border">Loading...</td>
            </tr>
          )}
          {!isError && !isLoading 
            ? currentData.map((item) => (
                <tr key={item.productId} className="text-center">
                  <td className="py-3 px-4 border">{item.productId}</td>
                  <td className="py-3 px-4 border">{item.productName}</td>
                  <td className="py-3 px-4 border">{item.stockUpdatedDate}</td>
                   <td className="py-3 px-4 border">{item.purchasedStock}</td>
                  <td className="py-3 px-4 border">{item.openingStock}</td>
                  <td className="py-3 px-4 border">
                    {item.closingStock}
                  </td>
                  <td className="py-3 px-4 border">{item.orderedStock}</td>
                  <td className="py-3 px-4 border">{item.shippedStock}</td>
                </tr>
              ))
            : !isError &&
              !isLoading &&
             inventory?.data.detail.total === 0 && (
                <tr>
                  <td colSpan="7" className="py-3 px-4 border text-center">
                    No inventory data found for the selected date range.
                  </td>
                </tr>
              )}
        </tbody>
      </table>
      <div className=" flex justify-center pt-10 pb-5 px-5">
        <Pagination
          value={currentPage}
          onChange={(value) => {
            setCurrentPage(value);
          }}
          total={inventory?.data.detail.total}
          hideOnSinglePage
        />
      </div>
    </div>
  );
};

export default Inventory;
