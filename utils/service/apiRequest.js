import axios from "axios";

export const axiosInstance = axios.create();

export default {
  post: (endpoint, params, options) => {
    return axiosInstance.post(endpoint, params, options);
  },
  get: (endpoint, options) => {
    return axiosInstance.get(endpoint, options);
  },
  put: (endpoint, params, options) => {
    return axiosInstance.put(endpoint, params, options);
  },
  delete: (endpoint, options) => {
    return axiosInstance.delete(endpoint, options);
  },
};
