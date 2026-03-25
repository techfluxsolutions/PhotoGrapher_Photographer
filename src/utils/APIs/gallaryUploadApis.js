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

export const startUploadAPI = (payload) => {
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
export const getPartUploadUrlAPI = async (payload) => {
  return withAuthorization(() =>
    axiosInstance.post("/api/photographers/get-part-url", payload)
  );
};

export const completeUploadAPI = (payload) => {
  return withAuthorization(async () => {
    return await axiosInstance.post(
      `/api/photographers/complete`,
      payload
    );
  });
};


// ABORT UPLOAD
export const abortUploadAPI = (payload) => {
  return withAuthorization(async () => {
    return axiosInstance.post("/api/photographers/abort", payload);
  });
};


// view gallery
// export async function getPhotoskeysbyidAPI(page, limit, bookingId = "", photographerId = "") {
//   return withAuthorization(async () => {
//     const response = await axiosInstance.get(
//       `/api/photographers/datalinks?page=${page}&limit=${limit}&bookingId=${bookingId}&photographerId=${photographerId}`
//     );
//     return response;
//   });
// }




// export async function getImagesUsingKeysAPI(bookingId, key) {
//   return withAuthorization(async () => {
//     const response = await axiosInstance.get(
//       `/api/photographers/stream/${bookingId}/*${key}`,
//       {
//         responseType: "blob",
//       }
//     );

//     const blobUrl = URL.createObjectURL(response.data);
//     return blobUrl;
//   });
// }



export async function getAllGalleryImages(page, limit, bookingId = "") {
  return withAuthorization(async () => {
    const response = await axiosInstance.get(
      `/api/users/getArrayImages/${bookingId}`,
      {
        params: {
          page,
          limit
        }
      }
    );
    return response;
  });
}

export async function downloadFullZip(payload) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post(
      "/api/photographers/downloadZip",
      payload,
      {
        responseType: "blob",
        timeout:600000 // 10 min
      }
    );
    return response;
  });
}

export async function downloadSelectedImages(payload) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post(
      "/api/photographers/downloadZiponFourtyPlus",
      payload,
       {
        responseType: "blob",
        timeout:600000 // 10 min
      }
    );
    return response;
  });
}

export async function downloadSingleImage(payload) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post(
      "/api/photographers/downloadSingleFile",
      payload,
       {
        responseType: "blob",
        timeout:120000 // 10 min
      }
    );
    return response;
  });
}


export async function deleteSingleImage(payload) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post(
      "api/photographers/deleteSingleFile",
      payload
    );
    return response;
  });
}


export async function deleteSelectedImages(payload) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post(
      "/api/photographers/deleteMultipleFiles",
      payload
    );
    return response;
  });
}
