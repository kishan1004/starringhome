import React, { useEffect, useState } from "react";
import { getInventoryDetailsandExport } from "../../api/admin";

const Inventory = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isExcelExportingInProgress, setIsExcelExportingInProgress] =
    useState(false);
  const itemsPerPage = 4; // Adjust as needed

  useEffect(() => {
    if (
      (dateRange.startDate && dateRange.endDate) ||
      (!dateRange.startDate && !dateRange.endDate)
    ) {
      fetchInventory();
    }
  }, [dateRange]);

  // Helper to construct API params
  const constructParams = (exportType = false) => {
    const { startDate, endDate } = dateRange;
    const params = { export: exportType };
    if (startDate) params["start_date"] = startDate;
    if (endDate) params["end_date"] = endDate;
    if (exportType) params["export_type"] = "excel";
    return params;
  };

  // Fetch inventory data
  const fetchInventory = async () => {
    setIsLoading(true);
    const params = constructParams();
    try {
      const res = await getInventoryDetailsandExport(params);
      if (res.status === 200) {
        setInventory(res.data.detail.data);
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

  // Export inventory to Excel
  const excelExportInventory = async () => {
    setIsExcelExportingInProgress(true);
    const params = constructParams(true);
    try {
      const res = await getInventoryDetailsandExport(params);
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
    setDateRange((prev) => ({ ...prev, [field]: value }));
  };

  const totalPages = Math.ceil(inventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInventory = inventory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
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
            value={dateRange.startDate}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
          <label htmlFor="end-date" className="font-medium">
            To:
          </label>
          <input
            id="end-date"
            type="date"
            value={dateRange.endDate}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
        </div>
        <div>
          <button
            className="bg-black text-white px-2 py-2 rounded"
            onClick={excelExportInventory}
            disabled={isExcelExportingInProgress || currentInventory.length < 1}
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
            <th className="py-3 px-4 border">Opening Stock</th>
            <th className="py-3 px-4 border">Closing Stock</th>
            <th className="py-3 px-4 border">Ordered Stock</th>
            <th className="py-3 px-4 border">Shipped Stock</th>
          </tr>
        </thead>
        <tbody>
          {error && (
            <tr className="border">
              <td className="px-6 py-4 border">Something went wrong</td>
            </tr>
          )}
          {isLoading && (
            <tr className="border">
              <td className="px-6 py-4 border">Loading...</td>
            </tr>
          )}
          {!error && !isLoading && currentInventory.length > 0
            ? currentInventory.map((item) => (
                <tr key={item.productId} className="text-center">
                  <td className="py-3 px-4 border">{item.productId}</td>
                  <td className="py-3 px-4 border">{item.productName}</td>
                  <td className="py-3 px-4 border">{item.stockUpdatedDate}</td>
                  <td className="py-3 px-4 border">{item.openingStock}</td>
                  <td className="py-3 px-4 border">
                    {item.openingStock - item.shippedStock}
                  </td>
                  <td className="py-3 px-4 border">{item.orderedStock}</td>
                  <td className="py-3 px-4 border">{item.shippedStock}</td>
                </tr>
              ))
            : !error &&
              !isLoading &&
              currentInventory.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-3 px-4 border text-center">
                    No inventory data found for the selected date range.
                  </td>
                </tr>
              )}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {i === 0 ? 1 : i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Inventory;
