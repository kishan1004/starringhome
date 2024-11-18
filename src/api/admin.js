import { AuthAxios } from "../utils/axios";

export const getAllProfileApi = async ({ queryKey }) => {
  let url = `admin/profiles/details?page=${queryKey[0].pageNumber}&limit=${queryKey[0].limit}`;

  if (queryKey[0].search) {
    url = url + `&search=${queryKey[0].search}`;
  }

  return AuthAxios.get(url);
};

export const getProductApi = async (id) => {
  return AuthAxios.get(`/banks/${id}`);
};

export const createProductApi = async (data) => {
  return adminAxios.post("endpoint", data);
};

export const editProductApi = async (data) => {
  return adminAxios.patch(`endpoint/${data._id}`, data);
};

export const deleteProductApi = async (data) => {
  return adminAxios.delete(`endpoint/${data._id}`, data);
};