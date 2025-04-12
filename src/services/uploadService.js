import axiosIns from "@/plugins/axios";

axiosIns.defaults.headers.common["Authorization"] =
  `Bearer ` + localStorage.getItem("token")?.replace(/['"]+/g, "");

// Get endpoint S3
export const getSignedUrl = async (filename, contentType, signal) => {
  return axiosIns.post("/api/s3/sign", { filename, contentType }, { signal });
};

// Multipart upload
export const createMultipartUpload = async (
  filename,
  contentType,
  metadata
) => {
  const res = await axiosIns.post("/api/s3/multipart", {
    filename,
    contentType,
    metadata,
  });
  return res.data?.data;
};

export const signPart = async (uploadId, key, partNumber, signal) => {
  const filename = encodeURIComponent(key);
  const res = await axiosIns.get(
    `/api/s3/multipart/${uploadId}/${partNumber}?key=${filename}`,
    { signal }
  );
  return res.data?.data;
};

export const listParts = async (uploadId, key, signal) => {
  const filename = encodeURIComponent(key);
  const res = await axiosIns.get(
    `/api/s3/multipart/${uploadId}?key=${filename}`,
    { signal }
  );
  return res.data?.data;
};

export const completeMultipartUpload = async (uploadId, key, parts, signal) => {
  const filename = encodeURIComponent(key);
  const uploadIdEnc = encodeURIComponent(uploadId);
  const res = await axiosIns.post(
    `/api/s3/multipart/${uploadIdEnc}/complete?key=${filename}`,
    { parts },
    { signal }
  );
  return res.data?.data;
};

export const abortMultipartUpload = async (uploadId, key, signal) => {
  const filename = encodeURIComponent(key);
  const uploadIdEnc = encodeURIComponent(uploadId);
  await axiosIns.delete(`/api/s3/multipart/${uploadIdEnc}?key=${filename}`, {
    signal,
  });
};
