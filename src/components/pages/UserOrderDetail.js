import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "react-query";
import { getOrdersDetailById, updateReturnApi } from "../../api/user";
import { useSearchParams } from "react-router-dom";
import { Spin, Button, Select, ConfigProvider } from "antd";
import moment from "moment";
import UserProtectLayout from "../common/UserProtectLayout";
import { useForm } from "react-hook-form";

const UserOrderDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const {
    data: orderData,
    isError,
    isLoading,
    refetch
  } = useQuery({
    queryFn: () => getOrdersDetailById(orderId),
    enabled: !!orderId,
  });
  const order = orderData?.data.detail.data;
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { action: "Return" },
  });

  useEffect(() => {
    if (order) {
      const products = order.products.map((product) => {
        return {
          id: product.productId,
          productName: product.name,
          size: "",
          defaultSize: product.size,
          isSelected: false,
        };
      });
      setOrderedProducts(products);
    }
  }, [order, showPopup]);

  const updateReturnMutation = useMutation({
    mutationFn: updateReturnApi,
    onSuccess: () => {
      clearErrors();
      setOrderedProducts([]);
      setValue("action", "Return");
      setValue("reason", "");
      setShowPopup(false);
      refetch();
      Swal.fire("Success", "Order status Updated to Completed", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error[0].msg, "error");
    },
  });
  console.log(errors);
  const onSubmit = (value) => {
    if (value.action === "Exchange") {
      if (
        orderedProducts.filter((product) => product.isSelected).length === 0
      ) {
        setError("reason", {
          type: "custom",
          message: "Select products to exchange",
        });
      } else if (
        orderedProducts.filter(
          (product) => product.isSelected && product.size === ""
        ).length > 0
      ) {
        setError("reason", {
          type: "custom",
          message: "Select size to exchange",
        });
      } else {
        updateReturnMutation.mutate({
          orderId: order.orderId,
          action: "Refund",
          products: orderedProducts
            .filter((list) => list.isSelected)
            .map((list) => {
              return {
                productName: list.productName,
                size: list.size,
              };
            }),
          reason: value.reason,
        });
      }
    } else {
      updateReturnMutation.mutate({
        orderId: order.orderId,
        action: value.action,
        products: [],
        reason: value.reason,
      });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   Swal.fire({
  //     icon: "success",
  //     title: "Request Sent",
  //     text: "The Return/Exchange request has been sent successfully!",
  //     timer: 5000,
  //     timerProgressBar: true,
  //   }).then(() => {
  //     setShowPopup(false); // Close popup after submission
  //     setFormData({ action: "Return", reason: "" }); // Reset form
  //   });
  // };

  return (
    <UserProtectLayout>
      <section className="font-beatrice bg-gray-100 min-h-screen">
        <div className="m-4 overflow-hidden md:hidden">
          <img
            src={LoginImgsm}
            alt="logo"
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex md:min-h-screen">
          {/* Left Side - Form Section */}
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Spin spinning={true} />
            </div>
          ) : isError || !orderData ? (
            <div className="flex justify-center items-center h-40">
              Error in orders try after sometime
            </div>
          ) : (
            orderData && (
              <div className="min-h-screen bg-gray-100 py-8 md:w-1/2 w-full">
                <div className="px-4">
                  <div className=" flex flex-wrap gap-3 items-center justify-between pb-4">
                    <div className="text-2xl font-bold text-gray-800">
                      Order Details
                    </div>
                    <Button
                      type="primary"
                      className="bg-black"
                      onClick={() => {
                        navigate("/your-orders");
                      }}
                    >
                      Back
                    </Button>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    {/* Order Information */}
                    <div className="mb-4">
                      <p className="text-gray-700">
                        <span className="font-medium">Order ID:</span>{" "}
                        {order.orderId}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Ordered Date:</span>{" "}
                        {moment(order.createdTime).format("LLL")}
                      </p>
                    </div>

                    {/* Product Details */}
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium mb-4">
                        Product Details
                      </h3>
                      {order.products.map((product, index) => (
                        <div
                          key={product.productId}
                          className="flex gap-2 pb-5"
                        >
                          <div>{index + 1}</div>
                          <div className=" space-y-2">
                            <p className="text-gray-700">
                              <span className="font-medium">Name:</span>{" "}
                              {product.name}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-medium">Quantity:</span>{" "}
                              {product.count}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-medium">Size:</span>{" "}
                              {product.size}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cost Details */}
                    <div className="border-t py-4 space-y-3 ">
                      <h3 className="text-lg font-medium mb-2">Cost Details</h3>
                      <p className="text-gray-700">
                        <span className="font-medium">Product Cost:</span>{" "}
                        {order.amount}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Shipping Cost:</span>{" "}
                        {order.shipping}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Total Cost:</span>{" "}
                        {order.total}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Order status:</span>{" "}
                        {order.orderStatus}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Payment Status:</span>{" "}
                        {order.paymentStatus}
                      </p>
                    </div>

                    {/* Shipping Address */}
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium mb-4">
                        Shipping Address
                      </h3>
                      <p className="text-gray-700">{order.firstName}</p>
                      <p className="text-gray-700">{order.address}</p>
                      <p className="text-gray-700">
                        {order.city} - {order.postalCode}
                      </p>
                      <p className="text-gray-700">{order.state}</p>
                      <p className="text-gray-700">
                        shipping Stauts : {order.shippingStatus}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-6">
                      <button
                        onClick={() => navigate("/refund-policy")}
                        className="px-4 py-2 border-2 rounded text-black"
                      >
                        Return/Exchange Policy
                      </button>
                      <button
                        onClick={() => setShowPopup(true)}
                        disabled={order.orderStatus !== "Completed"}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Return/Exchange
                      </button>
                    </div>
                  </div>
                </div>

                {/* Return/Exchange Popup */}
                {showPopup && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96 min-h-fit max-h-[calc(100vh-10rem)] overflow-y-auto">
                      <h3 className="text-lg font-medium mb-4">
                        Return/Exchange
                      </h3>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Action Selection */}
                        <div className="mb-4">
                          <label className="block font-medium mb-2">
                            Action:
                          </label>
                          <select
                            name="action"
                            {...register("action", {
                              required: "Action is required",
                            })}
                            className="w-full border p-2 rounded"
                          >
                            <option value="Return">Return</option>
                            <option value="Exchange">Exchange</option>
                          </select>
                          {errors.action && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.action.message}
                            </p>
                          )}
                        </div>
                        {watch("action") === "Exchange" && (
                          <div className="mb-4">
                            <label className="block font-medium mb-2">
                              Choose Products:
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {orderedProducts.map((product) => (
                                <label
                                  key={product.id}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    checked={product.isSelected}
                                    onChange={(e) => {
                                      clearErrors("reason");
                                      setOrderedProducts(
                                        orderedProducts.map((list) => {
                                          if (list.id === product.id) {
                                            return {
                                              ...list,
                                              isSelected: e.target.checked,
                                            };
                                          } else {
                                            return list;
                                          }
                                        })
                                      );
                                    }}
                                    className="form-checkbox"
                                  />
                                  <span>{product.productName}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                        {orderedProducts.filter((list) => list.isSelected)
                          .length > 0 &&
                          watch("action") === "Exchange" &&
                          orderedProducts.map(
                            (product, index) =>
                              product.isSelected && (
                                <div key={index} className="mb-4">
                                  <label className="block font-medium mb-2">
                                    Choose Size for {product.productName}:
                                  </label>
                                  <ConfigProvider
                                    theme={{
                                      token: { colorPrimary: "#1677ff" },
                                    }}
                                  >
                                    <Select
                                      value={product.size}
                                      onSelect={(value) => {
                                        clearErrors("reason");
                                        setOrderedProducts(
                                          orderedProducts.map((list) => {
                                            if (list.id === product.id) {
                                              return {
                                                ...list,
                                                size: value,
                                              };
                                            } else {
                                              return list;
                                            }
                                          })
                                        );
                                      }}
                                      placeholder="Select Size"
                                      className="w-full"
                                      size="large"
                                    >
                                      {["XS", "S", "L", "M", "XL", "2XL"].map(
                                        (size) => (
                                          <Select.Option
                                            key={size}
                                            value={size}
                                            disabled={
                                              product.defaultSize === size
                                            }
                                          >
                                            {size}
                                          </Select.Option>
                                        )
                                      )}
                                    </Select>
                                  </ConfigProvider>
                                </div>
                              )
                          )}
                        {errors.products && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.products.message}
                          </p>
                        )}

                        {/* Reason Input */}
                        <div className="mb-4">
                          <label className="block font-medium mb-2">
                            Reason:
                          </label>
                          <textarea
                            name="reason"
                            {...register("reason", {
                              required: "Reason is required",
                              maxLength: {
                                value: 250,
                                message: "Maximum 250 character allowed",
                              },
                              minLength: {
                                value: 10,
                                message: "Minimum 10 Characters is required",
                              },
                            })}
                            className="w-full border p-2 rounded"
                            placeholder="Enter reason for return or exchange (max 250 characters)"
                            rows="5"
                          ></textarea>
                          {errors.reason && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.reason.message}
                            </p>
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              clearErrors();
                              setOrderedProducts([]);
                              setValue("action", "Return");
                              setValue("reason", "");
                              setShowPopup(false);
                            }}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={updateReturnMutation.isLoading}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )
          )}

          {/* Right Side - Image Section */}
          <div
            className="w-1/2 bg-cover bg-center m-5 rounded-lg max-sm:hidden"
            style={{ backgroundImage: `url(${LoginImg})` }}
          ></div>
        </div>
      </section>
    </UserProtectLayout>
  );
};

export default UserOrderDetail;
