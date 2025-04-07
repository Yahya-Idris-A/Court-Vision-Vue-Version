import axios from "@/plugins/axios";

axios.defaults.headers.common["Authorization"] =
  `Bearer ` + localStorage.getItem("token")?.replace(/['"]+/g, "");

// login
export const signin = (data) => {
  return axios.post(`/api/login`, data);
};

// registrasi
export const signup = (data) => {
  return axios.post(`/api/signup`, data);
};

// get user

export const getUser = () => {
  return axios.get(`/api/profile`);
};
