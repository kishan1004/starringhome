import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCouponApi } from "../../api/admin";
import moment from "moment";
import Swal from "sweetalert2";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { Button } from "antd";

const AddCouponPage = () => {

const params = useParams()
 const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
  if(params.couponid){
     
    }
 },[params])


 const createCouponMutation = useMutation({
  mutationFn:createCouponApi,
    onSuccess:()=>{
      Swal.fire("Success", "Coupon added successfully!", "success");
      navigate('/admin/coupons')
    },
    onError:(error)=>{
      setError(error[0].field,{type:'custom',message:error[0].msg})
    }
 })

const onSubmit =(value) =>{
  createCouponMutation.mutate({
     code: value.code,
  description: value.description,
  discoutAmount: value.discoutAmount,
  startDate: moment(value.startDate).format('DD/MM/YYYY')  ,
  endDate: moment(value.endDate).format('DD/MM/YYYY'),   
  })
}

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      <div className="mb-5">
        <button
          onClick={() => navigate("/admin/coupons")}
          className="mb-4 flex items-center"
        >
          <FaArrowLeftLong />
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Add New Coupon</h2>
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code *
          </label>
          <input
            type="text"
            id="code"
            {...register("code", { required: "Code is required",
              maxLength:{value:15,message:"Maximum 15 character allowed"},
              minLength:{value:3,message:'Minimum 3 Characters is required'}
             })}
            placeholder="Enter coupon code (max 15 characters)"
            maxLength="15"
            className={`w-full border ${
              errors.code ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Amount (₹) *
          </label>
          <input
            type="number"
             id="discoutAmount"
            {...register("discoutAmount", { required: "Discount is required" })}
            placeholder="Enter discount amount"
            className={`w-full border ${
              errors.discoutAmount ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.discoutAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.discoutAmount.message}</p>
          )}
        </div>
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
             id="description"
            {...register("description", { required: "Description is required",  
              maxLength:{value:50,message:"Maximum 50 character allowed"},
              minLength:{value:3,message:'Minimum 3 Characters is required'}})}
            placeholder="Enter description (max 50 characters)"
            className={`w-[60%] border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows="2"
            maxLength="50"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date *
          </label>
          <input
            type="date"
            id="startDate"
            {...register("startDate", { required: "startDate is required" })}
            className={`w-full border ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date *
          </label>
          <input
            type="date"
            id="endDate"
            {...register("endDate", { required: "EndDate is required" })}
            className={`w-full border ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
          )}
        </div>
      </div>
      <Button
      htmlType="submit"
       variant="filled"
       color="#0000"
       loading={createCouponMutation.isLoading}
       className="mt-4 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-950"
      >
        Add Coupon
      </Button>
      </form>
      
    </div>
  );
};

export default AddCouponPage;
