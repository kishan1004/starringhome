import React, { useState } from "react";

const inventoryData = [
  {
    id: "#p1",
    productName: "T-Shirt - Red",
    stockUpdateDate: "2024-11-01",
    openingStock: 120,
    orderedStock: 20,
    shippedStock: 10, // Ensure shippedStock <= orderedStock
  },
  {
    id: "#p2",
    productName: "Jeans - Blue",
    stockUpdateDate: "2024-11-02",
    openingStock: 180,
    orderedStock: 30,
    shippedStock: 20,
  },
  {
    id: "#p3",
    productName: "Hoodie - Black",
    stockUpdateDate: "2024-11-03",
    openingStock: 90,
    orderedStock: 10,
    shippedStock: 5,
  },
  {
    id: "#p4",
    productName: "Jacket - Green",
    stockUpdateDate: "2024-11-04",
    openingStock: 70,
    orderedStock: 5,
    shippedStock: 5,
  },
  {
    id: "#p5",
    productName: "Sneakers - White",
    stockUpdateDate: "2024-11-05",
    openingStock: 220,
    orderedStock: 50,
    shippedStock: Math.min(50, 70),
  },
];

const Inventory = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Adjust as needed

  // Filter inventory data based on date range
  const filteredInventory = inventoryData.filter((item) => {
    const updateDate = new Date(item.stockUpdateDate);
    const matchesDate =
      (!startDate || updateDate >= new Date(startDate + "T00:00:00")) &&
      (!endDate || updateDate <= new Date(endDate + "T23:59:59"));

    return matchesDate;
  });

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInventory = filteredInventory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
          <label className="font-medium">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
          <label className="font-medium">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white">
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
            {currentInventory.length > 0 ? (
              currentInventory.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="py-3 px-4 border">{item.id}</td>
                  <td className="py-3 px-4 border">{item.productName}</td>
                  <td className="py-3 px-4 border">{item.stockUpdateDate}</td>
                  <td className="py-3 px-4 border">{item.openingStock}</td>
                  <td className="py-3 px-4 border">
                    {item.openingStock - item.shippedStock}
                  </td>{" "}
                  {/* Closing stock calculation */}
                  <td className="py-3 px-4 border">{item.orderedStock}</td>
                  <td className="py-3 px-4 border">{item.shippedStock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-3 px-4 border text-center">
                  No inventory data found for the selected date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
            {i + 1}
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
