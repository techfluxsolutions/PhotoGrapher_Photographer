import { authorizeMe, axiosInstance } from "./commonHeadApiLogic.js";

// wrapper already defined by you
const withAuthorization = async (apiFunction, ...args) => {
  try {
    await authorizeMe();
    return await apiFunction(...args);
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

/**
 * Get Quotes List
 * @param {number} page
 * @param {number} limit
 */
export const getQuotesAPI = (page = 1, limit = 10) => {
  return withAuthorization(async () => {
    return axiosInstance.get(
      `/api/admins/quotes?page=${page}&limit=${limit}`
    );
  });
};
