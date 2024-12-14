import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteComboApi, getComboApi } from "../../api/admin";
import { useQuery } from "react-query";
import { Pagination } from "antd";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "react-query";

const AdminComboProductsPage = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: combos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allcombo", { currentPage }],
    queryFn: () => getComboApi(currentPage),
  });

  const deleteComboMutation = useMutation({
    mutationFn: deleteComboApi,
    onSuccess: () => {
      Swal.fire("Success", "Combo deleted successfully!", "success");
      refetch();
    },
    onError: (error) => {
      Swal.fire("Error", "Try again some times", "error");
    },
  });

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
            {combos?.data?.detail.total === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4 font-semibold"
                >
                  No combos found
                </td>
              </tr>
            ) : (
              combos?.data?.detail.data.map((combo) => (
                <tr key={combo.id}>
                  <td className="px-4 py-2 border">{combo.comboName}</td>
                  <td className="px-4 py-2 border">
                    {combo.products.toString()}
                  </td>
                  <td className="px-4 py-2 border">{combo.actualPrice}</td>
                  <td className="px-4 py-2 border">{combo.comboPrice}</td>
                  <td className="px-6 py-4 text-red-500 cursor-pointer">
                    <button
                      onClick={() => {
                        deleteComboMutation.mutate({ id: combo._id });
                      }}
                      className="text-red-600 hover:text-red-800 flex "
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className=" flex justify-center pt-10 pb-5 px-5">
        <Pagination
          value={currentPage}
          onChange={(value) => {
            setCurrentPage(value);
          }}
          total={combos?.data?.detail.total}
          hideOnSinglePage
        />
      </div>
    </div>
  );
};

export default AdminComboProductsPage;
