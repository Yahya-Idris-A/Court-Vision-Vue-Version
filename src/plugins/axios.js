import axios from "axios";

const baseURL = import.meta.env.VITE_APP_ROOT_API;

const axiosIns = axios.create({ baseURL });

const requestHandler = (request) => {
  return request;
};

const responseHandler = (response) => {
  return response.data;
};

const errorHandler = (error) => {
  // logout if 401 response returned from api
  if (error.response.statusCode === 401 || error.response.statusCode === 403) {
    // clear local storage
    //callToaster('error', 'Session Expire Please login again')
    localStorage.clear();
    // window.location = "/sign-in";
  }
  if (error.response.statusCode === 500) {
    callToaster("error", "Internal Server Error");
  }

  return Promise.reject({ ...error });
};

axiosIns.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosIns.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default axiosIns;
