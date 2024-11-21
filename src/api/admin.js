import { axiosInstance } from "../utils/axios";

export const userLogin = (email, password) => {
  return axiosInstance.post('/user/auth/login', {
    email,
    password
  })
}

export const userLogout = () => {
  return axiosInstance.delete('/user/auth/logout');
}

export const getProfiles = (page, limit) => {
  return axiosInstance.get('/admin/profiles/details', {
    params: {
      page,
      limit
    }
  });
}

export const saveProfile = (profile = {}) => {
  const { firstName, lastName, email, mobileNumber, password } = profile;

  if (!firstName || !email || !password) {
    throw new Error('First name, email, and password are required.');
  }

  return axiosInstance.post('/admin/profiles/save', {
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
  });
}

export const getProductList = (page, limit=null) => {
  return axiosInstance.get(`/admin/products/details/?page=${page}&limit=${limit}`);
}

export const saveProduct =  (data) => {
  const { name, brand, prize,  tag, collection} = data;
  if (!name || !brand || !prize || !tag || !collection) {
    throw new Error('Missing required parameters');
  }
  return axiosInstance.post('/admin/products/save', data);
}

// do this
export const getProduct = (id) => {
  if (!id) {
    throw new Error('Product ID is required');
  }
  return axiosInstance.get(`admin/products/${id}/details`);
}

export const deleteProduct = (id) => {
  if(!id) {
    throw new Error('Product ID is required');
  }

  return axiosInstance.delete(`/admin/products/${id}/remove`);
}

export const editProduct = (id, data) => {
  if(!id) {
    throw new Error('Product ID is required');
  }

  return axiosInstance.patch(`/admin/products/${id}/modify, data`);
}


export const getAllCategories = () => {
  return axiosInstance.get('/admin/category/names');
}