import axios from "axios";
import { axiosInstance } from "../utils/axios";
import { jwtDecode } from "jwt-decode";

/**
 * We use the axios instance from axios file, for creating our api call definitions.
 * these functions can be called inside any react component and resolve the returned Promise,
 * the promise returns a response object, use it further for state management in react component.
 *
 *
 * Example 1:
 * POST Method with request body -
 * userLogin method takes url endpoint as first param, request body is an object passed as second params
 *
 * Example 2:
 * GET Method with url params
 * getProfiles method takes url endpoint as first param, and an object to configure the out going axios request.
 * This object can have another inner object params: to pass url params.
 *
 * Example 3
 * DELETE Method with path Variable
 * deleteProfile method dynamically changes path based on the user Id, this is path variable.
 * We have used string interpolation ${} to dynamically pass in values.
 */

/* User APIs */
export const userLogin = (email, password) => {
  return axiosInstance.post("/user/auth/login", {
    email,
    password,
  });
};

export const userLogout = () => {
  return axiosInstance.delete("/user/auth/logout");
};

/* Profile APIs */
export const getProfiles = (page, limit) => {
  return axiosInstance.get("/admin/profiles/details", {
    params: {
      page: page,
      limit: limit,
    },
  });
};

export const saveProfile = (profile = {}) => {
  const { firstName, lastName, email, mobileNumber, password } = profile;

  if (!firstName || !email || !password) {
    console.error("First name, email, and password are required.");
  }

  return axiosInstance.post("/admin/profiles/save", {
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
  });
};

export const deleteProfile = (id) => {
  return axiosInstance.delete(`/admin/profiles/${id}/delete`);
};

export const buyOrder = (data) => {
  return axiosInstance.post("/users/orders/buy", {
    ...data,
  });
};

export const orderDetails = (page, limit = 20) => {
  return axiosInstance.get("/users/orders/details", {
    params: {
      page,
      limit,
    },
  });
};

/* Product API */

export const getProductList = (page, limit = 50) => {
  return axiosInstance.get("/admin/products/details", {
    params: {
      page,
      limit,
    },
  });
};

const transformStockCount = (stockCount) => {
  return Object.entries(stockCount).map(([size, count]) => ({
    size: size.toLowerCase(),
    count: parseInt(count, 10),
  }));
};

export const saveProduct = (data) => {
  console.log("whole data", data);
  const token = localStorage.getItem("token");
  const { name, brand, price, tag, collection } = data;
  const transformedStockCount = data.stockCount
    ? transformStockCount(data.stockCount)
    : [];
  data.export = false;
  data.stockCount = transformedStockCount;
  console.log(
    "name, brand, prize, tag, collection photos:",
    name,
    brand,
    price,
    tag,
    collection,
    data.photos
  );
  if (!name || !brand || !price || !tag || !collection) {
    throw new Error("Missing required parameters");
  }
  return axiosInstance.post("/admin/products/save", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

//GET PRODUCT DETAIL UI FEATURE NOT PRESENT
export const getProduct = (id) => {
  if (!id) {
    console.error("Product id is required");
  }
  return axiosInstance.get(`/admin/products/${id}/details`);
};

export const deleteProduct = (id) => {
  if (!id) {
    console.error("Product id is required");
  }

  return axiosInstance.delete(`/admin/products/${id}/remove`);
};

export const editProduct = (id, data) => {
  if (!id) {
    console.error("Product id is requried");
  }
  console.log(id, " ", data);
  const transformedStockCount = data.stockCount
    ? transformStockCount(data.stockCount)
    : [];
  data.export = false;
  data.stockCount = transformedStockCount;

  return axiosInstance.patch(`/admin/products/${id}/modify`, data);
};

/* Category API */

export const getAllCategories = () => {
  return axiosInstance.get("/admin/category/names");
};

/* Testimonial API */
export const saveTestimonials = (data) => {
  const { customerName: name, review } = data;

  if (!name || !review) {
    console.error("Invalid request body");
    return;
  }

  return axiosInstance.post("/admin/testimonials/save", {
    name,
    review,
  });
};

export const getTestimonialDetails = (page, limit = 50) => {
  return axiosInstance.get("/admin/testimonials/details", {
    params: {
      page: page,
      limit: limit,
    },
  });
};

//DELETE FUNCTIONALITY NOT PRESENT ON UI
export const deleteTestimonial = (id) => {
  return axiosInstance.delete(`/admin/testimonials/${id}/remove`);
};

//admin dashboard
export const getNotifications = () => {
  const token = localStorage.getItem("authToken");

  return axiosInstance.get("/dashboard/admin/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrderStats = (day_filter) => {
  const token = localStorage.getItem("authToken");
  console.log(day_filter);
  const d = day_filter.toLowerCase();

  return axiosInstance.get("/dashboard/admin/user/orders/stats", {
    params: {
      day_filter: d,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSalesDetails = () => {
  const token = localStorage.getItem("authToken");

  return axiosInstance.get(
    "/dashboard/user/admin/traffic/overview/sales/details",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//admin media
export const mediaUpload = async (filesObject) => {
  console.log("files :", filesObject);
  const formData = new FormData();

  filesObject.forEach((file) => {
    formData.append("files", file);
  });

  const token = localStorage.getItem("authToken");

  return axiosInstance.post("/admin/media/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//admin orders

export const getOrders = async (page, limit) => {
  const token = localStorage.getItem("authToken");
  return axiosInstance.get("/admin/orders/details", {
    params: {
      export: false,
      page: page,
      limit: limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Admin Contact us
export const getContactUs = async (page, limit) => {
  const token = localStorage.getItem("authToken");
  return axiosInstance.get(`/contact/us/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Admin Contact us delete
export const deleteContactUs = async (id) => {
  const token = localStorage.getItem("authToken");
  return axiosInstance.delete(`/contact/us/${id}/remove`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Admin Coupon create
export const addCoupon = async (data) => {
  const token = localStorage.getItem("authToken");
  return axiosInstance.post(`/coupons/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Admin Coupon  delete
export const deleteCoupon = async (id) => {
  const token = localStorage.getItem("authToken");
  return axiosInstance.delete(`/coupons/{id}/remove`, {
    data: { couponId: [id] },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Admin coupon get
export const getCoupons = async (page, limit) => {
  const token = localStorage.getItem("authToken");
  return axiosInstance.get("/coupons/details", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrder = async (order_id) => {
  const token = localStorage.getItem("authToken");
  return axiosInstance.get(`/admin/orders/${order_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const statusToShipping = async (orderId, status) => {
  const token = localStorage.getItem("authToken");
  console.log(jwtDecode(token));
  return axiosInstance.patch(
    "admin/orders/shipping/confirmation",
    {
      orderId: orderId,
      status: status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
