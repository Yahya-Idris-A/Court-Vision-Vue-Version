import axios from "@/plugins/axios";

const baseURL = import.meta.env.VITE_APP_ROOT_API;

axios.defaults.headers.common["Authorization"] =
  `Bearer ` + localStorage.getItem("token")?.replace(/['"]+/g, "");

// Get All Videos
export const getAllVideos = async () => {
  try {
    const res = axios.get("/api/videos");
    return res;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem("token")?.replace(/['"]+/g, "");
};

export const endPointUploadProgress = baseURL + "/api/videos/progress";
