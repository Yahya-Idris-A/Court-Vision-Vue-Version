import axiosIns from "@/plugins/axios";

axiosIns.defaults.headers.common["Authorization"] =
  `Bearer ` + localStorage.getItem("token")?.replace(/['"]+/g, "");

// Get endpoint S3
export const getSignedUrl = async (filename, contentType, signal) => {
  return axiosIns.post(
    "/api/s3/upload/presign",
    { filename, contentType },
    { signal }
  );
};

// Multipart upload
export const createMultipartUpload = async (
  filename,
  contentType,
  metadata
) => {
  const res = await axiosIns.post("/api/s3/upload/multipart", {
    filename,
    contentType,
    metadata,
  });
  // console.log("createMultipartUpload", res.data);

  return res.data;
};

export const signPart = async (uploadId, key, partNumber, signal) => {
  console.log(uploadId);
  const filename = encodeURIComponent(key);
  const res = await axiosIns.get(
    `/api/s3/upload/multipart/${uploadId}/${partNumber}?key=${filename}`,
    { signal }
  );
  console.log("signPart", res.data);

  return res.data;
};

export const listParts = async (uploadId, key, signal) => {
  const filename = encodeURIComponent(key);
  const res = await axiosIns.get(
    `/api/s3/upload/multipart/${uploadId}?key=${filename}`,
    { signal }
  );
  console.log("listParts", res.data);
  return res.data;
};

export const completeMultipartUpload = async (uploadId, key, parts, signal) => {
  const filename = encodeURIComponent(key);
  const uploadIdEnc = encodeURIComponent(uploadId);
  const res = await axiosIns.post(
    `/api/s3/upload/multipart/${uploadIdEnc}/complete?key=${filename}`,
    { parts },
    { signal }
  );
  console.log("completeMultipartUpload", res.data);

  return res.data;
};

export const abortMultipartUpload = async (uploadId, key, signal) => {
  const filename = encodeURIComponent(key);
  const uploadIdEnc = encodeURIComponent(uploadId);
  await axiosIns.delete(
    `/api/s3/upload/multipart/${uploadIdEnc}?key=${filename}`,
    {
      signal,
    }
  );
};

export const uploadAllData = async (title, date, venue, video_url) => {
  return axiosIns.post("/api/videos", {
    title,
    date,
    venue,
    video_url,
  });
};
