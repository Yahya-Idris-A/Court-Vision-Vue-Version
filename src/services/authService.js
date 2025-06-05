import axios from "@/plugins/axios";

axios.defaults.headers.common["Authorization"] =
  `Bearer ` + localStorage.getItem("token")?.replace(/['"]+/g, "");

// login
export const signin = (data) => {
  return axios.post(`/api/auth/login`, data);
};

// registrasi
export const signup = (data) => {
  return axios.post(`/api/auth/register`, data);
};

// get user
export const getUser = () => {
  return axios.get(`/api/users/profile`);
};

export const updateUser = (data) => {
  return axios.put("/api/users/profile", data);
};
