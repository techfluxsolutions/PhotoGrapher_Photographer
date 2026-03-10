import { authorizeMe, axiosInstance } from "./commonHeadApiLogic.js";

// Ensure authorization header is set before making authenticated requests
const withAuthorization = async (apiFunction, ...args) => {
  try {
    await authorizeMe();
    return await apiFunction(...args);
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

/* ================= START UPLOAD ================= */

export const startGalleryUpload = (payload) => {
  return withAuthorization(async () => {
    return await axiosInstance.post(
      `/api/photographers/start`,
      payload
    );
  });
};

/* ================= CHUNK UPLOAD ================= */

export const uploadGalleryChunk = (formData) => {
  return withAuthorization(async () => {
    return axiosInstance.post(`/api/photographers/chunk`, formData);
  });
};

/* ================= COMPLETE UPLOAD ================= */

export const completeGalleryUpload = (payload) => {
  return withAuthorization(async () => {
    return await axiosInstance.post(
      `/api/photographers/complete`,
      payload
    );
  });
};