import axios from "axios";

const baseURL = import.meta.env.VITE_APP_ROOT_API;

const axiosIns = axios.create({ baseURL });

const requestHandler = (request) => request;

const responseHandler = (response) => response.data;

const errorHandler = (error) => {
  if (error.response) {
    const status = error.response.status;

    if (status === 401 || status === 403) {
      localStorage.clear();
      window.location = "/sign-in";
    }

    if (status === 500) {
      callToaster("error", "Internal Server Error");
    }

    return Promise.reject({ ...error });
  } else {
    console.error("No response from server:", error.message);
  }
};

axiosIns.interceptors.request.use(requestHandler, errorHandler);
axiosIns.interceptors.response.use(responseHandler, errorHandler);

export default axiosIns;
