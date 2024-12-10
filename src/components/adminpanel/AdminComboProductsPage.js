import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminComboProductsPage = () => {
  const navigate = useNavigate();

  const [combos, setCombos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCombos = combos.slice(startIndex, startIndex + itemsPerPage);

  const fetchCombos = async () => {
    // Mock data fetch - Replace this with API call
    const mockData = [
      {
        id: "1",
        comboName: "Combo 1",
        product1: "Product A",
        product2: "Product B",
        actualPrice: 200,
        comboPrice: 180,
      },
    ];
    setCombos(mockData);
    setTotal(mockData.length);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the combo permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mock delete logic - Replace with API call
        setCombos(combos.filter((combo) => combo.id !== id));
        Swal.fire("Deleted!", "The combo has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Combo Products</h2>
        <button
          onClick={() => navigate("/admin/add-combo")}
          className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-950"
        >
          Add Combo
        </button>
      </div>

      {/* Combo Table */}
      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border font-medium">Combo Name</th>
              <th className="px-4 py-2 border font-medium">Combo Products</th>
              <th className="px-4 py-2 border font-medium">Actual Price (₹)</th>
              <th className="px-4 py-2 border font-medium">Combo Price (₹)</th>
              <th className="px-4 py-2 border font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCombos.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4 font-semibold"
                >
                  No combos found
                </td>
              </tr>
            ) : (
              currentCombos.map((combo) => (
                <tr key={combo.id}>
                  <td className="px-4 py-2 border">{combo.comboName}</td>
                  <td className="px-4 py-2 border">
                    {combo.product1} & {combo.product2}
                  </td>
                  <td className="px-4 py-2 border">{combo.actualPrice}</td>
                  <td className="px-4 py-2 border">{combo.comboPrice}</td>
                  <td className="px-6 py-4 text-red-500 cursor-pointer">
                    <button
                      onClick={() => handleDelete(combo.id)}
                      className="text-red-600 hover:text-red-800 flex"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
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

export default AdminComboProductsPage;
