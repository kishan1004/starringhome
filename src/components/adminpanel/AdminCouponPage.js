import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCouponsApi,deleteCouponApi } from "../../api/admin";
import { useMutation, useQuery } from "react-query";
import { Pagination } from "antd";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader2 from "../common/Loader2";

const AdminCouponTablePage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const {data:coupons,isLoading,isError,refetch} = useQuery({
    queryKey:['allcoupon',{currentPage}],
    queryFn:()=>getCouponsApi(currentPage)
  })

  const deleteCouponMutation = useMutation({
    mutationFn:deleteCouponApi,
      onSuccess:()=>{
      Swal.fire("Success", "Coupon deleted successfully!", "success");
      refetch()
    },
    onError:(error)=>{
     Swal.fire("Error", "Try again some times", "error");
    }
  })


  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      {isLoading && <Loader2/>}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Uploaded Coupons</h2>
        <button
          onClick={() => navigate("/admin/add-coupon")}
          className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-950"
        >
          Add Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border font-medium">Code</th>
              <th className="px-4 py-2 border font-medium">Discount (₹)</th>
              <th className="px-4 py-2 border font-medium ">Description</th>
              <th className="px-4 py-2 border font-medium">Start Date</th>
              <th className="px-4 py-2 border font-medium">End Date</th>
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
            {coupons?.data?.detail.total === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No coupons found
                </td>
              </tr>
            ) : (
              coupons &&
              coupons?.data?.detail.data.map((coupon, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{coupon.code}</td>
                  <td className="px-4 py-2 border">{coupon.discoutAmount}</td>
                  <td className="px-4 py-2 border truncate w-60 ">{coupon.description}</td>
                  <td className="px-4 py-2 border">{coupon.startDate}</td>
                  <td className="px-4 py-2 border">{coupon.endDate}</td>
                  <td className="px-6 py-4 text-red-500 cursor-pointer">
                    <button
                      onClick={() => {
                        deleteCouponMutation.mutate({id:[coupon._id]})
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
              total={coupons?.data?.detail.total}
              hideOnSinglePage
            />
      </div>
     

    
    </div>
  );
};

export default AdminCouponTablePage;
