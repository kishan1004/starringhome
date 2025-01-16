import React, { useEffect, useState } from "react";
import Product1 from "../../images/product1.jpeg";
import Product2 from "../../images/product2.jpeg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  buyProducts,
  getAddresses,
  getCartDetails,
  getProductById,
  addToCart,
  viewCouponsApi,
  proceedToPay,
  verifyPayment,
} from "../../api/user";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Button, Spin } from "antd";
import { BiSolidCoupon } from "react-icons/bi";
import Swal from "sweetalert2";
import UserProtectLayout from "../common/UserProtectLayout";
import MetaTags from "../common/MetaTags";
import CountryCodes from "../../services/CountryCodes.json";

import { useDispatch } from "react-redux";
import { updateCartCount } from "../redux/CartSlice";

const CheckoutPage = () => {
  const [orders, setOrders] = useState([]);
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [searchParams] = useSearchParams();
  const checkoutType = searchParams.get("type");
  const paramProdcutId = searchParams.get("productId");
  const [selectedCoupon, setSelectedCoupon] = useState({
    id: "",
    amount: 0,
  });
  const [readyForPayment, setReadyForPayment] = useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    amount: "",
    email: "",
    contact: "",
    orderId: "",
    address: "",
  });

  const toggleAddressVisibility = () => {
    setIsAddressVisible((prevState) => !prevState);
  };
  const { data: getAlladdress } = useQuery({
    queryKey: ["Alladdress"],
    queryFn: () => getAddresses(),
  });

  const {
    data: getCartProducts,
    isLoading: cartLoading,
    isError: cartError,
    refetch,
  } = useQuery({
    queryKey: ["AllCart"],
    queryFn: () => getCartDetails(),
    enabled: checkoutType === "cart",
  });

  const {
    data: comboProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["individualProduct", { paramProdcutId }],
    queryFn: () => getProductById(paramProdcutId),
    enabled: checkoutType === "combo" && !!paramProdcutId,
  });

  const { data: coupons } = useQuery({
    queryKey: ["allcoupons"],
    queryFn: () => viewCouponsApi(),
  });

  function comboRemoveProduc(id) {
    setOrders((orders) => orders.filter((el) => el.productId != id));
  }

  useEffect(() => {
    if (getCartProducts && checkoutType === "cart") {
      if (getCartProducts?.data.detail.total === 0) {
        navigate("/all-products");
        return;
      }
      const products = getCartProducts?.data.detail.data.map((list) => {
        const SameOrder = orders.filter(
          (order) => order.productId === list._id
        );
        const productCounts = JSON.parse(
          localStorage.getItem("productCount_" + list._id)
        );
        const productSize = JSON.parse(
          localStorage.getItem("selectedSize_" + list._id)
        );
        return {
          productId: list._id,
          name: list.name,
          size:
            SameOrder.length !== 0
              ? SameOrder[0].size
              : productSize?.selectedSize
              ? productSize.selectedSize
              : "S",
          count:
            SameOrder.length !== 0
              ? SameOrder[0].count
              : productCounts?.count
              ? productCounts.count
              : 1,
          photos: list.photos[0],
          availableSizes: list.sizes,
          price: list.offerPrice,
        };
      });
      setOrders(products);
      return;
    }

    if (comboProduct && checkoutType === "combo") {
      if (comboProduct.data.detail.isComboAvailable) {
        const products = comboProduct.data.detail.comboProducts.map((list) => {
          const SameOrder = orders.filter(
            (order) => order.productId === list._id
          );
          return {
            productId: list._id,
            name: list.name,
            size: SameOrder.length !== 0 ? SameOrder[0].size : list.sizes[0],
            count: SameOrder.length !== 0 ? SameOrder[0].count : 1,
            photos: list.photos[0],
            availableSizes: list.sizes,
            price: list.offerPrice,
          };
        });
        setOrders(products);
      } else {
        navigate("/all-products");
      }
    }
  }, [getCartProducts, comboProduct]);


  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: "India",
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      countryCode: "+91",
      postalCode: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
    },
  });

  useEffect(() => {
    if (getAlladdress) {
      const filterUserAddress = getAlladdress.data.detail.data.filter(
        (address) => address.isDefault
      );
      if (filterUserAddress.length > 0) {
        setCurrentAddressId(filterUserAddress[0]._id);
        setIsAddressVisible(true);
        setOrderData({
          ...orderData,
          name:
            filterUserAddress[0].firstName +
            " " +
            filterUserAddress[0].lastName,
          email: filterUserAddress[0].email,
          contact:
            filterUserAddress[0].countryCode +
            "" +
            filterUserAddress[0].mobileNumber,
          address: filterUserAddress[0].address,
        });
      }
    }
  }, [getAlladdress]);

  let amount =
    orders.reduce((total, value) => total + value.price * value.count, 0) -
    selectedCoupon.amount;

  let totalProducts = orders.reduce((total, value) => total + value.count, 0);

  let shipping = amount > 3000 ? 0 : 100;

  let total = amount + shipping;

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const verifyPaymentMutation = useMutation({
    mutationFn: verifyPayment,
    onSuccess: (res) => {
      Swal.fire("Sucess", "Payment SuccessFully completed", "success");
      navigate("/your-orders");
    },
    onError: (error) => {
      Swal.fire("Error", "verify payment Error", "error");
      console.log(error);
    },
  });

  const proceedtopayMutation = useMutation({
    mutationFn: proceedToPay,
    onSuccess: (res) => {
      const razorPayReady = loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!razorPayReady) {
        Swal.fire("Error", "Razorpay not loaded succesfully", "error");
        return;
      }
      const params = {
        // store this value in env value
        key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_cfKaZHLoDVQQkC",
        amount: orderData.amount,
        currecy: "INR",
        name: "Starring",
        description: "Starring Clothing",
        order_id: res.data.detail.data.id,
        handler: (res) => {
          verifyPaymentMutation.mutate(res);
        },
        prefill: {
          name: orderData.name,
          email: orderData.email,
          contact: orderData.contact,
        },
        notes: {
          address: orderData.address,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzPay = new window.Razorpay(params);
      rzPay.open();
    },
    onError: (error) => {
      Swal.fire("Error", error[0].msg, "error");
      console.log(error);
    },
  });

  const buyOrderMutation = useMutation({
    mutationFn: buyProducts,
    onSuccess: (res) => {
      setOrderData({
        ...orderData,
        orderId: res?.data?.detail[0]?.orderId,
        amount: total * 100,
      });
      proceedtopayMutation.mutate({
        orderId: res?.data?.detail[0]?.orderId,
        amount: total * 100,
      });
    },
    onError: (error) => {
      Swal.fire("Error", error[0].msg, "error");
      console.log(error);
    },
  });

  const handleDelete = (id) => {
    const data = {
      productId: id,
      action: "REMOVE",
    };

    addToCart({ data: data }).then((res) => {
      if (res?.status === 401) {
        sessionStorage.setItem("redirectTo", window.location.pathname);
        navigate("/user-login");
        return;
      }
      getCartCount();
      refetch();
    });
  };

  async function getCartCount() {
    const res = await getCartDetails();
    console.log(res)
    dispatch(updateCartCount(res.data.detail.total));
  }


  const onAddressSubmit = (value) => {
    if (!readyForPayment) {
      Swal.fire(
        "Payment Confirmation",
        "Please Agree to Tearm and conditions",
        "warning"
      );
      return;
    }
    const buyDetails = {
      products: orders.map((list) => {
        return {
          productId: list.productId,
          name: list.name,
          size: list.size,
          count: list.count,
        };
      }),
      addressId: currentAddressId,
      addressDetails: value,
      amount: amount,
      couponId: selectedCoupon.id,
      shipping: shipping,
      total: total,
    };
    setOrderData({
      ...orderData,
      name: value.firstName + " " + value.lastName,
      email: value.email,
      contact: value.mobileNumber,
      address: value.address,
    });
    buyOrderMutation.mutate(buyDetails);
  };

  const onSubmitWithSavedAddress = () => {
    if (!readyForPayment) {
      Swal.fire(
        "Payment Confirmation",
        "Please Agree to Tearm and conditions",
        "warning"
      );
      return;
    }
    if (currentAddressId !== "") {
      const buyDetails = {
        products: orders.map((list) => {
          return {
            productId: list.productId,
            name: list.name,
            size: list.size,
            count: list.count,
          };
        }),
        addressId: currentAddressId,
        amount: amount,
        couponId: selectedCoupon.id,
        shipping: shipping,
        total: total,
      };
      buyOrderMutation.mutate(buyDetails);
    }
  };

  const metaData = {
    title: "Checkout",
    desc: "Complete your purchase securely at Starring Checkout.",
  };

  return (
    <UserProtectLayout>
      <MetaTags data={metaData} />
      <section className=" w-full bg-gray-100 min-h-screen">
        <div className="md:px-10 px-3">
          <h1 className="font-beatrice font-extrabold text-4xl pb-7">
            CHECKOUT
          </h1>
          <div className="flex md:space-x-8 space-x-4">
            <h3 className="font-medium text-base">INFORMATION</h3>
            <h3 className="font-normal text-base text-[#8A8A8A]">SHIPPING</h3>
            <h3 className="font-normal text-base text-[#8A8A8A]">PAYMENT</h3>
          </div>
        </div>

        <div className="md:flex">
          <div className="md:p-10 md:w-1/2 p-4 pb-10">
            <div className="text-sm font-semibold pt-4 pb-4">
              SHIPPING ADDRESS
            </div>
            {/* addresses */}
            {getAlladdress?.data.detail.total !== 0 && (
              <div className="space-y-6 pb-2">
                <h3
                  className="text-sm font-semibold cursor-pointer flex items-center"
                  onClick={toggleAddressVisibility}
                >
                  SAVED ADDRESS <RiArrowDropDownLine />
                </h3>
                {isAddressVisible &&
                  getAlladdress?.data.detail.data.map((savedAddress) => (
                    <div key={savedAddress._id} className="space-y-4">
                      <div className="p-3 border border-gray-300 bg-gray-50">
                        {savedAddress.isDefault && (
                          <div className="px-2 py-1 text-xs bg-yellow-400 w-fit rounded-full mb-3">
                            Default Address
                          </div>
                        )}
                        <p className="text-sm font-medium">
                          {savedAddress.firstName} {savedAddress.lastName}
                        </p>
                        <p className="text-sm">{savedAddress.address}</p>
                        <p className="text-sm">
                          {savedAddress.city}, {savedAddress.state}{" "}
                          {savedAddress.postalCode}
                        </p>
                        <p className="text-sm">{savedAddress.country}</p>
                        <p className="text-sm">{savedAddress.phone}</p>
                        <p className="text-sm">{savedAddress.email}</p>
                        <button
                          className={`text-sm ${
                            currentAddressId === savedAddress._id
                              ? "text-green-500"
                              : "text-blue-500"
                          }  mt-2`}
                          onClick={() => {
                            setCurrentAddressId(savedAddress._id);
                            clearErrors();
                            setOrderData({
                              ...orderData,
                              name:
                                savedAddress.firstName +
                                " " +
                                savedAddress.lastName,
                              email: savedAddress.email,
                              contact: savedAddress.mobileNumber,
                              address: savedAddress.address,
                            });
                            setValue("firstName", "");
                            setValue("lastName", "");
                            setValue("mobileNumber", "");
                            setValue("email", "");
                            setValue("postalCode", "");
                            setValue("state", "");
                            setValue("city", "");
                            setValue("landmark", "");
                            setValue("address", "");
                          }}
                        >
                          {currentAddressId === savedAddress._id
                            ? "Selected"
                            : "Use this address"}
                        </button>
                        {currentAddressId === savedAddress._id && (
                          <button
                            onClick={() => {
                              setCurrentAddressId("");
                              clearErrors();
                              setOrderData({
                                ...orderData,
                                name:
                                  savedAddress.firstName +
                                  " " +
                                  savedAddress.lastName,
                                email: savedAddress.email,
                                contact: savedAddress.mobileNumber,
                                address: savedAddress.address,
                              });
                              setValue("firstName", "");
                              setValue("lastName", "");
                              setValue("mobileNumber", "");
                              setValue("email", "");
                              setValue("postalCode", "");
                              setValue("state", "");
                              setValue("city", "");
                              setValue("landmark", "");
                              setValue("address", "");
                            }}
                            className="ml-5 text-sm text-blue-500"
                          >
                            Add New
                          </button>
                        )}

                        <Link
                          to={"/add-address/" + savedAddress._id}
                          className="ml-5 text-sm text-red-500"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* form */}
            <form onSubmit={handleSubmit(onAddressSubmit)} className="pt-5">
              {currentAddressId === "" && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        {...register("firstName", {
                          required: "First name is required",
                          minLength: {
                            value: 3,
                            message: "Minimum 3 Characters is required",
                          },
                        })}
                        placeholder="First Name"
                        className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        placeholder="Last Name"
                        className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Email"
                      className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <select
                        name="countryCode"
                        {...register("countryCode", {
                          required: "",
                        })}
                        defaultValue="+91"
                        style={{
                          padding: "0.75rem",
                          backgroundColor: "#f3f4f6",
                          fontSize: "0.875rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "4px",
                          width: "100px",
                        }}
                      >
                        {CountryCodes.map((code, i) => (
                          <option key={i} value={code.dial_code}>
                            {code.dial_code} ({code.name})
                          </option>
                        ))}
                      </select>

                      <input
                        type="tel"
                        name="mobileNumber"
                        {...register("mobileNumber", {
                          required: "Mobile number is required",
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: "Invalid Mobile number",
                          },
                        })}
                        placeholder="Mobile Number"
                        style={{
                          padding: "0.75rem",
                          backgroundColor: "#f3f4f6",
                          fontSize: "0.875rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "4px",
                          flex: 1,
                        }}
                      />
                    </div>

                    {errors.mobileNumber && (
                      <p
                        style={{
                          color: "#ef4444",
                          fontSize: "0.875rem",
                          marginTop: "5px",
                        }}
                      >
                        {errors.mobileNumber.message}
                      </p>
                    )}
                    {errors.countryCode && (
                      <p
                        style={{
                          color: "#ef4444",
                          fontSize: "0.875rem",
                          marginTop: "5px",
                        }}
                      >
                        {errors.countryCode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="state"
                      {...register("state", {
                        required: "State is required",
                      })}
                      placeholder="State / Region"
                      className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="address"
                      placeholder="Flat, House no., Building, Company, Apartment"
                      {...register("address", {
                        required: "Address is required",
                        minLength: {
                          value: 10,
                          message: "Minimum 10 Characters is required",
                        },
                      })}
                      className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="city"
                        {...register("city", {
                          required: "City is required",
                        })}
                        placeholder="City"
                        className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="landmark"
                        {...register("landmark", {
                          required: "Landmark is required",
                        })}
                        placeholder="Landmark"
                        className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                      />
                      {errors.landmark && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.landmark.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="postalCode"
                        {...register("postalCode", {
                          required: "Pincode is required",
                          pattern: {
                            value: /^[1-9][0-9]{5}$/,
                            message: "Invalid pincode",
                          },
                        })}
                        placeholder="Postal Code"
                        className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-2">
                <input
                  type="checkbox"
                  checked={readyForPayment}
                  onChange={(e) => setReadyForPayment(e.target.checked)}
                />
                <div>
                  I agree to the{" "}
                  <Link
                    className="underline text-blue-600"
                    to={"/terms-and-conditions"}
                  >
                    Terms and Conditions
                  </Link>
                </div>
              </div>
              <Button
                htmlType={currentAddressId === "" ? "submit" : "button"}
                type="primary"
                size="large"
                loading={
                  buyOrderMutation.isLoading || proceedtopayMutation.isLoading
                }
                className="w-full bg-blue-500 text-white py-3 font-semibold text-base font-beatrice mt-4"
                onClick={onSubmitWithSavedAddress}
              >
                Continue
              </Button>
            </form>
          </div>

          {/* orders */}
          <div className="p-4 md:pr-10 lg:mx-20 mt-10 font-beatrice">
            <div className="px-4 py-10 border-2 md:px-6 relative">
              <h3 className="text-base font-medium">YOUR ORDER</h3>
              <div className="space-y-6 mt-6">
                {orders.length !== 0 &&
                  orders.map((product, productIndex) => (
                    <div key={productIndex} className="flex items-center">
                      <Link to={"/one-product?id=" + product.productId}>
                        <img
                          src={product.photos}
                          alt={product.name}
                          className="w-28 h-36 object-cover border-2"
                        />
                      </Link>
                      <div className="grid grid-cols-2 md:gap-10 gap-5 place-content-between ml-4">
                        <div className="flex flex-col">
                          <Link to={"/one-product?id=" + product.productId}>
                            <p className="font-medium text-base xl:w-52">
                              {product.name}
                            </p>
                          </Link>
                          <div className="flex space-x-2">
                            {/* {product.availableSizes.map((size, sizeIndex) => (
                              <button
                                key={sizeIndex}
                                className={`px-2 py-1 border ${
                                  size === product.size
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                                }`}
                                onClick={() => {
                                  console.log(size);
                                  localStorage.setItem(
                                    "selectedSize_" + product.productId,
                                    JSON.stringify({
                                      selectedSize: size,
                                      productKey: product.productId,
                                    })
                                  );
                                  setOrders((prevItems) => {
                                    return prevItems.map((item) =>
                                      item.productId === product.productId
                                        ? { ...item, size: size }
                                        : item
                                    );
                                  });
                                }}
                              >
                                {size}
                              </button>
                            ))} */}
                            <div className="mt-3">
                              <b>Size - </b> &nbsp; {product.size}
                              <br />
                              <b>Count - </b> &nbsp; {product.count}
                            </div>
                          </div>
                        </div>
                        {checkoutType === "combo" && (
                          <div>
                            <button
                              className="text-red-500 text-lg"
                              onClick={() =>
                                comboRemoveProduc(product.productId)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        )}
                        {checkoutType === "cart" && (
                          <div>
                            <button
                              className="text-red-500 text-lg"
                              onClick={() => handleDelete(product.productId)}
                            >
                              Remove
                            </button>
                          </div>
                        )}

                        <div className="text-[#000E8A] hidden">
                          <div className="text-[#000E8A] flex items-center space-x-2">
                            <button
                              className="px-2 py-1 bg-gray-200"
                              onClick={() => {
                                setOrders((prevItems) => {
                                  const updatedOrders = prevItems.map((item) =>
                                    item.productId === product.productId
                                      ? {
                                          ...item,
                                          count:
                                            item.count === 1
                                              ? item.count
                                              : item.count - 1,
                                        }
                                      : item
                                  );
                                  localStorage.setItem(
                                    "productCount_" +
                                      updatedOrders[0].productId,
                                    JSON.stringify({
                                      count: updatedOrders[0].count,
                                      productKey: updatedOrders[0].productId,
                                    })
                                  );

                                  console.log(updatedOrders[0].count);
                                  return updatedOrders; // Return the new state
                                });
                              }}
                            >
                              -
                            </button>
                            <p>{product.count}</p>
                            <button
                              className="px-2 py-1 bg-gray-200"
                              onClick={() => {
                                setOrders((prevItems) => {
                                  const updatedOrders = prevItems.map((item) =>
                                    item.productId === product.productId
                                      ? {
                                          ...item,
                                          count:
                                            item.count === 5
                                              ? item.count
                                              : item.count + 1,
                                        }
                                      : item
                                  );
                                  localStorage.setItem(
                                    "productCount_" +
                                      updatedOrders[0].productId,
                                    JSON.stringify({
                                      count: updatedOrders[0].count,
                                      productKey: updatedOrders[0].productId,
                                    })
                                  );

                                  console.log(updatedOrders[0].count);
                                  return updatedOrders; // Return the new state
                                });
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Rs.{product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="border-t-2 space-y-4 mt-6 pt-4">
                {/* coupon */}
                {isLoading ? (
                  <div>
                    <Spin spinning={true} />
                  </div>
                ) : (
                  coupons?.data.detail.total > 0 && (
                    <div className="space-y-3">
                      <div>Coupons</div>
                      {coupons?.data.detail.data.map((coupon) => (
                        <div
                          key={coupon._id}
                          className="text-white bg-violet-500 rounded-2xl flex justify-between"
                        >
                          <div className="flex justify-between gap-3 p-3 items-center">
                            <div className="bg-white rounded-full h-10 w-10 flex justify-center items-center flex-none text-violet-500">
                              <BiSolidCoupon className=" rotate-45 text-xl" />
                            </div>

                            <div>
                              <div>{coupon.description}</div>
                              <div className=" font-semibold">
                                {coupon.code}
                              </div>
                              <div className="text-sm">
                                Rs.{coupon.discoutAmount}
                              </div>
                              <div className="text-xs">
                                use before : {coupon.endDate}
                              </div>
                            </div>
                          </div>

                          <div className=" w-[30%] border-dashed border-l-2 border-white px-4 flex justify-center items-center">
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                if (coupon._id === selectedCoupon.id) {
                                  setSelectedCoupon({
                                    id: "",
                                    amount: 0,
                                  });
                                } else {
                                  Swal.fire(
                                    "Success",
                                    "Coupon Applied Successfully",
                                    "success"
                                  );
                                  setSelectedCoupon({
                                    id: coupon._id,
                                    amount: coupon.discoutAmount,
                                  });
                                }
                              }}
                            >
                              {selectedCoupon.id === coupon._id
                                ? "Applied"
                                : "Apply"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}

                <div className="flex justify-between">
                  <p className="font-medium">Total Products</p>
                  <p className="font-medium text-base">{totalProducts}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Subtotal</p>
                  <p className="font-medium text-base">{amount}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium">Shipping</p>
                  <p className="font-medium text-xs text-[#8A8A8A]">
                    {shipping}
                  </p>
                </div>
                <div className="flex justify-between mt-6 border-t-2 pt-4">
                  <p className="text-base font-medium">Total</p>
                  <p className="text-base font-medium">
                    Rs.
                    {total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserProtectLayout>
  );
};

export default CheckoutPage;
