import { axiosInstance } from "../utils/axios";

/* User APIs */
export const userLogin = (email, password) => {
  return axiosInstance.post('/user/auth/login', {
    email,
    password
  })
}

export const userLogout = () => {
  return axiosInstance.delete('/user/auth/logout');
}

/* Profile APIs */
export const getProfiles = (page, limit) => {
  return axiosInstance.get('/admin/profiles/details', {
    params: {
      page: page,
      limit: limit,
    },
  });
};

export const saveProfile = (profile = {}) => {
  const { firstName, lastName, email, mobileNumber, password } = profile;

  if (!firstName || !email || !password) {
    console.error('First name, email, and password are required.')
  }

  return axiosInstance.post('/admin/profiles/save', {
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
  });
}

export const deleteProfile = (id) => {
  return axiosInstance.delete(`/admin/profiles/${id}/delete`)
}

/* Product API */

export const getProductList = (page, limit = 50) => {
  return axiosInstance.get('/admin/products/details', {
    params: {
      page,
      limit
    }
  });
}

export const saveProduct = (data) => {
  const { name, brand, prize, tag, collection } = data;
  if (!name || !brand || !prize || !tag || !collection) {
    throw new Error('Missing required parameters');
  }
  return axiosInstance.post('/admin/products/save', data);
}

//GET PRODUCT DETAIL UI FEATURE NOT PRESENT
export const getProduct = (id) => {
  if (!id) {
    console.error("Product id is required")
  }
  return axiosInstance.get(`admin/products/${id}/details`);
}

export const deleteProduct = (id) => {
  if (!id) {
    console.error("Product id is required")
  }

  return axiosInstance.delete(`/admin/products/${id}/remove`);
}

export const editProduct = (id, data) => {
  if (!id) {
    console.error("Product id is requried");
  }

  return axiosInstance.patch(`/admin/products/${id}/modify, data`);
}

/* Category API */

export const getAllCategories = () => {
  return axiosInstance.get('/admin/category/names');
}

/* Testimonial API */
export const saveTestimonials = (data) => {
  const { customerName: name, review } = data;

  if (!name || !review) {
    console.error("Invalid request body")
    return;
  }

  return axiosInstance.post('/admin/testimonials/save', {
    name,
    review
  })
}

export const getTestimonialDetails = (page, limit = 50) => {
  return axiosInstance.get('/admin/testimonials/details', {
    params: {
      page: page,
      limit: limit,
    },
  });
};

//DELETE FUNCTIONALITY NOT PRESENT ON UI
export const deleteTestimonial = (id) => {
  return axiosInstance.delete(`/admin/testimonials/${id}/remove`);
}