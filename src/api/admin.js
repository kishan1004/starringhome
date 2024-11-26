import { axiosInstance } from "../utils/axios";

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

export const saveProduct = (data) => {
  const { name, brand, prize, tag, collection } = data;
  if (!name || !brand || !prize || !tag || !collection) {
    throw new Error("Missing required parameters");
  }
  return axiosInstance.post("/admin/products/save", data);
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

  return axiosInstance.patch(`/admin/products/${id}/modify, data`);
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
