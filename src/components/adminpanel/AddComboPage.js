import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { Button, Select, ConfigProvider } from "antd";
import { useQuery } from "react-query";
import { createComboApi, getcomboProductsApi  } from "../../api/admin";
import { useMutation } from "react-query";

const { Option } = Select;

const AddComboPage = () => {
  const navigate = useNavigate();

  const { data: products } = useQuery({
    queryFn: () => getcomboProductsApi(),
  });
console.log(products)
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const createComboMutation = useMutation({
    mutationFn: createComboApi,
    onSuccess: () => {
      Swal.fire("Success", "Combo added successfully!", "success");
      navigate("/admin/comboproducts");
    },
    onError: (error) => {
      if(error[0].field === 'API'){
         Swal.fire("Error",  error[0].msg, "error");
        return
      }
      setError(error[0].field, { type: "custom", message: error[0].msg });
    },
  });

  const onSubmit = (value) => {
    if(value.products.length !== 2){
      setError('products',{type:"custom",message:"Select Aleast Two products"})
       return
    }
    createComboMutation.mutate({
      comboName: value.comboName,
      products: value.products,
      actualPrice: value.actualPrice,
      comboPrice: value.comboPrice,
    });
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-14">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/comboproducts")}
          className="flex items-center text-slate-900 hover:text-slate-700"
        >
          <FaArrowLeft className="mr-2" />
        </button>
      </div>

      {/* Form Header */}
      <h2 className="text-2xl font-semibold mb-6">Add Combo</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Combo Name */}
        <div>
          <label className="block font-medium mb-1">Combo Name *</label>
          <input
            type="text"
            id="comboName"
            {...register("comboName", {
              required: "comboName is required",
              maxLength: { value: 15, message: "Maximum 15 character allowed" },
              minLength: {
                value: 3,
                message: "Minimum 3 Characters is required",
              },
            })}
            className={`w-full border ${
              errors.comboName ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.comboName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.comboName.message}
            </p>
          )}
        </div>

        {/* Product IDs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block font-medium mb-1">Select Products *</label>
            <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}>
              <Controller
                name="products"
                control={control}
                rules={{ required: "Please select a products" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    mode="multiple"
                    placeholder="Select a products"
                    style={{ width: 200 }}
                    onChange={field.onChange} // Pass `onChange` from field
                    onBlur={field.onBlur}
                    className="w-full"
                    size="large"
                    status={errors.products && "error"} // Pass `onBlur` from field
                  >
                    {products?.data?.detail.data.map((product, index) => (
                      <Option key={product} value={product}>{product}</Option>
                    ))}
                  </Select>
                )}
              />
            </ConfigProvider>

            {errors.products && (
              <p className="text-red-500 text-sm mt-1">
                {errors.products.message}
              </p>
            )}
          </div>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Actual Price *</label>
            <input
              type="number"
              id="actualPrice"
              {...register("actualPrice", {
                required: "actualPrice is required",
              })}
              className={`w-full border ${
                errors.actualPrice ? "border-red-500" : "border-gray-300"
              } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.actualPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.actualPrice.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Combo Price *</label>
            <input
              type="number"
              id="comboPrice"
              {...register("comboPrice", {
                required: "comboPrice is required",
              })}
              className={`w-full border ${
                errors.comboPrice ? "border-red-500" : "border-gray-300"
              } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.comboPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.comboPrice.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          htmlType="submit"
          type="primary"
          loading={createComboMutation.isLoading}
          className="px-4 py-2 mt-5 bg-slate-900 text-white rounded hover:bg-slate-950"
        >
          Add Combo
        </Button>
      </form>
    </div>
  );
};

export default AddComboPage;
