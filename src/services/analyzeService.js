import axios from "@/plugins/axios";

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
