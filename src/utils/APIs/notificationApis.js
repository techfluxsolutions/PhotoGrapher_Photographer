import { authorizeMe, axiosInstance } from './commonHeadApiLogic.js';

// Ensure authorization header is set before making authenticated requests
const withAuthorization = async (apiFunction, ...args) => {
  try {
    await authorizeMe(); // Ensure the Authorization header is set
    return await apiFunction(...args);
  } catch (error) {
    // Handle errors as necessary
    console.error("Error in API request:", error);
    throw error;
  }
};




export const getNotification = () => {
  return withAuthorization(async () => {
    return await axiosInstance.get(
      `/api/photographers/notifications`
    );
  });
};





